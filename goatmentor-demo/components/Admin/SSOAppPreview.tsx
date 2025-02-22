import { useToast } from "@/utils/toast";
import { faBadgeCheck, faCopy } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { SsoApp } from "@prisma/client";
import { NextLinkComposed } from "../Mui/Link";
import { MODAL_BOX } from "../Mui/overrides/Modal";

interface Props {
  open: boolean;
  handleClose: () => void;
  app: SsoApp;
}

export const APP_KEY_STYLE = {
  cursor: "pointer",
  padding: "0.25rem 0.5rem",
  borderRadius: "var(--radius-md)",
  "&:hover": {
    backgroundColor: "var(--surface-secondary)",
  },
};

const AppPreview = ({ open, handleClose, app }: Props) => {
  const { showToast } = useToast();

  const copyKey = (label: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key);
      showToast("success", `${label} copied to clipboard`);
    } else {
      showToast("error", `Failed to copy ${label}`);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown
      aria-labelledby="settings-title">
      <Box sx={{ ...MODAL_BOX, alignItems: "center", textAlign: "center" }}>
        <FontAwesomeIcon icon={faBadgeCheck} size="3x" color="var(--success)" />
        <Typography
          id="settings-title"
          variant="headlinesm"
          color="var(--text-title)">
          SSO Application Created
        </Typography>
        <Stack
          gap={3}
          sx={{ marginBlock: 4, alignSelf: "stretch", whiteSpace: "nowrap" }}>
          <Stack
            direction="row"
            gap={2}
            justifyContent="space-between"
            flexWrap="wrap">
            <Typography variant="titlesm">Client ID:</Typography>
            <Typography
              variant="labelmd"
              color="var(--text-subtitle)"
              onClick={() => copyKey("Client ID", app.clientId)}
              sx={APP_KEY_STYLE}>
              {app.clientId}
              <FontAwesomeIcon
                icon={faCopy}
                color="var(--text-subtitle)"
                size="1x"
                style={{ marginLeft: "0.25rem" }}
              />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            justifyContent="space-between"
            flexWrap="wrap">
            <Typography variant="titlesm">Client Secret:</Typography>
            <Typography
              variant="labelmd"
              color="var(--text-subtitle)"
              onClick={() => copyKey("Client Secret", app.clientSecret)}
              sx={APP_KEY_STYLE}>
              {app.clientSecret}
              <FontAwesomeIcon
                icon={faCopy}
                color="var(--text-subtitle)"
                size="1x"
                style={{ marginLeft: "0.25rem" }}
              />
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          component={NextLinkComposed}
          to={`/admin/apps`}
          sx={{ marginTop: 1 }}>
          Go Back
        </Button>
      </Box>
    </Modal>
  );
};

export default AppPreview;
