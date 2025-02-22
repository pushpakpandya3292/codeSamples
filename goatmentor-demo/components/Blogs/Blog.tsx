"use client";
import { BlogCardInfo } from "@/prisma/constants";
import { faArrowUpRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { NextLinkComposed } from "../Mui/Link";

interface Props {
  blog: BlogCardInfo;
  small?: boolean;
  link?: string;
}

const BlogCard = ({ blog, small = false, link }: Props) => {
  const tablet = useMediaQuery("(min-width:768px)");
  return (
    <Stack
      gap={2}
      className="border-hover"
      component={NextLinkComposed}
      to={link ?? `/blogs/${blog.uid}`}
      sx={{
        maxWidth: small ? "420px" : "600px",
        borderRadius: "var(--radius-md)",
        border: " 1px solid var(--border)",
        backgroundColor: "var(--surface-secondary)",
        padding: 1,
        paddingBottom: 3,
      }}>
      <div className="img-hover" style={{ borderRadius: "var(--radius-md)" }}>
        <Image
          src={blog.featuredImage}
          alt={"Featured image"}
          width={640}
          height={360}
          style={{
            borderRadius: "var(--radius-md)",
            objectFit: "cover",
            width: "100%",
            aspectRatio: "32 / 25",
            height: "auto",
          }}
        />
      </div>

      <Stack sx={{ paddingInline: 1, flexGrow: 1 }} gap={2}>
        <Chip label={blog.category} sx={{ alignSelf: "flex-start" }} />
        <Typography
          variant="titlelg"
          className="line-clamp"
          sx={{
            "-webkit-line-clamp": "3",
            flexGrow: 1,
          }}>
          {blog.title}
        </Typography>
        {!small && (
          <Typography
            variant="bodylg"
            className="line-clamp"
            sx={{
              "-webkit-line-clamp": "3",
            }}>
            {blog.introduction}
          </Typography>
        )}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}>
          <Stack gap={2}>
            <Typography
              variant="labelmd"
              color="var(--text-subtitle)"
              className="text-ellipsis">
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
              {blog.tags
                .slice(0, tablet ? (small ? 1 : 3) : 1)
                .map((tag, index) => (
                  <Chip
                    key={`tag:${index}`}
                    label={tag}
                    variant="outlined"
                    size="small"
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
    </Stack>
  );
};

export default BlogCard;
