import {
  IconDefinition,
  faBriefcase,
  faCalendar,
  faCamcorder,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack, Switch, Typography } from "@mui/material";

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
        padding: "0.25rem 1.5rem 0.25rem 1rem",
        borderRadius: "var(--radius-lg)",
        transition: "background 300ms ease-in-out",
        textDecoration: "none",
      }}>
      <FontAwesomeIcon icon={icon} />
      <Typography
        variant="labelmd"
        sx={{
          flexGrow: 1,
        }}>
        {title}
      </Typography>
      <Switch />
    </Stack>
  );
};

const EmailNotifications = () => {
  return (
    <>
      <MenuItem
        title="Monthly Newsletter"
        icon={faCalendar}
        onClick={() => {}}
      />
      <MenuItem title="Job Openings" icon={faBriefcase} onClick={() => {}} />
      <MenuItem
        title="Upcoming Courses"
        icon={faCamcorder}
        onClick={() => {}}
      />
      <Button variant="contained" size="large">
        Update
      </Button>
    </>
  );
};

export default EmailNotifications;
