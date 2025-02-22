"use client";
import { ITaskView, useTestContext } from '@/context/taskContext';
import { CODING, JSON_TO_HTML, TEXT } from '@/utils/constants';
import { Editor, EditorProps } from '@monaco-editor/react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { Application } from '@prisma/client';
import React, { useEffect } from 'react';
import LoadingButton from '../Common/LoadingButton';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyes } from '@fortawesome/pro-regular-svg-icons';

interface Props {
    task: ITaskView;
    application: Application | undefined;
    positionTitle: string;
    taskLength: { all: number, remaining: number }
}

const TestRoom = ({
    task,
    application,
    taskLength,
    positionTitle
}: Props) => {
    const description = JSON_TO_HTML(JSON.stringify(task.description));
    const {
        timerValue,
        code,
        isSubmit,
        isActive,
        changeCode,
        setTask,
        resetTimer,
        submitTask,
        startTimer
    } = useTestContext();
    const params = useParams()
    const answeredTasks = application?.answeredTasks;

    useEffect(() => {
        const findCompletedTask = answeredTasks?.find(task => task.uid === params?.task && task.status === "completed")

        if (findCompletedTask) {
            window.location.href = `/applicantTest/${params?.uid}`
        }

        // Prevent the user from going back or forward
        window.history.pushState(null, '', document.location.pathname);
        window.onpopstate = function () {
            window.history.pushState(null, '', document.location.pathname);
        };

        // Prevent the user from refreshing the page
        const handleRefresh = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener('beforeunload', handleRefresh);

        return () => {
            window.onpopstate = null;
            window.removeEventListener('beforeunload', handleRefresh);
        };
    }, []);

    useEffect(() => {
        const findTask = answeredTasks?.find(task => task.uid === params?.task)
        if (timerValue === 0) resetTimer(findTask?.remainTime ?? task.timelimit);
        if (task.code) changeCode(task.code);
        if (findTask && findTask?.status === "started") startTimer()
        setTask({ task, application, taskLength, positionTitle });
    }, [task])

    const handleCopyPasteText = (e: React.ClipboardEvent<HTMLTextAreaElement | HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleCopyPasteCode = (e: any) => {
        e.preventDefault();
    };

    const handleEditorDidMount: EditorProps['onMount'] = (editor, monaco) => {
        editor.addAction({
            id: 'custom-copy',
            label: 'Custom Copy',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC],
            run: () => {
                // Handle custom behavior for Ctrl+C (copy)
                handleCopyPasteCode({});
            },
        });

        editor.addAction({
            id: 'custom-paste',
            label: 'Custom Paste',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV],
            run: () => {
                // Handle custom behavior for Ctrl+V (paste)
                handleCopyPasteCode({});
            },
        });
    };

    return (
        <>
            <Stack sx={{
                flexDirection: { lg: 'row', xs: 'column-reverse' }, 
                userSelect: 'none' ,
                minHeight: { xs: "calc(100vh - 88px)", lg: "calc(100vh - 112px)" },
            }}>
                <Stack
                    sx={{
                        borderRadius: { xs: "var(--radius-lg)", md: "var(--radius-xl)" },
                        backgroundColor: "var(--background)",
                        width: { xs: '100%', lg: '60%' }
                    }}
                >
                    <Stack
                        sx={{ padding: 3 }}
                    >
                        {task.questionType === CODING &&
                            <Editor
                                height="60vh"
                                language={task.codeLanguage ?? 'javascript'}
                                value={isActive && code ? code : ''}
                                onChange={(e) => isActive && changeCode(e)}
                                onMount={handleEditorDidMount}
                            />
                        }
                        {task.questionType === TEXT &&
                            <TextField
                                sx={{ "& textarea": { height: 'calc(100vh - 188px) !important' } }}
                                multiline
                                rows={5}
                                value={isActive && code ? code : ''}
                                onChange={(e) => isActive && changeCode(e.target.value)}
                                onCopy={handleCopyPasteText}
                                onPaste={handleCopyPasteText}
                                inputProps={{
                                    onCopy: handleCopyPasteText,
                                    onPaste: handleCopyPasteText
                                }}
                            />}
                    </Stack>
                    {isActive &&
                        <LoadingButton
                            loading={isSubmit}
                            sx={({ breakpoints }) => ({
                                minWidth: '200px',
                                m: '12px 16px',
                                [breakpoints.up('sm')]: {
                                    display: 'none'
                                }
                            })}
                            variant="contained"
                            color="primary"
                            onClick={submitTask}
                        >
                            Complete & Submit
                        </LoadingButton>
                    }
                </Stack>
                <Stack
                    gap={2}
                    sx={{ padding: { xs: 3, lg: 6 }, width: { xs: '100%', lg: '40%' } }}
                >
                    <Typography variant='headlinelg' color={"var(--neutral-black)"} >
                        Task: {task.title}
                    </Typography>

                    {!isActive && !isSubmit && (
                        <Stack
                        direction="row"
                        gap={2}
                        alignItems="center"
                        sx={{
                            marginBlock: { xs: 2, lg: 4 },
                        }}>
                        <FontAwesomeIcon
                            icon={faEyes}
                            size="2x"
                            style={{ margin: "1rem", color: "var(--text-primary)" }}
                        />
                        <Typography variant="labellg" color={"var(--text-subtitle)"}>
                            Start the timer to begin the test and reveal the question
                        </Typography>
                        </Stack>
                    )}

                    {(isActive || isSubmit) && (
                        <>
                            <Typography
                                variant="bodylg"
                                color={"var(--text-body)"}
                            // sx={{ ...(!isActive && !isSubmit && { filter: 'blur(4px)' }) }}
                            >
                                {task.phrase}
                            </Typography>

                            <Box
                                sx={{
                                    // ...(!isActive && !isSubmit && { filter: 'blur(4px)' }),
                                    width: "100%",
                                    "& img": {
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "5px",
                                    },
                                    "& pre": {
                                        color: " #41314e",
                                        lineHeight: "1.6em",
                                        fontSize: "12px",
                                        background: "#f8f7fa",
                                        border: "1px solid #f1f1f4",
                                        boxShadow: "none",
                                        whiteSpace: "pre",
                                        wordWrap: "normal",
                                        overflowX: "auto",
                                        p: 1,
                                    },
                                    "& a": {
                                        textDecoration: "underline",
                                        "&:hover": {
                                            color: "blue",
                                        },
                                    },
                                }}>
                                <Typography variant="displaysm">
                                    Description
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </Box>
                        </>
                    )}
                </Stack>
            </Stack >
        </>
    )
}

export default TestRoom