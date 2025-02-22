import { api } from '@/axios';
import { $Enums, Application } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { useParams, useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import screenfull from 'screenfull';

export type ITaskView = {
    title: string;
    questionType: $Enums.QuestionType;
    description: string;
    code: string | null;
    codeLanguage: string | null;
    phrase: string;
    timelimit: string;
}

interface IData {
    task?: ITaskView;
    application?: Application | undefined;
    positionTitle?: string;
    taskLength?: { all: number, remaining: number };
}

export interface IAnsweredTask {
    uid: string;
    task?: ITaskView | undefined | null;
    answer?: string | null;
    remainTime?: string | null;
    startedTime?: Date | undefined | null;
    status: $Enums.TaskStatus;
}

interface TaskContextProps {
    code: string | undefined | null;
    timerValue: number;
    isSubmit: boolean;
    isActive: boolean;
    updateTaskReq: boolean;
    startTimer: () => void;
    resetTimer: (v?: string | undefined) => void;
    changeCode: (v: string | undefined) => void;
    submitTask: () => void;
    setTask: React.Dispatch<React.SetStateAction<IData | null>>;
    updateTask: (id: string, status: $Enums.TaskStatus, isSubmit?: boolean, value?: IAnsweredTask[]) => void;
}

const TestContext = createContext<TaskContextProps | undefined>(undefined);

interface TestProviderProps {
    children: ReactNode;
}

const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
    const [timerValue, setTimerValue] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [code, setCode] = useState<string | undefined | null>(null)
    const [task, setTask] = useState<IData | null>(null)
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [updateTaskReq, setUpdateTask] = useState<boolean>(false)
    const params = useParams()
    const router = useRouter()
    const cookieTime = getCookie("task-current-time");
    const getTaskCookie = cookieTime ? JSON.parse(cookieTime as string) : null;
    const answeredTasks = task?.application?.answeredTasks || [];

    const setTaskCookie = (time: number, isActive: boolean) => {
        setCookie("task-current-time", JSON.stringify({ time, isActive, taskId: params?.task }));
    }

    useEffect(() => {
        if (!params?.task)
            resetTimer()
    }, [params])

    const startTimer = () => {
        setIsActive(true);
    };

    const resetTimer = (maxTime?: string | undefined) => {
        const time = maxTime ? Number(maxTime) * 60 : 0;
        setIsActive(false);
        setTaskCookie(time, false)
        setTimerValue(time);
    };

    const changeCode = (val: string | undefined) => {
        setCode(val)
    }

    const updateTask = async (
        id: string,
        status: $Enums.TaskStatus,
        isSubmit?: boolean,
        allTask?: IAnsweredTask[]
    ) => {
        setUpdateTask(true)
        const allAttendedTasks: IAnsweredTask[] = answeredTasks
        if (!allTask) {
            const findTask = allAttendedTasks.findIndex(task => task.uid === id)

            const newTask = {
                uid: id,
                task: task?.task as ITaskView,
                answer: code as string,
                status,
                ...(
                    status === "started" &&
                    { startedTime: allAttendedTasks[findTask]?.status !== "started" ? new Date() : allAttendedTasks[findTask]?.startedTime }
                )
            }

            if (findTask > -1) {
                allAttendedTasks.splice(findTask, 1, { ...newTask })
            } else {
                allAttendedTasks.push({ ...newTask })
            }
        }

        try {
            const response: AxiosResponse<{ application: Application }> = await api.post(`/api/careers/${params.uid}`, {
                answeredTasks: allTask ?? allAttendedTasks
            });
            setUpdateTask(false)

            if (isSubmit && response.status === 200) {
                setCode(null);
                setTask(null);
                resetTimer();
                setIsSubmit(false)

                if (task?.taskLength && task?.taskLength.remaining === 0) {
                    router.push(`/careers/${params.uid}/apply`);
                } else {
                    router.refresh();
                    router.push(`/applicantTest/${params.uid}`);
                }
            }
        } catch (error) {
            console.error(error);
            setUpdateTask(false)
            setIsSubmit(false)
        }
    }

    const submitTask = async () => {
        setIsSubmit(true)
        await updateTask(params.task as string, "completed", true)
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout | undefined;

        if (isActive && timerValue > 0) {
            timerId = setInterval(() => {
                setTimerValue((prevValue) => prevValue - 1);
                setTaskCookie(timerValue - 1, true)
            }, 1000);
        } else if (timerValue === 0) {
            setIsActive(false);
            clearInterval(timerId as NodeJS.Timeout);
            if (getTaskCookie?.taskId === '') {
                resetTimer(task?.task?.timelimit)
            } else if (getTaskCookie?.taskId === params?.task) {
                setIsActive(getTaskCookie?.isActive);
                setTimerValue(getTaskCookie?.time)
            }
            if (task) {
                submitTask()
            }
        }
        if (isSubmit) {
            setIsActive(false);
            clearInterval(timerId as NodeJS.Timeout);
        }

        return () => clearInterval(timerId as NodeJS.Timeout);
    }, [isActive, timerValue, isSubmit]);

    const contextValue: TaskContextProps = {
        code,
        timerValue,
        isSubmit,
        isActive,
        updateTaskReq,
        setTask,
        changeCode,
        startTimer,
        resetTimer,
        submitTask,
        updateTask
    };

    return <TestContext.Provider value={contextValue}>{children}</TestContext.Provider>;
};

const useTestContext = (): TaskContextProps => {
    const context = useContext(TestContext);
    if (!context) {
        throw new Error('useTestContext must be used within a TestProvider');
    }
    return context;
};

export { TestProvider, useTestContext };
