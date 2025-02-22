import { Box, Typography } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

interface VideoPlayerProps {
  url: string | undefined;
  width?: string | number;
  height?: string | number;
}

const VideoPlayer = ({ url, width, height }: VideoPlayerProps) => {
  return (
    <>
      {url ? (
        <ReactPlayer
          url={url}
          controls
          onError={(e) => toast.error("Error", e)}
          width={width || "100%"}
          height={height || "auto"}
        />
      ) : (
        <Box
          sx={{
            height: height || "auto",
            width: width || "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 1,
          }}
        >
          <Typography variant="h5">No assigned video available</Typography>
        </Box>
      )}
    </>
  );
};

export default VideoPlayer;
