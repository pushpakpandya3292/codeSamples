import { api } from "@/axios";
import { MODAL_BOX } from "@/components/Mui/overrides/Modal";
import { setUser } from "@/store/user";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faClose, faVideo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
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
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import Avatar from "../Common/Avatar";

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
    api
      .post("/api/pixel-video")
      .then((response: AxiosResponse<{ user: User }> | void) => {
        if (response) dispatch(setUser(response.data.user));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      aria-labelledby="settings-title">
      <Box
        sx={{
          ...MODAL_BOX,
          maxWidth: "40rem",
          position: "relative",
          overflow: "hidden",
        }}>
        <Confetti width={640} height={800} />
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ color: "var(--text-title)", position: "relative" }}>
          <FontAwesomeIcon icon={faVideo} size="2x" />
          <Typography id="settings-title" variant="headlinelg">
            Pixel 7 Pro Winner
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
        <Stack gap={4} alignItems="center" sx={{ textAlign: "center", my: 4 }}>
          <Avatar
            width={150}
            alt="Profile Picture"
            src="xxxx"
          />
          <Typography
            variant="titlemd"
            color="var(--text-primary)"
            sx={{ mb: -2 }}>
            CONGRATULATIONS!
          </Typography>
          <Typography variant="headlinelg">Jackline Nzula</Typography>
          <Typography>
            We are thrilled to announce the winner of our Google Pixel 7 Pro
            giveaway! After carefully writing down all the participants&apos;
            names and conducting a random draw, we have finally selected a
            winner: Jackline Nzula.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<FontAwesomeIcon icon={faLinkedinIn} />}
            sx={{ width: "100%", maxWidth: "20rem" }}>
            View LinkedIn Profile
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PixelVideo;
