"use client";

import Avatar from "@/components/Common/Avatar";
import { BlogContent } from "@/prisma/constants";
import { JSON_TO_HTML, READ_TIME } from "@/utils/constants";
import { useToast } from "@/utils/toast";
import { faCopy, faTimer } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import BlogComments from "./Comments";
import BlogHero from "./Hero";

interface Props {
  blog: BlogContent;
}

const BlogContentPage = ({ blog }: Props) => {
  const tablet = useMediaQuery("(min-width:768px)");
  const { showToast } = useToast();
  const content = JSON_TO_HTML(JSON.stringify(blog.content));

  return (
    <>
      <Stack gap={{ xs: 6, md: 8 }} alignItems="center">
        <BlogHero blog={blog} />
        <Stack
          gap={3}
          sx={{
            paddingInline: { xs: 1, md: 4 },
            maxWidth: "1024px",
            width: "100%",
          }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            rowGap={4}>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar
                src={blog.author.photo}
                alt="Profile"
                width={tablet ? 64 : 48}
              />
              <Stack gap="4px">
                <Typography variant="titlelg">
                  {blog.author.fullName}
                </Typography>
                <Typography variant="labellg" color="var(--text-subtitle)">
                  {(blog.publishedAt ?? blog.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap={1} alignItems="center">
              <FontAwesomeIcon
                icon={faTimer}
                size="lg"
                color="var(--text-title)"
              />
              <Typography variant="labellg" color="var(--text-subtitle)">
                {READ_TIME(content)} min
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              maxWidth: "800px",
              m: "auto",
              width: "100%",
              "& img": {
                width: "100%",
                height: "100%",
                borderRadius: "5px",
              },
              "& pre": {
                color: " #41314e",
                lineHeight: "1.6em",
                fontSize: "12px",
                background: "#f8f7fa",
                border: "1px solid #f1f1f4",
                boxShadow: "none",
                whiteSpace: "pre",
                wordWrap: "normal",
                overflowX: "auto",
                p: 1,
              },
              "& a": {
                color: 'var(--text-primary)',
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Box>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap">
            <Stack direction="row" gap="0.625rem" flexWrap="wrap">
              {blog.tags.map((tag, index) => (
                <Chip key={`tag:${index}`} label={tag} variant="outlined" />
              ))}
            </Stack>
            <Button
              variant="outlined"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  showToast("success", "Link copied to clipboard");
                } else {
                  showToast("error", "Failed to copy link");
                }
              }}
              startIcon={
                <FontAwesomeIcon icon={faCopy} color="var(--text-subtitle)" />
              }>
              Copy Link
            </Button>
          </Stack>
        </Stack>
        <BlogComments blog={blog} />
      </Stack>
    </>
  );
};

export default BlogContentPage;
