import { MODAL_BOX } from "@/components/Mui/overrides/Modal";
import { LessonForm } from "@/prisma/constants";
import { useToast } from "@/utils/toast";
import { vimeo } from "@/vimeo";
import { faVimeo } from "@fortawesome/free-brands-svg-icons";
import {
  faClose,
  faCloudArrowUp,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import LoadingButton from "../Common/LoadingButton";

import VimeoPlayer from "@vimeo/player";

interface Props {
  open: boolean;
  onClose: (e: any, reason: any) => void;
  folder: string;
  updating?: LessonForm;
  onSubmit: (values: {
    uid?: string | undefined;
    title: string;
    source: string;
    vimeoUri: string;
    duration: number;
  }) => void;
}

const VimeoUploader = ({
  open,
  onClose,
  folder,
  onSubmit,
  updating,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [title, setTitle] = useState(updating?.title ?? "");

  const videoRef = useRef<HTMLVideoElement>(null);

  const [percentage, setPercentage] = useState<number>();

  const { showToast } = useToast();

  const uploadVideo = async () => {
    if (updating && !file) {
      setSubmitting(true);
      vimeo.request(
        { path: updating.vimeoUri, method: "PATCH", query: { name: title } },
        function (error, data, statusCode, headers) {
          setSubmitting(false);
          onSubmit({
            title,
            source: updating.source,
            vimeoUri: updating.vimeoUri,
            duration: updating.duration,
          });
          onClose(null, "close-button");
          return;
        }
      );
    }
    if (!file || !videoRef?.current) return;
    const duration = videoRef.current.duration;
    setSubmitting(true);
    vimeo.upload(
      file,
      {
        name: title,
        embed: {
          end_screen: {
            type: "thumbnail",
          },
        },
        embed_domains: [
          "localhost",
          "localhost:3000",
        ],
        privacy: {
          view: "unlisted",
          embed: "whitelist",
        },
      },
      function (uri) {
        if (updating)
          vimeo.request(
            { path: updating.vimeoUri, method: "DELETE" },
            function (error, body, statusCode, headers) {
              if (error) {
                console.log("Server error: " + error);
                return;
              }
            }
          );
        vimeo.request(
          { path: `${folder}${uri}`, method: "PUT" },
          function (error, body, statusCode, headers) {
            if (error) {
              console.log("Server error: " + error);
              return;
            }
          }
        );
        vimeo.request(
          uri + "?fields=link",
          function (error, body, statusCode, headers) {
            setSubmitting(false);
            if (error) {
              console.log("Server error: " + error);
              showToast("error", `Error uploading video: ${error.message}`);
              return;
            }
            onSubmit({
              title,
              source: body.link,
              vimeoUri: uri,
              duration,
            });
            onClose(null, "close-button");
          }
        );
      },
      function (bytes_uploaded, bytes_total) {
        var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
        setPercentage(parseFloat(percentage));
      },
      function (error) {
        console.log("Failed because: " + error);
      }
    );
  };

  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    if (updating) {
      setTimeout(() => {
        new VimeoPlayer(`course-preview`, {
          url: updating.source,
        })
          .ready()
          .catch((e) => {
            console.log(e);
            setProcessing(true);
          });
      }, 100);
    }
  }, [updating]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      aria-labelledby="settings-title">
      <Box sx={MODAL_BOX}>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ color: "var(--text-title)", position: "relative" }}>
          <FontAwesomeIcon icon={faVimeo} size="2x" />
          <Typography id="settings-title" variant="headlinelg">
            Upload Lesson
          </Typography>
          <IconButton
            onClick={(e) => onClose(e, "close-button")}
            sx={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-title)",
            }}>
            <FontAwesomeIcon icon={faClose} />
          </IconButton>
        </Stack>
        <TextField
          label="Lesson Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 56 }}
        />
        {!!file ? (
          <Box
            sx={{
              position: "relative",
            }}>
            <video
              width="320"
              height="240"
              ref={videoRef}
              controls
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                aspectRatio: "16/9",
                borderRadius: "var(--radius-md)",
              }}>
              <source src={URL.createObjectURL(file)} type="video/mp4" />
            </video>
            <IconButton
              size="medium"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setTitle("");
              }}
              sx={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                color: "var(--error)",
              }}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Box>
        ) : !!updating && !deleted ? (
          <Box
            id={`course-preview`}
            sx={{
              position: "relative",
              width: "100%",
              "& iframe": {
                height: "auto",
                width: "100%",
                aspectRatio: "16 / 9",
                display: "block",
                marginInline: "auto",
                borderRadius: "var(--radius-md)",
                transition: "all 0.5s ease-in-out",
              },
            }}>
            {processing && (
              <Typography textAlign="center" variant="labellg">
                The video is currently processing, please try again later.
              </Typography>
            )}
            {!processing && (
              <IconButton
                size="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleted(true);
                  setFile(null);
                }}
                sx={{
                  position: "absolute",
                  right: "1rem",
                  top: "1rem",
                  color: "var(--error)",
                }}>
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length) {
                const file = acceptedFiles[0];
                setFile(file);
                if (!title) setTitle(file.name.split(".")[0]);
              }
            }}
            accept={{
              "video/mp4": [],
              "video/mov": [],
              "video/wmv": [],
              "video/avi": [],
              "video/flv": [],
            }}>
            {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
              <Box
                sx={{
                  width: "100%",
                  border: "1px dashed var(--border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--surface-secondary)",
                  padding: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  transition: "all 500ms ease-in-out",
                  ":hover": {
                    borderColor: "var(--border-primary)",
                  },
                  ...(isDragAccept && {
                    backgroundColor: "var(--primary-container)",
                    borderColor: "var(--primary)",
                    transform: "scale(1.0125)",
                  }),
                  ...(isDragReject && {
                    backgroundColor: "var(--error-light)",
                    borderColor: "var(--error)",
                  }),
                }}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  size="3x"
                  style={{ transition: "all 500ms ease-in-out" }}
                  color={
                    isDragReject
                      ? "var(--error)"
                      : !!file
                      ? "var(--success)"
                      : "var(--text-primary)"
                  }
                />
                <Typography variant="titlemd">Upload Video</Typography>
                <Typography variant="labelmd">
                  Drag & drop files or{" "}
                  <span className="text-primary">Browse</span>
                </Typography>
                <Typography variant="labelsm" color="var(--text-subtitle)">
                  Supported formats: MP4, MOV, WMV, AVI, and FLV
                </Typography>
              </Box>
            )}
          </Dropzone>
        )}
        <LoadingButton
          loading={submitting}
          disabled={
            !updating
              ? !file || !title
              : deleted
              ? !file
              : title === updating.title
          }
          variant="contained"
          type="button"
          size="large"
          onClick={uploadVideo}
          endIcon={
            percentage ? (
              <Typography
                style={{ fontSize: "1.25rem" }}>{`${percentage}%`}</Typography>
            ) : undefined
          }>
          {!!updating ? "Update" : "Upload"}
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default VimeoUploader;
