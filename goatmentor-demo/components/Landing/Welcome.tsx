"use client";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import VimeoPlayer from "@vimeo/player";
import { useEffect, useRef, useState } from "react";
import PlayButton from "../Common/PlayButton";

const WelcomeVideo = () => {
  let welcomeVideo = useRef<VimeoPlayer | null>(null);
  const [playing, setPlaying] = useState(false);

  // @ts-ignore
  const matches = useMediaQuery((theme) => theme?.breakpoints?.up("md"));

  useEffect(() => {
    welcomeVideo.current = new VimeoPlayer(`welcome-iframe`, {
      url: "xxxx",
      width: 1920,
      height: 1080,
    });
  }, []);

  return (
    <Box className="wrapper" id="welcome-video">
      <Box
        component="section"
        id={`welcome-iframe`}
        sx={{
          position: "relative",
          margin: { xs: "1rem", md: "3rem 1rem" },
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
        <Stack
          alignItems="flex-start"
          justifyContent={{ xs: "space-between", md: "flex-start" }}
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
            color: "white",
            background:
              "linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.70) 23.23%, rgba(0, 0, 0, 0.00) 51.87%, rgba(0, 0, 0, 0.00) 100%)",
          }}>
          <Typography variant="displaysm">Welcome</Typography>
          <Typography
            variant="displaymd"
            sx={{
              maxWidth: "552px",
              marginTop: 1,
              marginBottom: 4,
              flexGrow: 1,
              display: { xs: "none", md: "inline-flex" },
            }}>
            Get an Introduction from our Founders
          </Typography>
          <PlayButton
            scale={matches ? 2 : 1}
            onClick={() => {
              welcomeVideo.current?.play();
              setPlaying(true);
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default WelcomeVideo;
