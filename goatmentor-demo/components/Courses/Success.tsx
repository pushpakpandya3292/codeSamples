import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, Typography } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

const EnrollmentSuccessful = ({ open, onClose }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      aria-labelledby="settings-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          bottom: "auto",
          right: "auto",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "20rem",
          bgcolor: "var(--background)",
          boxShadow: "var(--modal)",
          padding: "2rem 1.5rem",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: "1rem",
          "&:focus": {
            border: "none",
            outline: "none",
          },
        }}>
        <FontAwesomeIcon icon={faBadgeCheck} size="3x" color="var(--success)" />
        <Typography
          id="settings-title"
          variant="headlinesm"
          color="var(--text-title)">
          Thanks for enrolling
        </Typography>
        <Typography variant="bodymd">
          Your payment was successful. You can now access the course. Happy
          Learning!
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{ marginTop: 1 }}>
          Continue
        </Button>
      </Box>
    </Modal>
  );
};

export default EnrollmentSuccessful;
