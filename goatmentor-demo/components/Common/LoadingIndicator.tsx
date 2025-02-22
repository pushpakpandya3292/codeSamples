import { Backdrop, CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Backdrop
      sx={{
        background: "rgba(255,255,255,.5)",
        color: "var(--primary)",
        zIndex: 9999,
      }}
      open>
      <CircularProgress color="inherit" disableShrink />
    </Backdrop>
  );
};

export default LoadingIndicator;
