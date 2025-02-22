"use client";
import { ChapterInput, LessonForm } from "@/prisma/constants";
import { vimeo } from "@/vimeo";
import {
  faChevronDown,
  faChevronUp,
  faCloudArrowUp,
  faEdit,
  faLinkSimple,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense, SyntheticEvent, useState } from "react";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import LoadingButton from "../Common/LoadingButton";
import LoadingIndicator from "../Common/LoadingIndicator";

const VimeoUploader = dynamic(() => import("./UploadVideo"));

interface Props {
  expanded: string | false;
  handleAccordionChange: (
    panel: string
  ) => (event: SyntheticEvent, newExpanded: boolean) => void;
  index: number;
  chapter: ChapterInput;
  onEditTitle: () => void;
  onDelete: () => void;
  onUpdate: (chapter: ChapterInput) => void;
  onUp: () => void;
  onDown: () => void;
}

const ChapterForm = ({
  expanded,
  handleAccordionChange,
  chapter,
  onEditTitle,
  onDelete,
  onUpdate,
  index,
  onUp,
  onDown,
}: Props) => {
  const tablet = useMediaQuery("(min-width:768px)");

  const [updating, setUpdating] = useState<number>();

  const [uploaderOpen, setUploaderOpen] = useState(false);
  const openUploader = () => setUploaderOpen(true);
  const closeUploader = (e: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    setUploaderOpen(false);
  };

  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number>();
  const openDeleteConfirmation = (e: number) => setDeleteConfirmation(e);
  const closeDeleteConfirmation = () => setDeleteConfirmation(undefined);

  const update = (title: string, newLessons: LessonForm[]) =>
    onUpdate({
      uid: chapter?.uid,
      title: title,
      vimeoFolder: chapter.vimeoFolder,
      lessons: newLessons.map((lesson) => ({
        uid: lesson.uid,
        title: lesson.title,
        source: lesson.source,
        duration: lesson.duration,
        vimeoUri: lesson.vimeoUri,
      })),
    });

  const submit = async (values: {
    uid?: string | undefined;
    title: string;
    source: string;
    vimeoUri: string;
    duration: number;
  }) => {
    let newLessons: LessonForm[] = [...chapter.lessons, values];
    if (updating !== undefined) {
      newLessons = chapter.lessons.map((e, i) => (i === updating ? values : e));
      setUpdating(undefined);
    }
    update(chapter.title, newLessons);
  };

  const deleteLesson = () => {
    const lesson = chapter.lessons.find((_, i) => i === deleteConfirmation);
    if (lesson) {
      setDeleting(true);
      vimeo.request(
        { path: lesson.vimeoUri, method: "DELETE" },
        function (error, body, statusCode, headers) {
          if (error) console.log("Server error: " + error);
          const newLessons = () =>
            chapter.lessons.filter((_, index) => index !== deleteConfirmation);
          update(chapter.title, newLessons());
          setDeleting(false);
        }
      );
    }
  };

  return (
    <Accordion
      expanded={expanded === `chapter${index + 1}`}
      onChange={handleAccordionChange(`chapter${index + 1}`)}
      sx={{
        "& .MuiAccordion-region": {
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        },
      }}>
      <AccordionSummary
        aria-controls={`chapter${index + 1}-content`}
        id={`chapter${index + 1}-header`}
        sx={{
          pointerEvents: "none",
          "&.Mui-focusVisible": {
            backgroundColor: "var(--surface-secondary)",
          },
          "& .MuiAccordionSummary-content": {
            gap: 2,
            marginRight: "1rem !important",
            alignItems: "center",
            overflow: "hidden",
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
        <Stack sx={{ cursor: "pointer", pointerEvents: "auto" }}>
          <FontAwesomeIcon
            icon={faChevronUp}
            color="var(--text-subtitle)"
            size="sm"
            style={{ padding: "0.125rem 0.25rem" }}
            onClick={(e) => {
              e.stopPropagation();
              onUp();
            }}
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            color="var(--text-subtitle)"
            size="sm"
            style={{ padding: "0.125rem 0.25rem" }}
            onClick={(e) => {
              e.stopPropagation();
              onDown();
            }}
          />
        </Stack>
        <Typography className="text-ellipsis" sx={{ flexGrow: 1 }}>
          Chapter {index + 1}:{" "}
          <Typography variant="titlelg" sx={{ display: "inline" }}>
            {chapter.title}
          </Typography>
        </Typography>
        <Stack direction="row" gap={1}>
          <IconButton
            size={tablet ? "medium" : "small"}
            sx={{ pointerEvents: "auto" }}
            onClick={(e) => {
              e.stopPropagation();
              onEditTitle();
            }}>
            <FontAwesomeIcon icon={faEdit} color="var(--text-subtitle)" />
          </IconButton>
          <IconButton
            size={tablet ? "medium" : "small"}
            sx={{ pointerEvents: "auto" }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}>
            <FontAwesomeIcon icon={faTrash} color="var(--error)" />
          </IconButton>
        </Stack>
      </AccordionSummary>
      {chapter.lessons.map((lesson, i) => (
        <AccordionDetails
          key={`lesson:${i}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderTop: "none",
          }}>
          <Stack sx={{ cursor: "pointer" }}>
            <FontAwesomeIcon
              icon={faChevronUp}
              color="var(--text-subtitle)"
              size="xs"
              style={{ padding: "0.125rem 0.25rem" }}
              onClick={() => {
                if (i === 0) return;
                const newLessons = () => {
                  const temp = [...chapter.lessons];
                  const [removed] = temp.splice(i, 1);
                  temp.splice(i - 1, 0, removed);
                  return temp;
                };
                update(chapter.title, newLessons());
              }}
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              color="var(--text-subtitle)"
              size="xs"
              style={{ padding: "0.125rem 0.25rem" }}
              onClick={() => {
                if (i === chapter.lessons.length - 1) return;
                const newLessons = () => {
                  const temp = [...chapter.lessons];
                  const [removed] = temp.splice(i, 1);
                  temp.splice(i + 1, 0, removed);
                  return temp;
                };
                update(chapter.title, newLessons());
              }}
            />
          </Stack>
          <Typography variant="labellg">
            Lesson {i + 1}: {lesson.title}
          </Typography>
          <FontAwesomeIcon
            icon={faLinkSimple}
            color="var(--text-subtitle)"
            style={{ marginLeft: "1rem" }}
          />
          <Typography
            variant="labelmd"
            color="var(--text-subtitle)"
            sx={{ flex: 1 }}>
            {lesson.source}
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              setUpdating(i);
              openUploader();
            }}>
            <FontAwesomeIcon icon={faEdit} color="var(--text-subtitle)" />
          </IconButton>
          <IconButton size="small" onClick={() => openDeleteConfirmation(i)}>
            <FontAwesomeIcon icon={faTrash} color="var(--error)" />
          </IconButton>
        </AccordionDetails>
      ))}
      <AccordionDetails sx={{ borderTop: "none" }}>
        <LoadingButton
          loading={deleting}
          variant="outlined"
          type="button"
          size="large"
          onClick={() => {
            setUpdating(undefined);
            openUploader();
          }}
          sx={{ width: "100%" }}
          startIcon={<FontAwesomeIcon icon={faCloudArrowUp} />}>
          Upload Lesson
        </LoadingButton>
      </AccordionDetails>
      {uploaderOpen && (
        <Suspense fallback={<LoadingIndicator />}>
          <VimeoUploader
            open={uploaderOpen}
            onClose={closeUploader}
            folder={chapter.vimeoFolder}
            updating={
              updating !== undefined ? chapter.lessons[updating] : undefined
            }
            onSubmit={submit}
          />
        </Suspense>
      )}
      <ConfirmationDialog
        open={deleteConfirmation !== undefined}
        handleClose={closeDeleteConfirmation}
        confirm={deleteLesson}
        title="Delete This Lesson?"
        description="This action cannot be undone. This will permanently delete the lesson and its video."
      />
    </Accordion>
  );
};

export default ChapterForm;
