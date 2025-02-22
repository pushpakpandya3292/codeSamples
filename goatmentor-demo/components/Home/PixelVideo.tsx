import { api } from "@/axios";
import { MODAL_BOX } from "@/components/Mui/overrides/Modal";
import { setUser } from "@/store/user";
import { faClose, faVideo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { User } from "@prisma/client";
import VimeoPlayer from "@vimeo/player";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PlayButton from "../Common/PlayButton";

interface Props {
  open: boolean;
  onClose: (e: any, reason: any) => void;
}

const PixelVideo = ({ open, onClose }: Props) => {
  let video = useRef<VimeoPlayer | null>(null);
  const [playing, setPlaying] = useState(false);

  // @ts-ignore
  const matches = useMediaQuery((theme) => theme?.breakpoints?.up("md"));
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      video.current = new VimeoPlayer(`video-iframe`, {
        url: "https://vimeo.com/xxxxx",
        width: 1920,
        height: 1080,
      });
      const response: AxiosResponse<{ user: User }> | void = await api
        .post("/api/pixel-video")
        .catch((err) => console.log(err));
      if (response) dispatch(setUser(response.data.user));
    }, 300);
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      aria-labelledby="settings-title">
      <Box sx={{ ...MODAL_BOX, maxWidth: "60rem" }}>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ color: "var(--text-title)", position: "relative" }}>
          <FontAwesomeIcon icon={faVideo} size="2x" />
          <Typography id="settings-title" variant="headlinelg">
            Google Pixel 7 Pro
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
        <Box
          component="section"
          id={`video-iframe`}
          sx={{
            position: "relative",
            margin: "1rem",
            aspectRatio: "16 / 9",
            borderRadius: "var(--radius-xl)",
            border: "solid var(--border-primary)",
            borderWidth: { xs: "2px", md: "5px" },
            overflow: "hidden",
            "& iframe": {
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: "16 / 9",
            },
          }}>
          <Box
            sx={{
              display: playing ? "none" : "flex",
              position: "absolute",
              inset: 0,
              padding: {
                xs: "1.75rem",
                sm: "2.5rem",
                md: "4rem",
                lg: "6rem",
                xl: "8rem",
              },
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              background: "rgba(0, 0, 0, 0.10)",
            }}>
            <PlayButton
              scale={matches ? 2 : 1}
              onClick={() => {
                video.current?.play();
                setPlaying(true);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PixelVideo;
