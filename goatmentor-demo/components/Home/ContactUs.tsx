import { MODAL_BOX } from "@/components/Mui/overrides/Modal";
import { faClose, faEnvelopeBadge } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import ContactUsForm from "../Landing/ContactUs";

interface Props {
  open: boolean;
  onClose: (e: any, reason: any) => void;
}

const ContactUs = ({ open, onClose }: Props) => {
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
          sx={{
            color: "var(--text-title)",
            position: "relative",
            marginBottom: "1rem",
          }}>
          <FontAwesomeIcon icon={faEnvelopeBadge} size="2x" />
          <Typography id="settings-title" variant="headlinelg">
            Contact us
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
        <ContactUsForm />
      </Box>
    </Modal>
  );
};

export default ContactUs;
