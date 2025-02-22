"use client";
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import LoadingButton from '../Common/LoadingButton';
import TestTaskForm from './TestTaskForm';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import { OutputData } from '@editorjs/editorjs';
import * as Yup from "yup";
import { CODING } from '@/utils/constants';
import { useToast } from '@/utils/toast';
import { api } from '@/axios';
import { ApplicantTasks } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { NextLinkComposed } from '../Mui/Link';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';

export interface ITask {
    title: string;
    questionType: string;
    codeLanguage?: string | undefined | null;
    description: OutputData;
    code?: string | undefined | null;
    phrase: string;
    timelimit: string;
}

interface ApplicantTaskFormProps {
    update: {
        uid: string | undefined;
        applicantTasks: ApplicantTasks | null | undefined
    };
}

interface IValidationValue {
    text?: string;
    items?: string[];
}

const ApplicantTaskForm: React.FC<ApplicantTaskFormProps> = ({ update }) => {
    const { uid, applicantTasks } = update;
    const [expanded, setExpanded] = useState<string | false>("task1");
    const { showToast } = useToast();
    const router = useRouter();

    const initalData = {
        title: "",
        phrase: '',
        timelimit: '',
        codeLanguage: 'javascript',
        code: '// Enter your code here...',
        questionType: CODING,
        description: {
            time: new Date().getTime(),
            blocks: [
                {
                    type: "header",
                    data: {
                        text: "",
                        level: 1,
                    },
                },
            ],
        }
    }

    const validationSchema = Yup.object({
        tasks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Title is required'),
                phrase: Yup.string().required('Phrase is required'),
                timelimit: Yup.string().required('Timelimit is required'),
                description: Yup.object().test(
                    "oneOfKeys",
                    "Description is required",
                    (c: any) => {
                        const blocks: { data: any }[] = c?.blocks;
                        return blocks.some((block) => {
                            const { text, items } = block.data as IValidationValue;
                            return (text && text.trim().length > 0) || (items && items.length > 0);
                        });
                    }
                ),
            })
        )
    })

    const formik = useFormik<{
        tasks: ITask[];
    }>({
        initialValues: {
            tasks: applicantTasks ?
                applicantTasks.tasks.map(ele => {
                    return {
                        title: ele.title,
                        questionType: ele.questionType,
                        description: {
                            time: new Date().getTime(),
                            blocks: JSON.parse(ele.description),
                        },
                        phrase: ele.phrase,
                        timelimit: ele.timelimit,
                        ...(ele.questionType === 'coding' && {
                            code: ele.code,
                            codeLanguage: ele.codeLanguage,
                        })
                    }
                }) :
                [{ ...initalData }]
        },
        validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        async onSubmit(values) {
            const updateVal = values.tasks.map(ele => {
                return {
                    ...ele,
                    ...(ele.questionType === CODING && {
                        code: ele.code,
                        codeLanguage: ele.codeLanguage
                    }),
                    description: JSON.stringify(ele.description?.blocks)
                };
            });

            const payload = {
                tasks: updateVal,
                positionId: uid,
            };

            const httpMethod = applicantTasks ? api.patch : api.post;

            try {
                const response = await httpMethod(
                    "/api/applicantTasks",
                    { ...payload, uid: applicantTasks?.uid }
                );
                if ([200, 201].includes(response.status)) {
                    showToast("success", response?.data?.message);
                    router.push("/admin/careers");
                }
            } catch (error) {
                console.error("Error:", error);
                showToast("error", "Something went wrong");
            }
        }
    });

    const {
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        setFieldValue,
        handleBlur,
        handleSubmit,
    } = formik

    const handleAccordionChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const addNewTask = (push: <X = ITask[][number]>(obj: X) => void) => {
        if (isValid)
            push({ ...initalData })
        else
            showToast("error", "Please fill all details");
    }

    return (
        <Stack gap={4}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={4}>
                <Stack gap={1}>
                    <Typography variant="headlinelg" color="var(--text-title)">
                        Applicant Test Task
                    </Typography>
                    <Typography variant="labellg">
                        Create or update applicant test task
                    </Typography>
                    <Typography variant="labellg" color="var(--text-primary)">
                        All Fields are Required
                    </Typography>
                </Stack>
                <Button
                    variant="outlined"
                    component={NextLinkComposed}
                    to={`/admin/careers/create?update=${uid}`}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    sx={{ alignSelf: "flex-start" }}>
                    Back
                </Button>
            </Stack>

            <Stack gap={{ xs: 2, sm: 3 }}>
                <FormikProvider value={formik}>
                    <Stack>
                        <FieldArray name='tasks' render={({ remove, push }) => (
                            <Box>
                                {values.tasks.map((task, i) => (
                                    <TestTaskForm
                                        key={i + 1}
                                        task={task}
                                        index={i}
                                        expanded={expanded}
                                        errors={errors}
                                        touched={touched}
                                        setExpanded={handleAccordionChange}
                                        setFieldValue={setFieldValue}
                                        handleBlur={handleBlur}
                                        {...(values.tasks.length > 1 &&
                                            { removeTask: remove }
                                        )}
                                    />
                                ))}
                                <Box
                                    sx={{
                                        padding: "1rem",
                                        borderBlock: "1px solid var(--border)",
                                        background: "var(--surface-secondary)",
                                    }}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                                        sx={{ width: "100%" }}
                                        onClick={() => addNewTask(push)}
                                    >
                                        Add Task
                                    </Button>
                                </Box>
                            </Box>
                        )}
                        />
                    </Stack>
                    <LoadingButton
                        loading={isSubmitting}
                        variant="contained"
                        size="large"
                        onClick={() => handleSubmit()}
                    >
                        {applicantTasks ? 'Update' : 'Create'} Tasks
                    </LoadingButton>
                </FormikProvider>
            </Stack>

            {/* {Boolean(update) && (
                <LoadingButton
                    variant="contained"
                    size="large"
                    loading={deleting}
                    color="error"
                    onClick={openDeleteConfirmation}>
                    Delete Blog
                </LoadingButton>
            )} */}
            {/* {Boolean(update) && (
                <ConfirmationDialog
                    open={deleteConfirmation}
                    handleClose={closeDeleteConfirmation}
                    confirm={deleteBlog}
                    title="Delete This Blog?"
                    description="This action cannot be undone. This will permanently delete the blog and all its data."
                />
            )} */}
        </Stack>
    )
}

export default ApplicantTaskForm