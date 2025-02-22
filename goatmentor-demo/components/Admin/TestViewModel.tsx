import { Box, IconButton, Modal, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { MODAL_BOX } from '../Mui/overrides/Modal'
import { CODING, JSON_TO_HTML, TEXT } from '@/utils/constants'
import { Editor } from '@monaco-editor/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/pro-regular-svg-icons'
import { IAnsweredTask } from '@/context/taskContext'

interface Props {
    data: IAnsweredTask | null;
    onClose: () => void;
}

const TestViewModel = ({ data, onClose }: Props) => {
    const description = data?.task?.description ? JSON_TO_HTML(JSON.stringify(data?.task?.description)) : '';

    return (
        <Modal
            open={Boolean(data)}
            onClose={onClose}
            disableEscapeKeyDown
            aria-labelledby="test-view"
        >
            <Box sx={{ ...MODAL_BOX, maxWidth: { md: '1290px' }, bgcolor: 'var(--surface-secondary)' }}>
                <Stack
                    direction="row"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ color: "var(--text-title)", position: "relative" }}>
                    <Typography id="filters-title" variant="headlinelg">
                        Developer Test
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--text-title)",
                        }}>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                </Stack>
                <Stack sx={{ flexDirection: { lg: 'row', xs: 'column' }, overflow: 'auto' }}>
                    <Stack
                        gap={2}
                        sx={{ padding: { xs: 3, lg: 6 }, width: { xs: '100%', lg: '40%' } }}
                    >
                        <Typography variant='headlinelg' color={"var(--neutral-black)"} >
                            {data?.task?.title}
                        </Typography>

                        <Typography variant="bodylg" color={"var(--text-body)"}>
                            {data?.task?.phrase}
                        </Typography>

                        <Box
                            sx={{
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
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>
                        </Box>
                    </Stack>

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
                            {data?.task?.questionType === CODING &&
                                <Editor
                                    height="70vh"
                                    language={data?.task.codeLanguage ?? 'javascript'}
                                    value={data?.answer ?? ''}
                                />
                            }
                            {data?.task?.questionType === TEXT &&
                                <TextField
                                    multiline
                                    rows={5}
                                    sx={{ "& textarea": { height: 'calc(100vh - 188px) !important' } }}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    value={data?.answer ?? ''}
                                />}
                        </Stack>
                    </Stack>

                </Stack >
            </Box>
        </Modal>
    )
}

export default TestViewModel