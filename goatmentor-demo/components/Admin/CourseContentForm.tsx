"use client";

import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import { ChapterDetails, ChapterInput } from "@/prisma/constants";
import { fieldValidation } from "@/utils/fieldValidation";
import { useToast } from "@/utils/toast";
import { vimeo } from "@/vimeo";
import { faCloudArrowUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import ChapterForm from "./ChapterForm";

const validationSchema = Yup.object().shape({
  chapter: Yup.string().required("Chapter title is required"),
});

const CourseContentForm = ({
  update,
}: {
  update: { uid: string; vimeoFolder: string; chapters: ChapterDetails[] };
}) => {
  const router = useRouter();
  const { showToast } = useToast();

  const [expanded, setExpanded] = useState<string | false>("chapter1");
  const handleAccordionChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [chapters, setChapters] = useState<ChapterInput[]>(update.chapters);
  const [updating, setUpdating] = useState<number>();
  const [creatingChapter, setCreatingChapter] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState<number>();
  const openDeleteConfirmation = (e: number) => setDeleteConfirmation(e);
  const closeDeleteConfirmation = () => setDeleteConfirmation(undefined);

  const [submitting, setSubmitting] = useState(false);
  const submit = async () => {
    setSubmitting(true);
    const data = chapters.map(({ lessons, ...c }, i) => {
      return {
        ...c,
        number: i + 1,
        lessons: lessons.map((l, j) => {
          return {
            ...l,
            number:
              j +
              1 +
              (i > 0
                ? chapters.slice(0, i).reduce((a, b) => a + b.lessons.length, 0)
                : 0),
          };
        }),
      };
    });
    const response: AxiosResponse<{ message: string }> = await api.post(
      `/api/courses/${update.uid}`,
      { chapters: data }
    );
    setSubmitting(false);
  };

  const verify = (func: () => void, isSubmit?: boolean) => {
    if (isSubmit && chapters.length < 1) {
      showToast("error", "Please add at least one chapter");
      return;
    }
    if (chapters.some((chapter, i) => !chapter.title)) {
      showToast("error", "Please add a title to all chapters");
      return;
    }
    if (chapters.some((chapter, i) => !chapter.lessons.length)) {
      showToast("error", "Please add at least one lesson in all chapters");
      return;
    }
    func();
  };

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik<{
    uid?: string | undefined;
    chapter: string;
  }>({
    initialValues: {
      uid: undefined,
      chapter: "",
    },
    validationSchema,
    enableReinitialize: true,
    async onSubmit(values, formikHelpers) {
      setCreatingChapter(true);
      if (updating !== undefined) {
        const chapter = chapters.find((_, i) => i === updating);
        if (chapter)
          vimeo.request(
            {
              method: "PATCH",
              path: chapter.vimeoFolder,
              query: {
                name: values.chapter,
              },
            },
            (error, body, status_code, headers) => {
              if (error) console.log("error", error.message);
              setChapters((chapters) =>
                chapters.map((chapter, i) =>
                  i === updating
                    ? { ...chapter, title: values.chapter }
                    : chapter
                )
              );
              setUpdating(undefined);
              formikHelpers.resetForm();
              setCreatingChapter(false);
            }
          );

        return;
      }
      verify(() => {
        vimeo.request(
          {
            method: "POST",
            path: `/me/projects`,
            query: {
              name: values.chapter,
              parent_folder_uri: update.vimeoFolder,
            },
          },
          (error, body, status_code, headers) => {
            if (error || !body?.uri) {
              showToast("error", error?.message ?? "Something went wrong");
              return;
            }
            setChapters((chapters) => [
              ...chapters,
              { title: values.chapter, lessons: [], vimeoFolder: body.uri },
            ]);
            setExpanded(`chapter${chapters.length + 1}`);
            formikHelpers.resetForm();
            setCreatingChapter(false);
          }
        );
      });
    },
  });

  const deleteChapter = () => {
    const chapter = chapters.find((_, i) => i === deleteConfirmation);
    if (chapter) {
      setCreatingChapter(true);
      vimeo.request(
        {
          method: "DELETE",
          path: `${chapter.vimeoFolder}?should_delete_clips=true`,
        },
        (error, body, status_code, headers) => {
          if (error) console.log("error", error.message);
          setChapters((c) => c.filter((_, j) => j !== deleteConfirmation));
          setCreatingChapter(false);
        }
      );
    }
  };

  const [saves, setSaves] = useState(0);
  useEffect(() => {
    if (saves === 0) {
      setSaves(1);
      return;
    }
    submit();
  }, [chapters]);

  return (
    <Stack gap={4}>
      <Stack direction="row" gap={2} flexWrap="wrap" alignItems="center">
        <Stack gap={1} sx={{ flex: 1 }}>
          <Typography variant="headlinelg" color="var(--text-title)">
            Update Course Content
          </Typography>
          <Typography variant="labellg">
            Create or edit chapters and lessons for your course.
          </Typography>
          <Typography variant="labellg" color="var(--text-primary)">
            Note: First lesson will be the introduction preview.
          </Typography>
        </Stack>
        <LoadingButton
          loading={submitting}
          variant="text"
          size="small"
          endIcon={
            <Typography>{submitting ? "Saving" : "Autosaved"}</Typography>
          }>
          <FontAwesomeIcon icon={faCloudArrowUp} size="lg" />
        </LoadingButton>
      </Stack>

      <Stack gap={{ xs: 2, sm: 3 }}>
        <Stack>
          {chapters.map((chapter, i) => (
            <ChapterForm
              key={`chapter:${i}`}
              expanded={expanded}
              handleAccordionChange={handleAccordionChange}
              chapter={chapter}
              index={i}
              onEditTitle={() => {
                setUpdating(i);
                setValues({ uid: chapter.uid, chapter: chapter.title });
              }}
              onDelete={() => openDeleteConfirmation(i)}
              onUpdate={(newChapter) => {
                setChapters((c) =>
                  c.map((chapter, j) => (j === i ? newChapter : chapter))
                );
              }}
              onUp={() => {
                if (i === 0) return;
                setChapters((c) => {
                  const temp = [...c];
                  const [removed]: ChapterInput[] = temp.splice(i, 1);
                  temp.splice(i - 1, 0, removed);
                  return temp;
                });
              }}
              onDown={() => {
                if (i === chapters.length - 1) return;
                setChapters((c) => {
                  const temp = [...c];
                  const [removed] = temp.splice(i, 1);
                  temp.splice(i + 1, 0, removed);
                  return temp;
                });
              }}
            />
          ))}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              padding: "1rem",
              borderBlock: "1px solid var(--border)",
              background: "var(--surface-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
            <TextField
              label="Chapter Title"
              name="chapter"
              value={values.chapter}
              onChange={handleChange}
              {...fieldValidation(touched, errors, "chapter")}
              sx={{ width: "100%" }}
            />
            <LoadingButton
              loading={creatingChapter}
              variant="outlined"
              size="large"
              sx={{ width: "100%" }}
              type="submit">
              {updating === undefined ? "Create" : "Update"} Chapter
            </LoadingButton>
          </Box>
        </Stack>
      </Stack>
      <ConfirmationDialog
        open={deleteConfirmation !== undefined}
        handleClose={closeDeleteConfirmation}
        confirm={deleteChapter}
        title="Delete This Chapter?"
        description="This action cannot be undone. This will permanently delete the chapter and all its lessons."
      />
    </Stack>
  );
};

export default CourseContentForm;
