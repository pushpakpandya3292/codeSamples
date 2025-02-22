import { Box, Stack, Typography } from "@mui/material";
import { Blog } from "@prisma/client";
import Image from "next/image";

interface Props {
  blog: Blog;
}
const BlogHero = ({ blog }: Props) => {
  return (
    <>
      <Stack
        alignItems="center"
        sx={{ gap: 3, textAlign: "center", maxWidth: "1024px" }}>
        <Stack gap={1} alignItems="center">
          <div className="primary-divider"></div>
          <Typography
            variant="displaysm"
            color="var(--text-primary)"
            textTransform="uppercase">
            {blog.category}
          </Typography>
        </Stack>
        <Typography variant="displaylg" color="var(--text-title)">
          {blog.title}
        </Typography>
        <Typography variant="headlinesm">{blog.introduction}</Typography>
      </Stack>
      <Box
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
      </Box>
    </>
  );
};

export default BlogHero;
