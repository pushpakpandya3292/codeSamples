"use client";

import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import { RootState } from "@/store";
import { CATEGORIES, MATCH_ROLE } from "@/utils/constants";
import { fieldValidation, formHelperText } from "@/utils/fieldValidation";
import firebaseUpload from "@/utils/firebaseUpload";
import { useToast } from "@/utils/toast";
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
import { Blog } from "@prisma/client";
import { AxiosResponse } from "axios";
import { getStorage, ref } from "firebase/storage";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import { NextLinkComposed } from "../Mui/Link";
import { AutocompleteTextField } from "../Mui/overrides/Autocomplete";
import UpdateThumbnail from "./UpdateThumbnail";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("A title is required")
    .max(80, "The title should be less than 80 characters"),
  introduction: Yup.string()
    .required("A introduction is required")
    .min(100, "Introduction must be between 100 and 255 characters")
    .max(255, "Introduction must be between 100 and 255 characters"),
  category: Yup.string().required("Blog category is required"),
  tags: Yup.array().min(1, "At least one tag is required").max(3, "Max 3 tags"),
});

const BlogForm = ({ update }: { update?: Blog }) => {
  const router = useRouter();
  const { showToast } = useToast();

  const user = useSelector((state: RootState) => state.user);

  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const openDeleteConfirmation = () => setDeleteConfirmation(true);
  const closeDeleteConfirmation = () => setDeleteConfirmation(false);

  const deleteBlog = async () => {
    setDeleting(true);
    const response: AxiosResponse<{ blog: Blog }> = await api.delete(
      `/api/blogs/${update?.uid}`
    );
    if (response.status === 200) {
      showToast("success", "Blog deleted successfuly");
      router.push("/admin/blogs");
    }
    setDeleting(false);
  };

  const [publishing, setPublishing] = useState(false);
  const publishBlog = async (published: boolean = true) => {
    if (update && update.content === "") {
      showToast("error", "Please update blog content for publish blog.");
    } else {
      setPublishing(true);
      if (update) {
        const response: AxiosResponse<{ blog: Blog }> = await api.patch(
          `/api/blogs`,
          { uid: update.uid, published }
        );
        if (response.status === 200) {
          showToast(
            "success",
            `Blog ${published ? "Published" : "Unpublished"} successfuly`
          );
          router.refresh();
        }
      }
      setPublishing(false);
    }
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
      introduction: update?.introduction ?? "",
      category: update?.category ?? "",
      tags: update?.tags ?? [],
      content: update?.content ?? "",
      featuredImage: update?.featuredImage ?? "",
    },
    validationSchema,
    async onSubmit(values, formikHelpers) {
      if (!values.featuredImage) {
        showToast("error", "Featured Image is required");
        return;
      }
      if (
        values.featuredImage !== update?.featuredImage &&
        values.featuredImage
      ) {
        const storage = getStorage();
        // @ts-ignore
        const file: File = values.featuredImage;
        if (file?.name) {
          const ext = file?.name.split(".").pop();
          const profileRef = ref(
            storage,
            `blogs/${Date.now()}.${ext ?? "jpg"}`
          );
          values.featuredImage = await firebaseUpload(profileRef, file);
        }
      }
      values.introduction = values.introduction.replace(/\n/g, " ").trim();

      if (update) {
        const response: AxiosResponse<{ blog: Blog }> = await api.patch(
          "/api/blogs",
          { uid: update.uid, ...values }
        );
        if (response.status === 200) {
          showToast("success", "Blog Updated successfully");
          router.push("/admin/blogs");
        }
      } else {
        const response: AxiosResponse<{ blog: Blog }> = await api.post(
          "/api/blogs",
          { ...values }
        );
        if (response.status === 201) {
          showToast("success", "Blog Created successfully");
          router.push(`/admin/blogs/${response.data.blog.uid}`);
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
            {Boolean(update) ? "Update Blog" : "Create Blog"}
          </Typography>
          <Typography variant="labellg">
            Publish or update a blog post
          </Typography>
          <Typography variant="labellg" color="var(--text-primary)">
            All Fields are Required
          </Typography>
        </Stack>
        {!!update && MATCH_ROLE(user.roles, "admin") && (
          <LoadingButton
            loading={publishing}
            variant={update.published ? "contained" : "outlined"}
            onClick={() => publishBlog(!update.published)}
            color={update.published ? "error" : "inherit"}>
            {update.published ? "Unpublish" : "Publish"}
          </LoadingButton>
        )}
      </Stack>

      <Stack component="form" onSubmit={handleSubmit} gap={{ xs: 2, sm: 3 }}>
        <UpdateThumbnail
          initialPhoto={update?.featuredImage}
          setFieldValue={setFieldValue}
          name="featuredImage"
        />
        <TextField
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "title")}
        />
        <TextField
          label={"Introduction" + ` (${values.introduction.length}/255)`}
          multiline
          rows={2}
          name="introduction"
          value={values.introduction}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "introduction")}
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Blog Category</InputLabel>
          <Select
            labelId="category-label"
            label="Blog Category"
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
        <Autocomplete
          multiple
          options={CATEGORIES}
          value={values.tags}
          onChange={(e, value) => setFieldValue("tags", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Type to search tags"
              {...fieldValidation(touched, errors, "tags")}
              sx={{
                ...AutocompleteTextField,
              }}
            />
          )}
        />
        {update && (
          <Button
            size="large"
            variant="outlined"
            component={NextLinkComposed}
            to={`/admin/blogs/${update.uid}`}>
            Update Blog Content
          </Button>
        )}
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          size="large">
          {Boolean(update) ? "Update Blog" : "Create Blog"}
        </LoadingButton>
      </Stack>
      {Boolean(update) && (
        <LoadingButton
          variant="contained"
          size="large"
          loading={deleting}
          color="error"
          onClick={openDeleteConfirmation}>
          Delete Blog
        </LoadingButton>
      )}
      {Boolean(update) && (
        <ConfirmationDialog
          open={deleteConfirmation}
          handleClose={closeDeleteConfirmation}
          confirm={deleteBlog}
          title="Delete This Blog?"
          description="This action cannot be undone. This will permanently delete the blog and all its data."
        />
      )}
    </Stack>
  );
};

export default BlogForm;
