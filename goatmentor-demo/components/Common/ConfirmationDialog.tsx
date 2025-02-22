import { faCircleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  confirm: () => void;
  title: string;
  description: string;
}

const ConfirmationDialog = ({
  open,
  handleClose,
  confirm,
  title,
  description,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
          maxWidth: "30rem",
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
        <FontAwesomeIcon
          icon={faCircleExclamation}
          size="3x"
          color="var(--error)"
        />
        <Typography
          id="settings-title"
          variant="headlinesm"
          color="var(--text-title)">
          {title}
        </Typography>
        <Typography variant="bodymd">{description}</Typography>
        <Stack direction="row" gap={2} sx={{ marginTop: 2, width: "100%" }}>
          <Button variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => {
              confirm();
              handleClose();
            }}
            sx={{ flex: 1 }}>
            Confirm
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationDialog;
