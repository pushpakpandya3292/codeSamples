"use client";

import { Project } from "@/types/project";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { faArrowUpRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const icon = {
  color: "#fff",
  border: "1px solid #fff",
  "&:hover": {
    border: "1px solid var(--border-primary)",
    color: "var(--border-primary)",
  },
};

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const tablet = useMediaQuery("(min-width:768px)");

  const [index, setIndex] = useState(0);

  const image =
    typeof project.image === "string" ? project.image : project.image[index];

  const next = () => {
    if (index < project.image.length - 1) {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <Stack
      className="border-hover"
      component="a"
      href={project.url}
      target="_blank"
      sx={{
        maxWidth: "540px",
        width: "100%",
        cursor: "pointer",
      }}>
      <div
        className="img-hover"
        style={{ borderRadius: "var(--radius-md)", position: "relative" }}>
        <Image
          src={image}
          alt={project.name}
          width={640}
          height={640}
          style={{
            borderRadius: "var(--radius-md)",
            objectFit: "cover",
            width: "100%",
            aspectRatio: 1,
            height: "auto",
          }}
        />
        {typeof project.image !== "string" && (
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
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
          </IconButton>
        )}
        {typeof project.image !== "string" && (
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
            <FontAwesomeIcon icon={faArrowRight} size="sm" />
          </IconButton>
        )}
      </div>

      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        sx={{ marginBlock: 3, width: "100%" }}>
        <Image
          src={project.logo}
          alt="logo"
          width={tablet ? 64 : 48}
          height={tablet ? 64 : 48}
          style={{
            objectFit: "contain",
          }}
        />
        <Typography
          variant="headlinemd"
          color="var(--text-title)"
          className="text-ellipsis"
          sx={{ flex: 1 }}>
          {project.name}
        </Typography>
        <IconButton
          color="primary"
          aria-label="Arrow Icon"
          sx={{ cursor: "default" }}>
          <FontAwesomeIcon icon={faArrowUpRight} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ProjectCard;
