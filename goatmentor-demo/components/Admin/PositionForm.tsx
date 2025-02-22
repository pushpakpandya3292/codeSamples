"use client";

import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import { JOB_TAGS } from "@/utils/constants";
import { fieldValidation, formHelperText } from "@/utils/fieldValidation";
import { useToast } from "@/utils/toast";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Position } from "@prisma/client";
import { Editor } from "@tinymce/tinymce-react";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import { NextLinkComposed } from "../Mui/Link";
import {
  AutocompleteTags,
  AutocompleteTextField,
} from "../Mui/overrides/Autocomplete";

const EDITOR_PLUGINS = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "charmap",
  "anchor",
  "visualblocks",
  "help",
  "wordcount",
];

const EDITOR_TOOLBAR = "undo redo | bold italic | bullist numlist | help";

const CONTENT_STYLE = `@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,700;1,400;1,700&display=swap'); body { font-family:'Raleway', sans-serif; font-size:16px }`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("A title is required"),
  description: Yup.string().required("A description is required"),
  type: Yup.string().required("Position type is required"),
  salaryFrom: Yup.number().required("Salary from is required"),
  salaryTo: Yup.number().required("Salary to is required"),
  tags: Yup.array().min(1, "At least one tag is required").max(3, "Max 3 tags"),
  requirements: Yup.string().required("Requirements are required"),
  responsibilities: Yup.string().required("Responsibilities are required"),
});

const EDITOR_INIT = {
  height: 250,
  menubar: false,
  plugins: EDITOR_PLUGINS,
  toolbar: EDITOR_TOOLBAR,
  content_style: CONTENT_STYLE,
};

interface Props {
  update?: Position;
  courses: { uid: string; title: string }[];
}

const PositionForm = ({ update, courses }: Props) => {
  const router = useRouter();
  const { showToast } = useToast();

  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const openDeleteConfirmation = () => setDeleteConfirmation(true);
  const closeDeleteConfirmation = () => setDeleteConfirmation(false);

  const deletePosition = async () => {
    setDeleting(true);
    const response: AxiosResponse<{ position: Position }> = await api.delete(
      `/api/careers/${update?.uid}`
    );
    if (response.status === 200) {
      showToast("success", "Position deleted successfuly");
      router.push("/admin/careers");
    }
    setDeleting(false);
  };

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: update?.title ?? "",
      description: update?.description ?? "",
      type: update?.type ?? "",
      salaryFrom: update?.salaryFrom ?? "",
      salaryTo: update?.salaryTo ?? "",
      tags: update?.tags ?? [],
      requiredCoursesIds: update?.requiredCoursesIds ?? [],
      requirements: update?.requirements ?? "<ul><li>Requirements</li></ul>",
      responsibilities:
        update?.responsibilities ??
        "<ul><li>Responsibilities / Program Coverage</li></ul>",
    },
    validationSchema,
    async onSubmit(values, formikHelpers) {
      if (update) {
        const response: AxiosResponse<{ position: Position }> = await api.patch(
          "/api/careers",
          { uid: update.uid, ...values }
        );
        if (response.status === 200) {
          showToast("success", "Position updated successfully");
          router.push("/admin/careers");
        }
      } else {
        const response: AxiosResponse<{ position: Position }> = await api.post(
          "/api/careers",
          values
        );
        if (response.status === 201) {
          showToast("success", "Position created successfully");
          router.push("/admin/careers");
        }
      }
    },
  });
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
            {Boolean(update) ? "Update Position" : "Create Position"}
          </Typography>
          <Typography variant="labellg">
            Create or edit a job or internship position that is currently open.
          </Typography>
          <Typography variant="labellg" color="var(--text-primary)">
            All Fields are Required
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          component={NextLinkComposed}
          to="/admin/careers"
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          sx={{ alignSelf: "flex-start" }}>
          Back
        </Button>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={{ xs: 2, sm: 3 }}>
        <TextField
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "title")}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          name="description"
          value={values.description}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "description")}
        />
        <FormControl fullWidth>
          <InputLabel id="type-label">Position Type</InputLabel>
          <Select
            labelId="type-label"
            label="Position Type"
            name="type"
            value={values.type}
            onChange={handleChange}
            {...fieldValidation(touched, errors, "type")}>
            <MenuItem value="job">Job</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </Select>
          {formHelperText(touched, errors, "type")}
        </FormControl>
        <Stack direction="row" gap={3}>
          <TextField
            label="Salary From"
            InputProps={{
              startAdornment: (
                <Typography sx={{ marginLeft: "14px" }}>$</Typography>
              ),
            }}
            type="number"
            fullWidth
            name="salaryFrom"
            value={values.salaryFrom}
            onChange={handleChange}
            {...fieldValidation(touched, errors, "salaryFrom")}
          />
          <TextField
            label="Salary To"
            InputProps={{
              startAdornment: (
                <Typography sx={{ marginLeft: "14px" }}>$</Typography>
              ),
            }}
            type="number"
            fullWidth
            name="salaryTo"
            value={values.salaryTo}
            onChange={handleChange}
            {...fieldValidation(touched, errors, "salaryTo")}
          />
        </Stack>
        <FormControl fullWidth>
          <Autocomplete
            multiple
            options={JOB_TAGS}
            value={values.tags}
            onChange={(e, value) => setFieldValue("tags", value)}
            {...fieldValidation(touched, errors, "tags")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Type to search tags"
                sx={{
                  ...AutocompleteTextField,
                }}
              />
            )}
          />
          {formHelperText(touched, errors, "tags")}
        </FormControl>
        <FormControl fullWidth>
          <Autocomplete
            multiple
            options={courses.map((e) => e.uid)}
            value={values.requiredCoursesIds}
            onChange={(e, value) => setFieldValue("requiredCoursesIds", value)}
            {...fieldValidation(touched, errors, "requiredCoursesIds")}
            renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Typography>
                    {courses.find((e) => e.uid === option)?.title}
                  </Typography>
                </li>
              );
            }}
            renderTags={(value, getTagProps) =>
              AutocompleteTags(
                value.map((i) => courses.find((e) => e.uid === i)?.title ?? i),
                getTagProps
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Required Courses"
                placeholder="Type to search courses"
                sx={{
                  ...AutocompleteTextField,
                }}
              />
            )}
          />
          {formHelperText(touched, errors, "requiredCoursesIds")}
        </FormControl>
        <FormControl>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            init={EDITOR_INIT}
            value={values.requirements}
            onEditorChange={(e) => setFieldValue("requirements", e)}
          />
          {formHelperText(touched, errors, "requirements")}
        </FormControl>

        <FormControl>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            init={EDITOR_INIT}
            value={values.responsibilities}
            onEditorChange={(e) => setFieldValue("responsibilities", e)}
          />
          {formHelperText(touched, errors, "responsibilities")}
        </FormControl>
        {update && (
          <Button
            size="large"
            variant="outlined"
            component={NextLinkComposed}
            to={`/admin/careers/applicant-test/${update.uid}`}>
            Applicant Tasks
          </Button>
        )}
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          size="large">
          {Boolean(update) ? "Update Position" : "Create Position"}
        </LoadingButton>
      </Stack>
      {Boolean(update) && (
        <LoadingButton
          variant="contained"
          size="large"
          loading={deleting}
          color="error"
          onClick={openDeleteConfirmation}>
          Delete Position
        </LoadingButton>
      )}
      {Boolean(update) && (
        <ConfirmationDialog
          open={deleteConfirmation}
          handleClose={closeDeleteConfirmation}
          confirm={deletePosition}
          title="Delete This Position?"
          description="This action cannot be undone. This will permanently delete the position and all its applicants."
        />
      )}
    </Stack>
  );
};

export default PositionForm;
