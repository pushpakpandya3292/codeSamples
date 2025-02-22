import { COURSE_CARD } from "@/prisma/constants";
import prisma from "@/prisma/db";
import { Box, Button, Stack, Typography } from "@mui/material";
import DataWrapper from "../Common/DataWrapper";
import CourseCard from "../Courses/Course";
import { NextLinkComposed } from "../Mui/Link";

export const dynamic = "force-dynamic";

const LandingCourses = async () => {
  const courses = await prisma.course.findMany({
    select: COURSE_CARD,
    take: 3,
    where: { published: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Box
      component="section"
      className="wrapper"
      id="courses"
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        padding: "0.5rem 1rem 3rem",
        gap: 6,
      }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        gap={2}
        justifyContent="space-between">
        <Stack
          alignItems={{ xs: "center", md: "flex-start" }}
          sx={{
            flex: 1,
            maxWidth: "850px",
            gap: 1,
            textAlign: { xs: "center", md: "left" },
          }}>
          <div className="primary-divider"></div>
          <Typography variant="displaysm" color="var(--text-primary)">
            KNOWLEDGE
          </Typography>
          <Typography variant="displaymd" color="var(--text-title)">
            Our Courses
          </Typography>
          <Typography variant="headlinemd">
            Get to learning with our top courses and tutorials on technology,
            development, and project management.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          size="large"
          component={NextLinkComposed}
          to="/courses"
          sx={{ width: "260px" }}>
          View More
        </Button>
      </Stack>
      <DataWrapper
        data={courses.length > 0}
        title="No courses yet."
        direction="column">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(80vw ,300px), max-content))",
            justifyItems: "flex-start",
            width: "100%",
            gap: 3,
          }}>
          {courses.map((course) => (
            <CourseCard key={course.uid} course={course} />
          ))}
        </Box>
      </DataWrapper>
    </Box>
  );
};

export default LandingCourses;
