"use client";

import Logo from "@/components/Logo";
import { RootState } from "@/store";
import { HOME_PAGES } from "@/utils/constants";
import {
  faBars,
  faChevronDown,
  faClose,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../Common/Avatar";
import { NextLinkComposed } from "../Mui/Link";

interface Props {
  open?: boolean;
  openDrawer?: () => void;
  closeDrawer?: () => void;
  hideDrawerIcon?: boolean;
}

const UserMenu = dynamic(() => import("./UserMenu"));

const Header = ({
  open,
  openDrawer,
  closeDrawer,
  hideDrawerIcon = false,
}: Props) => {
  const pathname = usePathname();

  const user: User = useSelector((state: RootState) => state.user);
  const authenticated = Boolean(user.uid);

  const homePages = HOME_PAGES.includes(pathname);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const tablet = useMediaQuery("(min-width:768px)");

  const largeScreen = useMediaQuery("(min-width:2080px)");

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
          <Logo link="/dashboard" />
          {!hideDrawerIcon && (
            <IconButton
              sx={{
                display: {
                  xxl: homePages || largeScreen ? "none" : "inline-flex",
                },
              }}
              aria-label={open ? "Close drawer" : "Open drawer"}
              onClick={open ? closeDrawer : openDrawer}>
              <FontAwesomeIcon
                icon={open ? faClose : faBars}
                size={tablet ? "1x" : "sm"}
              />
            </IconButton>
          )}
        </Stack>
        {authenticated && (
          <>
            <Stack
              direction="row"
              alignItems="center"
              gap={{ xs: 1, md: 2 }}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick(e);
                }
              }}
              tabIndex={0}
              sx={{
                padding: {
                  xs: "0.25rem 0.5rem 0.25rem 0.25rem",
                  md: "0.25rem 1rem 0.25rem 0.25rem",
                },
                cursor: "pointer",
                transition: "all 300ms ease-in-out",
                borderRadius: "var(--radius-full)",
                "&:hover, &:focus": {
                  backgroundColor: "var(--primary-container)",
                  outline: "none",
                },
              }}>
              <Avatar
                src={user.photo}
                width={tablet ? 48 : 36}
                alt="Profile Photo"
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                size={tablet ? "lg" : "1x"}
                style={{ color: "var(--text-subtitle)" }}
              />
            </Stack>

            <UserMenu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
            />
          </>
        )}
        {!authenticated && (
          <Stack direction="row" alignItems="center" gap={{ sm: 2 }}>
            <Button variant="text" component={NextLinkComposed} to="/login">
              Login
            </Button>
            <Button
              variant="contained"
              component={NextLinkComposed}
              to="/register">
              Register
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
