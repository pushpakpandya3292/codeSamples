import { CourseCardInfo } from "@/prisma/constants";
import { COURSE_DURATION } from "@/utils/constants";
import { Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Avatar from "../Common/Avatar";
import { NextLinkComposed } from "../Mui/Link";

interface Props {
  course: CourseCardInfo;
  link?: string;
}

const CourseCard = ({ course, link }: Props) => {
  const totalLessons = course.chapters.reduce(
    (acc, curr) => acc + curr._count.lessons,
    0
  );
  const totalDuration = course.chapters.reduce(
    (acc, curr) => acc + curr.lessons.reduce((a, b) => a + b.duration, 0),
    0
  );

  return (
    <Stack
      gap={2}
      className="border-hover"
      component={NextLinkComposed}
      to={link || `/courses/${course.uid}`}
      sx={{
        maxWidth: "420px",
        borderRadius: "var(--radius-md)",
        border: " 1px solid var(--border)",
        backgroundColor: "var(--surface-secondary)",
        padding: 1,
        paddingBottom: 3,
      }}>
      <div className="img-hover" style={{ borderRadius: "var(--radius-md)" }}>
        <Image
          src={course.thumbnail}
          alt="Course thumbnail"
          width={480}
          height={375}
          style={{
            borderRadius: "var(--radius-md)",
            objectFit: "cover",
            width: "100%",
            aspectRatio: "32 / 25",
            height: "auto",
          }}
        />
      </div>

      <Stack sx={{ paddingInline: 1 }} gap={2} alignItems="flex-start">
        <Chip label={course.category} />
        <Typography variant="titlelg">{course.title}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          sx={{ width: "100%" }}>
          <Avatar src={course.instructor.photo} alt="Profile" width={45} />
          <Stack sx={{ flexGrow: 1 }}>
            <Typography variant="labellg" color="var(--text-title)">
              {course.instructor.fullName}
            </Typography>
            <Typography variant="labelmd" color="var(--text-subtitle)">
              {totalLessons} video{totalLessons !== 1 && "s"} • (
              {COURSE_DURATION(totalDuration)})
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="titlelg" color="var(--text-primary)">
              ${course.price}
            </Typography>
            {course.ordinaryPrice && (
              <Typography
                variant="bodylg"
                color="var(--text-subtitle)"
                sx={{ textDecoration: "line-through" }}>
                ${course.ordinaryPrice}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CourseCard;
