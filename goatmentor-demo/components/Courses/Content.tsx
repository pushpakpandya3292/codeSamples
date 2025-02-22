"use client";

import { api } from "@/axios";
import Avatar from "@/components/Common/Avatar";
import EnrollmentSuccessful from "@/components/Courses/Success";
import { CourseDetails } from "@/prisma/constants";
import { COURSE_DURATION } from "@/utils/constants";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faClapperboardPlay,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VimeoPlayer from "@vimeo/player";
import { useRouter, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import DataWrapper from "../Common/DataWrapper";
import CertificateButton from "./Certificate";

const icon = {
  color: "#fff",
  border: "1px solid #fff",
  "&:hover": {
    border: "1px solid var(--border-primary)",
    color: "var(--border-primary)",
  },
};

interface LessonProps {
  course: CourseDetails;
  lesson: {
    number: number;
    uid: string;
    title: string;
    source: string;
    duration: number;
  };
  progress: string[];
  onClick?: () => void;
}

const LessonDetails = ({ course, lesson, progress, onClick }: LessonProps) => {
  const [watched, setWatched] = useState(progress.includes(lesson.uid));

  const updateProgress = async (value: boolean) => {
    setWatched(value);
    const response = await api.post(`/api/courses/${course.uid}/enroll`, {
      completed: value,
      lesson: lesson.uid,
    });
    if (response.status !== 200) {
      setWatched(!value);
    }
  };

  useEffect(() => {
    setWatched(progress.includes(lesson.uid));
  }, [progress, lesson.uid]);

  return (
    <AccordionDetails
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}>
      <Checkbox
        checked={watched}
        onChange={(e) => updateProgress(e.target.checked)}
      />
      <Typography
        variant="labellg"
        color="var(--text-subtitle)"
        onClick={onClick}
        sx={{ flex: 1, cursor: !onClick ? "default" : "pointer" }}>
        {`Lesson ${lesson.number}: ${lesson.title}`}
      </Typography>
      <FontAwesomeIcon icon={faClapperboardPlay} />
      <Typography variant="labelmd" color="var(--text-subtitle)">
        {COURSE_DURATION(lesson.duration)}
      </Typography>
    </AccordionDetails>
  );
};

interface Props {
  course: CourseDetails;
  authenticated?: boolean;
}

const CourseContent = ({ course, authenticated = true }: Props) => {
  const tablet = useMediaQuery("(min-width:768px)");

  const router = useRouter();
  const search = useSearchParams();

  const [enrollmentOpen, setEnrollmentOpen] = useState(
    search.get("success") === "true"
  );
  const closeEnrollmentSuccess = () => {
    setEnrollmentOpen(false);
    window.location.href = `/courses/${course.uid}`;
  };
  const [expanded, setExpanded] = useState<string | false>("chapter1");
  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const enrollment = course.enrollments?.find((e) => true);
  const isEnrolled = !!enrollment;
  const preview = course.chapters[0].lessons[0];

  const completed =
    course?.chapters
      .map((chapter) => chapter.lessons.map((l) => l.uid))
      .flat()
      ?.every((lesson) => enrollment?.progress.includes(lesson)) ?? true;

  const lessons = course.chapters.map((chapter) => chapter.lessons).flat();
  const maxLesson = Math.max(...lessons.map((e) => e.number));

  const [currentLesson, setCurrentLesson] = useState(
    Math.min(
      Math.max(
        ...lessons
          .filter((l) => (enrollment?.progress ?? []).includes(l.uid))
          .map((e) => e.number),
        0
      ) + 1,
      maxLesson
    )
  );
  const currentLessonInfo =
    lessons.find((e) => e.number === currentLesson) ?? preview;
  let currentVideo = useRef<VimeoPlayer | null>(null);

  const markAsCompleted = async (
    data: VimeoPlayer.TimeEvent,
    lessonId: string
  ) => {
    if (
      data.duration - data.seconds <= 15 &&
      !enrollment?.progress.includes(lessonId)
    ) {
      const response = await api.post(`/api/courses/${course.uid}/enroll`, {
        completed: true,
        lesson: lessonId,
      });
      if (response.status === 200) {
        router.refresh();
      }
    }
  };

  useEffect(() => {
    const lessonId = currentLessonInfo.uid;
    currentVideo.current?.destroy();
    currentVideo.current = null;
    currentVideo.current = new VimeoPlayer(`course-iframe`, {
      url: currentLessonInfo.source,
      width: 1920,
      height: 1080,
    });
    if (isEnrolled) {
      currentVideo.current?.on("progress", async (data) => {
        markAsCompleted(data, lessonId);
      });
      currentVideo.current?.on("ended", async (data) => {
        markAsCompleted(data, lessonId);
        next();
      });
    }
  }, [currentLesson]);

  const next = () => {
    if (currentLesson < maxLesson) {
      setCurrentLesson(currentLesson + 1);
    }
  };
  const prev = () => {
    if (currentLesson > 1) {
      setCurrentLesson(currentLesson - 1);
    }
  };
  return (
    <Stack gap={3}>
      <Box
        id={`course-iframe`}
        sx={{
          position: "relative",
          backgroundColor: "#000",
          maxHeight: { xs: "calc(100vh - 88px)", lg: "calc(100vh - 112px)" },
          margin: { xs: -2, lg: -6 },
          marginBottom: "0 !important",
          aspectRatio: "16 / 9",
          "& iframe": {
            display: "block",
            maxWidth: "100%",
            width: "100%",
            height: "100%",
            aspectRatio: "16 / 9",
          },
        }}>
        <Stack
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "1rem 2rem",
            color: "#fff",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.50) 50%, rgba(0, 0, 0, 0.00) 100%)",
          }}>
          <Typography
            variant="headlinelg"
            sx={{ display: { xs: "none", lg: "inline-flex" } }}>
            {course.title}
          </Typography>
          <Typography variant="headlinesm">
            {currentLessonInfo.number}. {currentLessonInfo.title}
          </Typography>
        </Stack>
        {isEnrolled && (
          <>
            {currentLesson > 1 && (
              <IconButton
                aria-label="Back button"
                onClick={prev}
                sx={{
                  ...icon,
                  position: "absolute",
                  top: "50%",
                  left: "1rem",
                  transform: "translateY(-50%)",
                }}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size={tablet ? "lg" : "sm"}
                />
              </IconButton>
            )}
            {currentLesson < maxLesson && (
              <IconButton
                aria-label="Next button"
                onClick={next}
                sx={{
                  ...icon,
                  position: "absolute",
                  top: "50%",
                  right: "1rem",
                  transform: "translateY(-50%)",
                }}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size={tablet ? "lg" : "sm"}
                />
              </IconButton>
            )}
          </>
        )}
      </Box>
      <Typography
        variant="headlinemd"
        sx={{ display: { xs: "inline-flex", lg: "none" } }}>
        {course.title}
      </Typography>
      {!isEnrolled && (
        <Stack
          direction="row"
          gap={4}
          alignItems="center"
          sx={{ alignSelf: "flex-end", padding: "0.5rem 0" }}>
          <Typography variant="headlinemd" color="var(--text-primary)">
            ${course.price}
          </Typography>
          {course.ordinaryPrice && (
            <Typography
              variant="titlelg"
              color="var(--text-subtitle)"
              sx={{ textDecoration: "line-through", marginLeft: -2 }}>
              ${course.ordinaryPrice}
            </Typography>
          )}
          <Button
            size="large"
            variant="contained"
            component="a"
            href={`${authenticated ? "" : "/login?redirect="}/api/courses/${
              course.uid
            }/enroll`}
            sx={{ width: { md: "15rem" } }}>
            Enroll Now
          </Button>
          <EnrollmentSuccessful
            open={enrollmentOpen}
            onClose={closeEnrollmentSuccess}
          />
        </Stack>
      )}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="headlinesm" color="var(--text-title)">
          Course Content
        </Typography>
        <Chip label={course.category} size={tablet ? "medium" : "small"} />
      </Stack>
      <DataWrapper
        data={course.chapters.length > 0}
        sx={{ alignSelf: "stretch" }}
        title="No uploaded videos"
        description="Course content will be uploaded soon">
        <Stack>
          {course.chapters.map((chapter, i) => (
            <Accordion
              key={`chapter${i}`}
              expanded={expanded === `chapter${i + 1}`}
              onChange={handleChange(`chapter${i + 1}`)}>
              <AccordionSummary
                aria-controls={`chapter${i + 1}-content`}
                id={`chapter${i + 1}-header`}>
                <Typography>
                  Chapter {chapter.number}: {chapter.title}
                </Typography>
              </AccordionSummary>
              {chapter.lessons.map((lesson, j) => (
                <LessonDetails
                  key={`lesson${j}`}
                  course={course}
                  lesson={lesson}
                  progress={enrollment?.progress ?? []}
                  onClick={
                    isEnrolled
                      ? () => {
                          setCurrentLesson(lesson.number);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      : undefined
                  }
                />
              ))}
            </Accordion>
          ))}
        </Stack>
      </DataWrapper>
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="headlinesm"
          color="var(--text-title)"
          sx={{
            flexBasis: { lg: "15rem" },
          }}>
          Instructor
        </Typography>
        <Stack direction="row" gap={3} alignItems="center" sx={{ flex: 1 }}>
          <Avatar src={course.instructor.photo} alt="Profile" width={80} />
          <Stack gap="0.25rem">
            <Typography variant="headlinemd">
              {course.instructor.fullName}
            </Typography>
            {course.instructor.linkedin && (
              <Typography variant="titlelg" color="var(--text-subtitle)">
                <FontAwesomeIcon icon={faLinkedin} /> @
                {course.instructor.linkedin}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="headlinesm"
          color="var(--text-title)"
          sx={{
            flexBasis: { lg: "15rem" },
          }}>
          Description
        </Typography>
        <Typography variant="bodylg" sx={{ flex: 1 }}>
          <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
        </Typography>
      </Stack>
      <Stack direction={{ md: "row" }} gap={3}>
        <Typography
          variant="headlinesm"
          color="var(--text-title)"
          sx={{
            flexBasis: { lg: "15rem" },
          }}>
          Certification
        </Typography>
        <Stack gap={2} sx={{ flex: 1 }}>
          <Typography variant="titlemd">
            Receive a certificate after completing the course
          </Typography>
          <CertificateButton completed={completed} course={course} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CourseContent;
