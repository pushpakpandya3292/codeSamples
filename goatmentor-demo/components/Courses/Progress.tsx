import { CourseProgressInfo } from "@/prisma/constants";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { NextLinkComposed } from "../Mui/Link";

interface Props {
  enrollment: CourseProgressInfo;
}

const CourseProgressCard = ({ enrollment }: Props) => {
  const completedLessons = enrollment.progress.filter((p) =>
    enrollment.course.chapters.some((c) => c.lessons.some((l) => l.uid === p))
  ).length;
  const totalLessons = enrollment.course.chapters.reduce(
    (acc, curr) => acc + curr._count.lessons,
    0
  );
  const progress = Math.round((completedLessons / (totalLessons || 1)) * 100);
  return (
    <Stack
      gap={2}
      className="border-hover"
      component={NextLinkComposed}
      to={`/courses/${enrollment.course.uid}`}
      sx={{
        minWidth: "250px",
        maxWidth: "250px",
        borderRadius: "var(--radius-sm)",
        border: " 1px solid var(--border)",
        backgroundColor: "var(--surface-secondary)",
        padding: 1,
        paddingBottom: 3,
      }}>
      <div className="img-hover" style={{ borderRadius: "var(--radius-sm)" }}>
        <Image
          src={enrollment.course.thumbnail}
          alt="Course thumbnail"
          width={320}
          height={250}
          style={{
            borderRadius: "var(--radius-sm)",
            objectFit: "cover",
            width: "100%",
            aspectRatio: "4 / 3",
            height: "auto",
          }}
        />
      </div>

      <Stack sx={{ paddingInline: 1 }} gap={2} alignItems="flex-start">
        <Typography variant="titlesm">{enrollment.course.title}</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            aria-label={`${progress}% progress bar`}
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="labelmd" color="text-subtitle">
              {progress}%
            </Typography>
            <Typography variant="labelmd" color="text-subtitle">
              {completedLessons}/{totalLessons}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CourseProgressCard;
