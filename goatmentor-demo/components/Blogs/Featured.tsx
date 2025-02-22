"use client";

import { NextLinkComposed } from "@/components/Mui/Link";
import { BlogCardInfo } from "@/prisma/constants";
import { faArrowUpRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

interface Props {
  blog: BlogCardInfo;
}

const FeaturedBlog = ({ blog }: Props) => {
  const tablet = useMediaQuery("(min-width:768px)");
  return (
    <Box
      component={NextLinkComposed}
      to={`/blogs/${blog.uid}`}
      sx={{
        height: "100vh",
        maxHeight: "min(100vw, 45rem)",
        width: "100%",
        backgroundColor: "var(--surface-secondary)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        position: "relative",
        color: "#fff",
      }}>
      <Image
        src={blog.featuredImage}
        alt="Blog cover"
        fill
        priority
        style={{
          objectFit: "cover",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 56.56%, rgba(0, 0, 0, 0.50) 100%)",
        }}></Box>
      <Stack
        justifyContent="flex-end"
        sx={{
          position: "absolute",
          inset: 0,
          padding: { xs: 3, md: 6 },
          gap: 2,
        }}>
        <Chip
          label={blog.category}
          variant="filled"
          sx={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            alignSelf: "flex-start",
          }}
        />
        <Typography variant="displaymd" className="text-ellipsis">
          {blog.title}
        </Typography>
        <Typography
          variant="headlinesm"
          className="line-clamp"
          sx={{
            "-webkit-line-clamp": "3",
          }}>
          {blog.introduction}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}>
          <Stack gap={2}>
            <Typography variant="titlesm" className="text-ellipsis">
              {blog.author.fullName} .{" "}
              {(blog.publishedAt ?? blog.updatedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </Typography>
            <Stack direction="row" gap="0.625rem" flexWrap="wrap">
              {blog.tags.slice(0, tablet ? 3 : 1).map((tag, index) => (
                <Chip
                  key={`tag:${index}`}
                  label={tag}
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                  }}
                />
              ))}
            </Stack>
          </Stack>
          <IconButton
            color="primary"
            aria-label="Arrow Icon"
            sx={{ cursor: "default" }}>
            <FontAwesomeIcon icon={faArrowUpRight} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FeaturedBlog;
