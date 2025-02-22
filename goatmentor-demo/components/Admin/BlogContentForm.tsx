"use client";

import { api } from "@/axios";
import { READ_TIME } from "@/utils/constants";
import { formHelperText } from "@/utils/fieldValidation";
import { useToast } from "@/utils/toast";
import { faCopy, faEdit, faTimer } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Blog } from "@prisma/client";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import BlogHero from "../Blogs/Hero";
import CustomEditor from "../CkEditor/editor";
import Avatar from "../Common/Avatar";
import LoadingButton from "../Common/LoadingButton";
import { NextLinkComposed } from "../Mui/Link";

interface IValidationValue {
  text?: string;
  items?: string[];
}

const validationSchema = Yup.object().shape({
  content: Yup.object().test(
    "oneOfKeys",
    "Blog content is required",
    (c: any) => {
      const blocks: { data: any }[] = c?.blocks;
      return blocks.some((block) => {
        const { text, items } = block.data as IValidationValue;
        return (text && text.trim().length > 0) || (items && items.length > 0);
      });
    }
  ),
});

const BlogContentForm = ({
  update,
}: {
  update: {
    author: {
      fullName: string;
      photo: string | null;
    };
  } & Blog;
}) => {
  const { showToast } = useToast();
  const router = useRouter();
  const tablet = useMediaQuery("(min-width:768px)");

  const { values, handleSubmit, errors, touched, isSubmitting, setFieldValue } =
    useFormik({
      initialValues: {
        content: {
          time: new Date().getTime(),
          blocks: update?.content
            ? JSON.parse(update?.content)
            : [
                {
                  type: "header",
                  data: {
                    text: "",
                    level: 1,
                  },
                },
              ],
        },
      },
      validationSchema,
      async onSubmit(values) {
        const { uid, title, introduction, tags, featuredImage, category } =
          update;
        const payload = {
          uid,
          title,
          introduction,
          tags,
          featuredImage,
          category,
          content: JSON.stringify(values.content.blocks),
        };

        if (update) {
          const response: AxiosResponse<{ blog: Blog }> = await api.patch(
            "/api/blogs",
            payload
          );
          if (response.status === 200) {
            showToast("success", "Blog Updated successfully");
            router.push("/admin/blogs");
          }
        }
      },
    });

  return (
    <Stack gap={{ xs: 6, md: 8 }} alignItems="center">
      <Button
        variant="outlined"
        component={NextLinkComposed}
        to={`/admin/blogs/create?update=${update.uid}`}
        startIcon={<FontAwesomeIcon icon={faEdit} />}
        sx={{ alignSelf: "flex-end" }}>
        Update Details
      </Button>
      <BlogHero blog={update} />
      <Stack
        component="form"
        onSubmit={handleSubmit}
        gap={3}
        sx={{
          paddingInline: { xs: 1, md: 4 },
          maxWidth: "1024px",
          width: "100%",
        }}>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          rowGap={4}>
          <Stack direction="row" gap={2} alignItems="center">
            <Avatar
              src={update.author.photo}
              alt="Profile"
              width={tablet ? 64 : 48}
            />
            <Stack gap="4px">
              <Typography variant="titlelg">
                {update.author.fullName}
              </Typography>
              <Typography variant="labellg" color="var(--text-subtitle)">
                {update.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <FontAwesomeIcon
              icon={faTimer}
              size="lg"
              color="var(--text-title)"
            />
            <Typography variant="labellg" color="var(--text-subtitle)">
              {READ_TIME(JSON.stringify(values.content.blocks))} min
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            "& #blog-editor": {
              ".ce-block__content, .ce-toolbar__content": {
                maxWidth: "800px",
                "& .image-tool__image-picture": {
                  m: "auto",
                },
              },
            },
          }}>
          <CustomEditor
            editorblock="blog-editor"
            value={values.content}
            onChange={(e) => setFieldValue("content", e)}
          />
          {formHelperText(touched, errors, "content")}
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={2}
          sx={{ marginBottom: 4 }}
          flexWrap="wrap">
          <Stack direction="row" gap="0.625rem" flexWrap="wrap">
            {update.tags.map((tag, index) => (
              <Chip key={`tag:${index}`} label={tag} variant="outlined" />
            ))}
          </Stack>
          <Button
            variant="outlined"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                showToast("success", "Link copied to clipboard");
              } else {
                showToast("error", "Failed to copy link");
              }
            }}
            startIcon={
              <FontAwesomeIcon icon={faCopy} color="var(--text-subtitle)" />
            }>
            Copy Link
          </Button>
        </Stack>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          size="large"
          type="submit">
          Update Content
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default BlogContentForm;
