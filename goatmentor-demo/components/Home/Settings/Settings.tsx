import { MODAL_BOX } from "@/components/Mui/overrides/Modal";
import { faClose, faGear } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  IconButton,
  Modal,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AccountInformation from "./Account";
import SecuritySettings from "./Security";

interface Props {
  open: boolean;
  onClose: (e: any, reason: any) => void;
}

const AccountSettings = ({ open, onClose }: Props) => {
  const [tab, setTab] = useState(1);

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
          sx={{ color: "var(--text-title)", position: "relative" }}>
          <FontAwesomeIcon icon={faGear} size="2x" />
          <Typography id="settings-title" variant="headlinelg">
            Settings
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
        <Tabs
          value={tab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={(e, value) => setTab(value)}>
          <Tab value={1} label="Account Details" />
          {/* <Tab value={2} label="Email Notifications" /> */}
          <Tab value={2} label="Security" />
        </Tabs>
        {tab === 1 ? (
          <AccountInformation />
        ) : (
          // ) : tab === 2 ? (
          //   <EmailNotifications />
          <SecuritySettings />
        )}
      </Box>
    </Modal>
  );
};

export default AccountSettings;
