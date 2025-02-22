"use client";

import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import { RootState } from "@/store";
import { CATEGORIES, MATCH_ROLE } from "@/utils/constants";
import { fieldValidation, formHelperText } from "@/utils/fieldValidation";
import firebaseUpload from "@/utils/firebaseUpload";
import { useToast } from "@/utils/toast";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Course } from "@prisma/client";
import { Editor } from "@tinymce/tinymce-react";
import { AxiosResponse } from "axios";
import { getStorage, ref } from "firebase/storage";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import { NextLinkComposed } from "../Mui/Link";
import UpdateThumbnail from "./UpdateThumbnail";

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

const EDITOR_INIT = {
  height: 250,
  menubar: false,
  plugins: EDITOR_PLUGINS,
  toolbar: EDITOR_TOOLBAR,
  content_style: CONTENT_STYLE,
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("A title is required")
    .max(30, "The title should be less than 30 characters"),
  description: Yup.string()
    .required("A description is required")
    .min(255, "description must be between 255 and 2500 characters")
    .max(2500, "description must be between 255 and 2500 characters"),
  category: Yup.string().required("Course category is required"),
  price: Yup.number().required("Course price is required"),
});

const CourseForm = ({ update }: { update?: Course }) => {
  const router = useRouter();
  const { showToast } = useToast();

  const user = useSelector((state: RootState) => state.user);

  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const openDeleteConfirmation = () => setDeleteConfirmation(true);
  const closeDeleteConfirmation = () => setDeleteConfirmation(false);

  const [publishing, setPublishing] = useState(false);

  const deleteCourse = async () => {
    setDeleting(true);
    const response: AxiosResponse<{ course: Course }> = await api.delete(
      `/api/courses/${update?.uid}`
    );
    if (response.status === 200) {
      showToast("success", "Course deleted successfuly");
      router.push("/admin/courses");
    }
    setDeleting(false);
  };

  const publishCourse = async (published: boolean = true) => {
    setPublishing(true);
    if (update) {
      const response: AxiosResponse<{ course: Course }> = await api.patch(
        `/api/courses`,
        { uid: update.uid, published }
      );
      if (response.status === 200) {
        showToast(
          "success",
          `Course ${published ? "Published" : "Unpublished"} successfuly`
        );
        router.refresh();
      }
    }
    setPublishing(false);
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
      description: update?.description ?? "Description",
      category: update?.category ?? "",
      thumbnail: update?.thumbnail ?? "",
      price: update?.price ?? "",
      ordinaryPrice: update?.ordinaryPrice ?? "",
    },
    validationSchema,
    async onSubmit(values, formikHelpers) {
      if (!values.thumbnail) {
        showToast("error", "Course thumbnail is required");
        return;
      }
      if (values.thumbnail !== update?.thumbnail && values.thumbnail) {
        const storage = getStorage();
        // @ts-ignore
        const file: File = values.thumbnail;
        if (file?.name) {
          const ext = file?.name.split(".").pop();
          const profileRef = ref(
            storage,
            `courses/${Date.now()}.${ext ?? "jpg"}`
          );
          values.thumbnail = await firebaseUpload(profileRef, file);
        }
      }
      const requestValues = {
        ...values,
        ordinaryPrice:
          values.ordinaryPrice === "" ? null : values.ordinaryPrice,
      };
      if (update) {
        const response: AxiosResponse<{ course: Course; message: string }> =
          await api.patch("/api/courses", {
            uid: update.uid,
            ...requestValues,
          });
        if (response.status === 200) {
          showToast("success", response.data.message);
          router.push("/admin/courses");
        }
      } else {
        const response: AxiosResponse<{ course: Course; message: string }> =
          await api.post("/api/courses", requestValues);
        if (response.status === 201) {
          showToast("success", response.data.message);
          router.push(`/admin/courses/${response.data.course.uid}`);
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
            {Boolean(update) ? "Update Course" : "Create Course"}
          </Typography>
          <Typography variant="labellg">
            Publish or update a course you are offering
          </Typography>
          <Typography variant="labellg" color="var(--text-primary)">
            All Fields are Required
          </Typography>
        </Stack>
        {!!update && MATCH_ROLE(user.roles, "admin") && (
          <LoadingButton
            loading={publishing}
            variant={update.published ? "contained" : "outlined"}
            onClick={() => publishCourse(!update.published)}
            color={update.published ? "error" : "inherit"}>
            {update.published ? "Unpublish" : "Publish"}
          </LoadingButton>
        )}
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={{ xs: 2, sm: 3 }}>
        <UpdateThumbnail
          initialPhoto={update?.thumbnail}
          setFieldValue={setFieldValue}
          name="thumbnail"
          title="Course Thumbnail"
        />
        <TextField
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "title")}
        />
        <FormControl>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            init={EDITOR_INIT}
            value={values.description}
            onEditorChange={(e) => setFieldValue("description", e)}
          />
          {formHelperText(touched, errors, "description")}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="category-label">Course Category</InputLabel>
          <Select
            labelId="category-label"
            label="Course Category"
            name="category"
            value={values.category}
            onChange={handleChange}
            {...fieldValidation(touched, errors, "category")}>
            {CATEGORIES.map((category) => (
              <MenuItem key={`category:${category}`} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          {formHelperText(touched, errors, "category")}
        </FormControl>
        <TextField
          label="Campaign/Actual Price"
          InputProps={{
            startAdornment: (
              <Typography sx={{ marginLeft: "14px" }}>$</Typography>
            ),
          }}
          type="number"
          fullWidth
          name="price"
          value={values.price}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "price")}
        />
        <TextField
          label="Ordinary/Previous Price"
          InputProps={{
            startAdornment: (
              <Typography sx={{ marginLeft: "14px" }}>$</Typography>
            ),
          }}
          type="number"
          fullWidth
          name="ordinaryPrice"
          value={values.ordinaryPrice}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "ordinaryPrice")}
        />
        {update && (
          <Button
            size="large"
            variant="outlined"
            component={NextLinkComposed}
            to={`/admin/courses/${update.uid}`}>
            Update Course Content
          </Button>
        )}
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          size="large">
          {Boolean(update) ? "Update Course" : "Create Course"}
        </LoadingButton>
      </Stack>
      {Boolean(update) && (
        <LoadingButton
          variant="contained"
          size="large"
          loading={deleting}
          color="error"
          onClick={openDeleteConfirmation}>
          Delete Course
        </LoadingButton>
      )}
      {Boolean(update) && (
        <ConfirmationDialog
          open={deleteConfirmation}
          handleClose={closeDeleteConfirmation}
          confirm={deleteCourse}
          title="Delete This Course?"
          description="This action cannot be undone. This will permanently delete the course and all its lessons."
        />
      )}
    </Stack>
  );
};

export default CourseForm;
