import { RootState } from "@/store";
import logout from "@/utils/logout";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightFromBracket,
  faGear,
  faPhone,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Menu, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../Common/Avatar";
import LoadingIndicator from "../Common/LoadingIndicator";

const AccountSettings = dynamic(() => import("./Settings/Settings"));
const ContactUs = dynamic(() => import("../Home/ContactUs"));

const MenuItem = ({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: IconDefinition;
  onClick: () => void;
}) => {
  return (
    <Stack
      direction="row"
      gap="0.75rem"
      alignItems="center"
      onClick={onClick}
      sx={{
        padding: "1rem 1.5rem 1rem 1rem",
        borderRadius: "var(--radius-lg)",
        transition: "background 300ms ease-in-out",
        textDecoration: "none",
        "&:hover": {
          background: "var(--primary-container)",
          cursor: "pointer",
        },
      }}>
      <FontAwesomeIcon icon={icon} />
      <Typography
        variant="labelmd"
        sx={{
          flexGrow: 1,
        }}>
        {title}
      </Typography>
    </Stack>
  );
};

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

const UserMenu = ({ open, onClose, anchorEl }: Props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const openSettings = () => setSettingsOpen(true);
  const closeSettings = (e: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    setSettingsOpen(false);
  };

  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);
  const closeContact = (e: any, reason: any) => {
    if (reason && reason == "backdropClick") return;
    setContactOpen(false);
  };

  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiPaper-root": {
            padding: "1rem",
            marginTop: "0.5rem",
          },
          "& .MuiList-root": {
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxWidth: "17rem",
          },
        }}>
        <Stack direction="row" gap={2} alignItems="center" tabIndex={-1}>
          <Avatar src={user.photo} width={56} alt="Profile Photo" />
          <Stack sx={{ overflow: "hidden" }}>
            <Typography variant="titlelg" className="text-ellipsis">
              {user.fullName}
            </Typography>
            <Typography variant="labelmd" className="text-ellipsis">
              {user.email}
            </Typography>
          </Stack>
        </Stack>
        <MenuItem
          title="Account Settings"
          onClick={() => {
            onClose();
            openSettings();
          }}
          icon={faGear}
        />
        <MenuItem
          title="Contact us"
          onClick={() => {
            onClose();
            openContact();
          }}
          icon={faPhone}
        />
        <Divider />
        <MenuItem
          title="Logout"
          onClick={logout}
          icon={faArrowRightFromBracket}
        />
      </Menu>
      {settingsOpen && (
        <Suspense fallback={<LoadingIndicator />}>
          <AccountSettings open={settingsOpen} onClose={closeSettings} />
        </Suspense>
      )}
      {contactOpen && (
        <Suspense fallback={<LoadingIndicator />}>
          <ContactUs open={contactOpen} onClose={closeContact} />
        </Suspense>
      )}
    </>
  );
};

export default UserMenu;
