import { api } from "@/axios";
import { BlogCommentCard, BlogContent } from "@/prisma/constants";
import { RootState } from "@/store";
import { fieldValidation } from "@/utils/fieldValidation";
import { useToast } from "@/utils/toast";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BlogCommentLike } from "@prisma/client";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Avatar from "../Common/Avatar";
import DataWrapper from "../Common/DataWrapper";
import LoadingButton from "../Common/LoadingButton";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Comment Required"),
});

interface CommentProps {
  reply?: boolean;
  authenticated: boolean;
  blog: string;
  comment: BlogCommentCard;
  onReply?: () => void;
}
const CommentCard = ({
  comment,
  reply = false,
  blog,
  authenticated,
  onReply,
}: CommentProps) => {
  const tablet = useMediaQuery("(min-width:768px)");
  const { showToast } = useToast();
  const router = useRouter();

  const [liked, setLiked] = useState(comment.likes.length > 0);

  const like = async () => {
    const initialLiked = liked;
    setLiked(!liked);
    const response: AxiosResponse<{
      like: BlogCommentLike;
      message: string;
    }> = initialLiked
      ? await api.delete(`/api/blogs/${blog}/comments/${comment.uid}`)
      : await api.post(`/api/blogs/${blog}/comments/${comment.uid}`);
    if (response.status === 200) {
      showToast("success", response.data.message);
      router.refresh();
    } else {
      setLiked(initialLiked);
    }
  };

  return (
    <Stack
      direction="row"
      gap={{ xs: 1, sm: 2 }}
      sx={{ marginLeft: reply ? { xs: 6, sm: 9 } : 0 }}>
      <Avatar src={comment.user.photo} alt="Profile" width={tablet ? 56 : 42} />
      <Stack gap="0.25rem" sx={{ flex: 1, alignSelf: "center" }}>
        <Typography variant="titlemd">
          {comment.user.fullName}{" "}
          <span style={{ fontWeight: "normal" }}>{comment.content}</span>
        </Typography>
        <Stack direction="row" gap={3}>
          <Typography variant="bodymd" color="var(--text-subtitle)">
            {comment._count.likes} like{comment._count.likes === 1 ? "" : "s"}
          </Typography>
          <Typography variant="bodymd" color="var(--text-subtitle)">
            {comment._count.replies} repl
            {comment._count.replies === 1 ? "y" : "ies"}
          </Typography>
          {authenticated && (
            <>
              <Button
                onClick={like}
                sx={{
                  padding: "0 !important",
                  minWidth: "unset",
                  color: liked ? "var(--text-primary)" : "var(--text-subtitle)",
                }}>
                {liked ? "Liked" : "Like"}
              </Button>

              {!reply && (
                <Button
                  onClick={onReply}
                  sx={{
                    padding: "0 !important",
                    minWidth: "unset",
                    color: "var(--text-subtitle)",
                  }}>
                  Reply
                </Button>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

interface Props {
  blog: BlogContent;
}

const BlogComments = ({ blog }: Props) => {
  const { showToast } = useToast();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const authenticated = Boolean(user.uid);

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      content: "",
      replyToId: undefined,
    },
    validationSchema,
    async onSubmit(values, formikHelpers) {
      const response: AxiosResponse<{
        user: BlogCommentLike;
        message: string;
      }> = await api.post(`/api/blogs/${blog.uid}/comments`, values);
      if (response.status === 200) {
        showToast("success", response.data.message);
        router.refresh();
        formikHelpers.resetForm();
      }
    },
  });

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 6 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "var(--surface-secondary)",
        borderRadius: "var(--radius-lg)",
        maxWidth: "1024px",
        width: "100%",
      }}>
      {authenticated && (
        <Stack
          component="form"
          onSubmit={handleSubmit}
          direction={{ sm: "row" }}
          gap={{ xs: 1, sm: 3 }}
          alignItems="center">
          <Stack
            direction="row"
            gap={{ xs: 1, sm: 3 }}
            sx={{
              flex: 1,
              width: { xs: "100%", sm: "auto" },
            }}
            alignItems="center">
            <Avatar src={user.photo} alt="Profile" width={56} />
            <TextField
              variant="outlined"
              placeholder="What are your thoughts?"
              sx={{
                flex: 1,
              }}
              InputProps={{
                startAdornment: values.replyToId && (
                  <div
                    style={{
                      marginLeft: "0.75rem",
                      fontWeight: "600",
                      color: "var(--text-primary)",
                      whiteSpace: "nowrap",
                    }}>
                    @
                    {
                      blog.comments
                        .find((e) => e.uid === values.replyToId)
                        ?.user.fullName.split(" ")[0]
                    }
                  </div>
                ),
              }}
              name="content"
              value={values.content}
              onChange={handleChange}
              {...fieldValidation(touched, errors, "content")}
            />
          </Stack>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            size="large"
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}>
            Post Comment
          </LoadingButton>
        </Stack>
      )}
      <Typography variant="headlinemd" color="var(--text-title)">
        {blog._count.comments} Comment{blog._count.comments === 1 ? "" : "s"}
      </Typography>
      <DataWrapper
        data={blog.comments.length > 0}
        title="No Comments"
        description="Be the first to comment.">
        {blog.comments
          .filter((e) => !e.replyToId)
          .map((comment) => (
            <Stack key={comment.uid} gap={2}>
              <CommentCard
                blog={blog.uid}
                comment={comment}
                authenticated={authenticated}
                onReply={() => {
                  setFieldValue("replyToId", comment.uid);
                }}
              />
              {blog.comments
                .filter((e) => e.replyToId === comment.uid)
                .map((reply) => (
                  <CommentCard
                    blog={blog.uid}
                    comment={reply}
                    key={reply.uid}
                    reply
                    authenticated={authenticated}
                  />
                ))}
            </Stack>
          ))}
      </DataWrapper>
    </Box>
  );
};

export default BlogComments;
