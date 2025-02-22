"use client";

import Logo from "@/components/Logo";
import { useTestContext } from "@/context/taskContext";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import LoadingButton from "../Common/LoadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/pro-solid-svg-icons";
import { useParams } from "next/navigation";

const Header = () => {
  const {
    timerValue,
    isSubmit,
    isActive,
    startTimer,
    submitTask,
    updateTask
  } = useTestContext();
  const params = useParams()

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleStartTime = async () => {
    await updateTask(params?.task as string, "started")
    startTimer()
  }

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "var(--surface-secondary)",
        padding: { xs: "0 1rem", lg: "0 2rem" },
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}>
      <Stack
        component="header"
        className="wrapper-wide"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
        sx={{
          height: "80px",
        }}>
        <Stack
          direction={{ xs: "row-reverse", lg: "row" }}
          alignItems="center"
          justifyContent={{ xs: "flex-start", lg: "space-between" }}
          sx={{
            width: { xs: "fit-content", lg: "18rem" },
          }}>
          <Logo link="#" />
        </Stack>

        {(timerValue > 0 || isSubmit) &&
          <>
            <Stack>
              <Typography
                variant="displaymd"
                color={timerValue <= 10 ? "red" : 'inherit'}
              >
                {formatTime(timerValue)}
              </Typography>
            </Stack>
            {(isActive || isSubmit) ? (
              <LoadingButton
                loading={isSubmit}
                sx={({ breakpoints }) => ({
                  minWidth: '200px',
                  [breakpoints.down('sm')]: {
                    display: 'none'
                  }
                })}
                variant="contained"
                color="primary"
                onClick={submitTask}
              >
                Complete & Submit
              </LoadingButton>
            ) : (
              <IconButton
                color="primary"
                onClick={handleStartTime}
                sx={{
                  alignSelf: "center",
                  padding: `0.8rem`,
                  aspectRatio: 1,
                }}>
                <FontAwesomeIcon
                  icon={faPlay}
                  size="sm"
                />
              </IconButton>
            )}
          </>
        }
      </Stack>
    </Box >
  );
};

export default Header;
