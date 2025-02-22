import { PROJECTS } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";
import ProjectCard from "../Projects/Project";

const LandingProjects = () => {
  return (
    <Box
      bgcolor="var(--surface-secondary)"
      sx={{
        width: "100%",
        margin: "3rem 0 0",
        padding: "0 1rem 3rem",
      }}>
      <Stack
        className="wrapper"
        component="section"
        id="projects"
        gap={1}
        alignItems="center">
        <div className="primary-divider"></div>
        <Typography
          variant="displaysm"
          textAlign="center"
          color="var(--text-primary)">
          IMPACT
        </Typography>
        <Typography
          variant="displaymd"
          textAlign="center"
          color="var(--text-title)">
          Our Projects
        </Typography>
        <Typography
          variant="headlinemd"
          textAlign="center"
          sx={{ maxWidth: "740px" }}>
          Explore the work that our team has been working on including our
          products and open source projects
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(80vw ,400px), 1fr))",
            justifyItems: "center",
            marginTop: 5,
            width: "100%",
            gap: 3,
          }}>
          {PROJECTS.slice(0, 2).map((project, i) => (
            <ProjectCard key={`project:${i}`} project={project} />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default LandingProjects;
