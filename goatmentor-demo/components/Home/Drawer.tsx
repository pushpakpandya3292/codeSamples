"use client";
import { RootState } from "@/store";
import { MATCH_ROLE } from "@/utils/constants";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBlog,
  faBriefcase,
  faCamcorder,
  faCircleInfo,
  faClose,
  faFiles,
  faGrid2,
  faGrid2Plus,
  faPenToSquare,
  faUsers,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NextLinkComposed } from "../Mui/Link";

interface Props {
  open: boolean;
  closeDrawer: () => void;
}

const NavHeader = ({ title }: { title: string }) => {
  return (
    <Typography
      variant="labelmd"
      color="var(--text-subtitle)"
      sx={{
        padding: "1.125rem 1rem",
      }}>
      {title}
    </Typography>
  );
};

const NavItem = ({
  title,
  icon,
  path,
}: {
  title: string;
  icon: IconDefinition;
  path: string;
}) => {
  const pathname = usePathname();
  return (
    <Stack
      direction="row"
      gap="0.75rem"
      alignItems="center"
      component={NextLinkComposed}
      to={path}
      sx={{
        padding: "1rem 1.5rem 1rem 1rem",
        borderRadius: "var(--radius-lg)",
        transition: "background 300ms ease-in-out",
        background: pathname.startsWith(path)
          ? "var(--primary-container)"
          : "transparent",
        color: pathname.startsWith(path)
          ? "var(--primary)"
          : "var(--text-title)",
        textDecoration: "none",
        "&:hover, &:focus": {
          background: "rgba(255,255,255,.75)",
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

const NavigationDrawer = ({ open, closeDrawer }: Props) => {
  const pathname = usePathname();
  const laptop = useMediaQuery("(min-width:1024px)");

  const user = useSelector((state: RootState) => state.user);
  const authenticated = Boolean(user.uid);

  useEffect(() => {
    if (!laptop) {
      closeDrawer();
    }
  }, [pathname]);

  return (
    <Drawer
      components={{ Root: "nav" }}
      sx={{
        width: "20rem",
        flexShrink: 0,
        zIndex: { xs: 1200, lg: 1000 },
        "& .MuiDrawer-paper": {
          zIndex: { xs: 1200, lg: 1000 },
          width: "20rem",
          boxSizing: "border-box",
          backgroundColor: "var(--surface-secondary)",
          padding: { xs: "0 1rem 1rem", lg: "0 2rem 2rem" },
          borderRight: "none",
          boxShadow: { xs: "var(--modal)", lg: "none" },
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      ModalProps={{
        keepMounted: true,
      }}>
      <Box
        sx={{
          height: "80px",
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          overflow: "hidden",
        }}>
        <IconButton sx={{ display: { xxl: "none" } }} onClick={closeDrawer}>
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      </Box>
      <Stack
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar-thumb": {
            border: "4px solid transparent",
            borderLeftWidth: "8px",
            borderRightWidth: "0px",
            backgroundClip: "padding-box",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundClip: "padding-box",
          },
        }}>
        <NavHeader title="General" />
        <NavItem title="Dashboard" icon={faGrid2} path="/dashboard" />
        <NavItem title="Courses" icon={faCamcorder} path="/courses" />
        <NavItem title="Careers" icon={faBriefcase} path="/careers" />
        <NavHeader title="Community" />
        <NavItem title="Projects" icon={faFiles} path="/projects" />
        <NavItem title="Blogs" icon={faBlog} path="/blogs" />
        <NavItem title="About us" icon={faCircleInfo} path="/about" />
        {authenticated && user?.roles?.some((role) => role !== "user") && (
          <>
            <NavHeader title="Administration" />
            {MATCH_ROLE(user.roles, "recruiter") && (
              <NavItem
                title="Recruitment"
                icon={faBriefcase}
                path="/admin/careers"
              />
            )}
            {MATCH_ROLE(user.roles, "blogger") && (
              <NavItem
                title="Blogging"
                icon={faPenToSquare}
                path="/admin/blogs"
              />
            )}
            {MATCH_ROLE(user.roles, "instructor") && (
              <NavItem
                title="Courses"
                icon={faCamcorder}
                path="/admin/courses"
              />
            )}
            {MATCH_ROLE(user.roles, "admin") && (
              <NavItem title="Users" icon={faUsers} path="/admin/users" />
            )}
            {MATCH_ROLE(user.roles, "admin") && (
              <NavItem title="SSO Apps" icon={faGrid2Plus} path="/admin/apps" />
            )}
          </>
        )}
      </Stack>
    </Drawer>
  );
};

export default NavigationDrawer;
