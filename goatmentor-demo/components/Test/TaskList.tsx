"use client";
import { faCode, faQuoteRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import { $Enums, ApplicantTasks, Application, TaskStatus, QuestionType } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { faBadgeCheck } from '@fortawesome/pro-solid-svg-icons';
import { IAnsweredTask, useTestContext } from '@/context/taskContext';
import LoadingButton from '../Common/LoadingButton';

interface Props {
    position: {
        applications: Application[];
        applicantTasks: ApplicantTasks | null | undefined
    }
}

interface ITask {
    title: string;
    questionType: $Enums.QuestionType;
    phrase: string;
    description: string;
    codeLanguage: string | null;
    code: string | null;
    timelimit: string;
}

function calculateRemainingMinutes(startTime: Date, timeLimit: number) {
    const currentTime = new Date();
    const startTimeTimestamp = startTime.getTime();
    const timeDifference = currentTime.getTime() - startTimeTimestamp;
    const elapsedMinutes = timeDifference / (1000 * 60);
    const remainingMinutes = Math.max(0, timeLimit - elapsedMinutes);
    return Number(remainingMinutes).toFixed(2);
}

export const updateTimeLimit = (item: IAnsweredTask) => {
    let tempItem = { ...item };
    if (item.status === 'started') {
        const timelimit = Number(item?.task?.timelimit);
        const startedTime = item?.startedTime as Date;
        const remainingMinutes = calculateRemainingMinutes(startedTime, timelimit);

        if (Number(remainingMinutes) > 0) {
            tempItem = {
                ...tempItem,
                remainTime: remainingMinutes.toString()
            }
        } else tempItem = { ...tempItem, status: "completed", remainTime: '0' }
    }
    return { ...tempItem }
}

const genrateID = (str: string) => str.toLowerCase().replace(/ /g, '-')

const ApplicantTaskList = ({ position }: Props) => {
    const params = useParams();
    const router = useRouter()
    const { updateTask, setTask, updateTaskReq } = useTestContext();
    const answeredTasks = position.applications?.[0]?.answeredTasks;

    const updateAllTasks = async (newData?: IAnsweredTask | null) => {
        const allTasks = answeredTasks.map((item) => updateTimeLimit(item))
        const isNeedToUpdate = JSON.stringify(allTasks) !== JSON.stringify(answeredTasks);

        if (isNeedToUpdate || newData) {
            if (newData) allTasks.push(newData)
            await updateTask('', 'initiated', false, allTasks);
            router.refresh()
        }
    }

    useEffect(() => {
        if (answeredTasks.length > 0) {
            updateAllTasks()
        }
    }, [])

    useEffect(() => {
        if (answeredTasks.length > 0) {
            const completedTasks = answeredTasks.filter(item => item.status !== 'completed')?.length
            const allTasks = position.applicantTasks?.tasks.length
            if (allTasks === completedTasks) router.push(`/careers/${params?.uid}/apply`)
        }
    }, [answeredTasks])

    useEffect(() => {
        const application = position?.applications[0]
        if (application)
            setTask({ application })
    }, [position, setTask])

    const checkISDone = (title: string) => {
        return answeredTasks.find((item) => {
            return item?.uid === genrateID(title) && item.status === 'completed'
        })
    }

    const handleStartTest = async (task: ITask) => {
        const taskID = genrateID(task.title)
        const isOld = answeredTasks.find((item) => item.uid === taskID)
        const newTask = {
            uid: taskID,
            status: TaskStatus.initiated
        }
        await updateAllTasks(!isOld ? { ...newTask } : null)
        router.push(`/applicantTest/${params.uid}/${taskID}`)
    }

    return (
        <>
            <Box sx={{ backgroundColor: "var(--background)", padding: { xs: 2, lg: 6 } }}>
                <Stack gap={2} sx={{ textAlign: "center" }}>
                    <IconButton
                        color="primary"
                        sx={{
                            alignSelf: "center",
                            padding: `1rem`,
                            aspectRatio: 1,
                        }}>
                        <FontAwesomeIcon
                            icon={faCode}
                            size="xl"
                        />
                    </IconButton>
                    <Typography variant="headlinelg" color="var(--text-body)">
                        Developer Coding Test
                    </Typography>
                    <Typography variant="headlinesm" color="var(--text-body)">
                        Test your skills using practical projects and real-world scenarios
                    </Typography>
                </Stack>
                <Stack gap={6} sx={{ p: 6 }}>
                    <Stack gap={{ xs: 2, sm: 3 }}>
                        <Stack gap={1}>
                            <Typography variant="headlinelg" color="var(--text-title)">
                                How it works
                            </Typography>
                            <Typography variant="bodylg">
                                Welcome to the developer coding test! This assessment is designed to evaluate both your coding skills and your ability to communicate technical concepts. Please read the instructions carefully before starting.
                            </Typography>
                        </Stack>
                        <Stack alignItems="flex-start" direction="row" flexWrap="wrap" gap={4}>
                            <Stack gap={2} sx={{ flex: 1, minWidth: "min(80vw, 400px)" }}>
                                <Stack gap={1}>
                                    <Typography variant="headlinesm">Test Structure:</Typography>
                                    <Typography variant="bodylg">
                                        The test is divided into two types of questions: coding and text-based.
                                    </Typography>
                                </Stack>

                                <Typography variant="titlesm" component={'ol'} sx={{ '& li': { marginY: 1 } }}>
                                    <li>Coding Questions:
                                        <Typography variant="bodylg" component={'ul'}>
                                            <li>You will find coding challenges that assess your programming skills.</li>
                                            <li>Use the designated programming language mentioned in the question.</li>
                                            <li> Follow coding conventions and guidelines specified in the prompt.</li>
                                            <li>Submit your code through the provided platform within the allocated time.</li>
                                        </Typography>
                                    </li>
                                    <li>Text-based Questions:
                                        <Typography variant="bodylg" component={'ul'}>
                                            <li>These questions assess your understanding of theoretical concepts.</li>
                                            <li>Provide clear and concise explanations.</li>
                                            <li>Use proper terminology and structure in your responses.</li>
                                            <li>Submit your answers through the provided platform within the allocated time.</li>
                                        </Typography>
                                    </li>
                                </Typography>

                                <Stack gap={1}>
                                    <Typography variant="headlinesm">Time Limit:</Typography>
                                    <Typography variant="bodylg" component={'ul'}>
                                        <li>The total time for the test is based on task.</li>
                                        <li>Allocate your time wisely between coding and text-based questions.</li>
                                    </Typography>
                                </Stack>

                                <Stack gap={1}>
                                    <Typography variant="headlinesm">Submission Guidelines:</Typography>
                                    <Typography variant="bodylg" component={'ul'}>
                                        <li>Submit your coding solutions in the designated code editor.</li>
                                        <li>For text-based questions, type your responses directly into the provided text box.</li>
                                        <li>Double-check your submissions before finalizing.</li>
                                    </Typography>
                                </Stack>

                                <Stack gap={1}>
                                    <Typography variant="headlinesm">Scoring:</Typography>
                                    <Typography variant="bodylg" component={'ul'}>
                                        <li>Each question is assigned a specific score based on correctness and clarity.</li>
                                        <li>Partial credit may be given for partially correct answers.</li>
                                    </Typography>
                                </Stack>

                                <Stack gap={1}>
                                    <Typography variant="headlinesm">Completion:</Typography>
                                    <Typography variant="bodylg" component={'ul'}>
                                        <li>Submit your responses before the time limit expires.</li>
                                        <li>Acknowledge that you have read and understood these instructions before starting the test.</li>
                                    </Typography>
                                </Stack>

                                <Stack gap={1}>
                                    <Typography variant="headlinesm">Good luck!</Typography>
                                    <Typography variant="bodylg">
                                        We wish you the best of luck in the technical test.
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack >
                    </Stack >

                    <Stack gap={4}>
                        {position.applicantTasks?.tasks.map((task, i) => {
                            const isCompleted = checkISDone(task?.title)
                            return (
                                <Stack key={task.title} gap={3} flexDirection={'row'} alignItems={'center'} justifyContent={"space-between"}>
                                    <Stack gap={3} flexDirection={'row'} alignItems={'center'}>
                                        <IconButton
                                            color={isCompleted ? 'primary' : 'default'}
                                            sx={{
                                                cursor: 'default',
                                                alignSelf: "center",
                                                padding: `1rem`,
                                                aspectRatio: 1,
                                                ...(!isCompleted && {
                                                    border: '1px solid var(--border-secondary)'
                                                })
                                            }}>
                                            <FontAwesomeIcon
                                                icon={isCompleted ? faBadgeCheck : task.questionType === QuestionType.coding ? faCode : faQuoteRight}
                                                size="xl"
                                            />
                                        </IconButton>
                                        <Stack>
                                            <Typography variant='headlinesm' color="var(--black)">
                                                Task {i + 1} ({task.title})
                                            </Typography>
                                            <Typography variant='titlelg' color="var(--text-subtitle)">
                                                {task.timelimit} minutes
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack>
                                        {!isCompleted ?
                                            <LoadingButton
                                                disabled={updateTaskReq}
                                                variant="outlined"
                                                onClick={() => handleStartTest(task)}
                                            >
                                                Start Test
                                            </LoadingButton> :
                                            <Chip label="Completed" color='success' />}
                                    </Stack>
                                </Stack>
                            )
                        })}
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default ApplicantTaskList