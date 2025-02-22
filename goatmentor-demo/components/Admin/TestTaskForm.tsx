"use client";
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SyntheticEvent } from 'react'
import CustomEditor from "../CkEditor/editor";
import { ITask } from './ApplicantTask';
import { FormikErrors, FormikTouched } from 'formik';
import { fieldValidation, formHelperText } from '@/utils/fieldValidation';
import { CODING, TEXT, programmingLanguages } from '@/utils/constants';
import Editor from "@monaco-editor/react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import LoadingButton from '../Common/LoadingButton';
import { faRemove } from '@fortawesome/pro-solid-svg-icons';

interface Props {
    index: number;
    expanded: string | false;
    task: ITask;
    errors: FormikErrors<{ tasks: ITask[] }>;
    touched: FormikTouched<{ tasks: ITask[] }>;
    setExpanded: (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => void;
    setFieldValue: (field: string, value: any) => void;
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
    removeTask?: <X = ITask[]>(index: number) => X | undefined;
}

const TestTaskForm = ({
    index,
    expanded,
    task,
    errors,
    touched,
    setExpanded,
    setFieldValue,
    handleBlur,
    removeTask
}: Props) => {
    const taskFieldTouched = touched.tasks?.[index] ?? {}
    const taskFieldErrors = errors.tasks?.[index] ?? {}

    return (
        <Accordion
            component="form"
            expanded={expanded === `task${index + 1}`}
            onChange={setExpanded(`task${index + 1}`)}
            sx={{
                "& .MuiAccordion-region": {
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem",
                },
            }}>
            <AccordionSummary
                aria-controls={`task${index + 1}-content`}
                id={`task${index + 1}-header`}
                sx={{
                    pointerEvents: "none",
                    "&.Mui-focusVisible": {
                        backgroundColor: "var(--surface-secondary)",
                    },
                    "&.MuiAccordionSummary-root": {
                        p: '4px 16px'
                    },
                    "& .MuiAccordionSummary-content": {
                        gap: 2,
                        marginRight: "1rem !important",
                        alignItems: "center",
                    },
                }}
                expandIcon={
                    <IconButton size="small">
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            style={{ pointerEvents: "auto" }}
                        />
                    </IconButton>
                }>
                <Typography>{index + 1}</Typography>
                <TextField
                    // autoFocus
                    label="Task Title"
                    name={`tasks[${index}].title`}
                    value={task.title}
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue(`tasks[${index}].title`, e.target.value)}
                    {...fieldValidation(taskFieldTouched, taskFieldErrors, "title")}
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        flex: 1,
                        pointerEvents: "auto",
                    }}
                />
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    gap: 3,
                    borderTop: "none",
                }}>

                <Grid container spacing={3}>
                    <Grid item md={4}>
                        <FormControl>
                            <FormLabel id="questionType">Question Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="questionType"
                                name="questionType"
                                value={task.questionType}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    const { value } = e.target
                                    setFieldValue(`tasks[${index}].questionType`, value)
                                    let codeVal = '// Enter your code here...'
                                    if (value === TEXT) codeVal = ''
                                    setFieldValue(`tasks[${index}].code`, codeVal)
                                }}
                                sx={{ '& .MuiFormControlLabel-root': { textTransform: 'capitalize' } }}
                            >
                                <FormControlLabel value={CODING} control={<Radio />} label={CODING} />
                                <FormControlLabel value={TEXT} control={<Radio />} label={TEXT} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item md={5} sm={4} xs={12}>
                        <FormControl fullWidth>
                            <FormLabel id='limit-label'>Time Limit (Minutes)</FormLabel>
                            <TextField
                                placeholder='Enter Time Limit'
                                name={`tasks[${index}].timelimit`}
                                type="number"
                                value={task.timelimit}
                                onBlur={handleBlur}
                                onChange={(e) => setFieldValue(`tasks[${index}].timelimit`, e.target.value)}
                                {...fieldValidation(taskFieldTouched, taskFieldErrors, "timelimit")}
                                sx={{ flex: 2, mt: 1 }}
                            />
                        </FormControl>
                    </Grid>
                    {removeTask &&
                        <Grid
                            item
                            // md={2}
                            sx={({ breakpoints }) => ({
                                marginLeft: 'auto',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'baseline',
                                '& .MuiButtonBase-root': {
                                    maxWidth: '110px'
                                },
                                [breakpoints.down('sm')]: {
                                    display: 'none'
                                }
                            })}>
                            <LoadingButton
                                variant="contained"
                                size="medium"
                                color="error"
                                startIcon={<FontAwesomeIcon icon={faRemove} />}
                                onClick={() => removeTask(index)}
                                sx={{ flex: 1 }}>
                                Remove
                            </LoadingButton>
                        </Grid>
                    }
                </Grid>

                <FormControl fullWidth>
                    <FormLabel id="phrase-label">Phrase</FormLabel>
                    <TextField
                        placeholder='Enter task phrase'
                        name={`tasks[${index}].phrase`}
                        multiline
                        rows={3}
                        value={task.phrase}
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue(`tasks[${index}].phrase`, e.target.value)}
                        {...fieldValidation(taskFieldTouched, taskFieldErrors, "phrase")}
                        sx={{ flex: 2, mt: 1 }}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel id={`desc-editor-label-${index}`}>Discription</FormLabel>
                    <Stack
                        sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            p: '8px 12px',
                            mt: 1,
                            "&:hover": {
                                borderColor: '#faa83e',
                                outline: '1px solid #faa83e',
                            },
                            "& .discriptions-editor": {
                                ".ce-block__content, .ce-toolbar__content": {
                                    maxWidth: "90%",
                                    "& .image-tool__image-picture": {
                                        m: "auto",
                                    },
                                },
                            },
                        }}>
                        {task.description &&
                            <CustomEditor
                                editorblock={`task-desc-editor-${index}`}
                                editorClass='discriptions-editor'
                                value={task.description}
                                onChange={(e) => setFieldValue(`tasks[${index}].description`, e)}
                            />
                        }
                    </Stack>
                    {formHelperText(taskFieldTouched, taskFieldErrors, "description")}
                </FormControl>

                {task.questionType === CODING &&
                    <FormControl fullWidth>
                        <Stack
                            sx={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "flex-end"
                            }}
                        >
                            <FormLabel id='code-label'>Code</FormLabel>
                            <FormControl sx={{ minWidth: '300px' }}>
                                <InputLabel id="language-label">Code language</InputLabel>
                                <Select
                                    labelId="language-label"
                                    id='code-language'
                                    label="Code language"
                                    MenuProps={{
                                        sx: {
                                            "& .MuiPopover-paper": {
                                                maxWidth: "200px",
                                                "& .MuiList-root": {
                                                    padding: "12px 10px"
                                                }
                                            }
                                        }
                                    }}
                                    name={`tasks[${index}].codeLanguage`}
                                    defaultValue={task.codeLanguage}
                                    value={task.codeLanguage}
                                    onChange={(e) => setFieldValue(`tasks[${index}].codeLanguage`, e.target.value)}
                                >
                                    {programmingLanguages.map((item, i) => (
                                        <MenuItem key={i} value={item?.toLowerCase()}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Box sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            p: '14px 8px',
                            mt: 1,
                            "&:hover": {
                                borderColor: '#faa83e',
                                outline: '1px solid #faa83e',
                            },
                        }}>

                            <Editor
                                height="60vh"
                                language={task?.codeLanguage ?? ''}
                                value={task.code ?? ''}
                                onChange={(e) => setFieldValue(`tasks[${index}].code`, e)}
                            />
                        </Box>
                    </FormControl>
                }

                {removeTask &&
                    <Stack
                        sx={({ breakpoints }) => ({
                            [breakpoints.up('sm')]: {
                                display: 'none'
                            }
                        })}>
                        <LoadingButton
                            variant="contained"
                            size="medium"
                            color="error"
                            startIcon={<FontAwesomeIcon icon={faRemove} />}
                            onClick={() => removeTask(index)}
                            sx={{ flex: 1 }}>
                            Remove
                        </LoadingButton>
                    </Stack>
                }
            </AccordionDetails>
        </Accordion >
    )
}

export default TestTaskForm