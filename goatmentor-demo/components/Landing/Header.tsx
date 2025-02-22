"use client";

import Logo from "@/components/Logo";
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { NextLinkComposed } from "../Mui/Link";

interface Props {
  marketing?: boolean;
}

const LandingHeader = ({ marketing = false }) => {
  const landingPages = [
    {
      name: "Apply",
      href: "#apply",
    },
    {
      name: "Projects",
      href: "#projects",
    },
    {
      name: "Courses",
      href: "#courses",
    },
    {
      name: "Discount",
      href: "#discount",
    },
    {
      name: "Contact Us",
      href: "#contact-us",
    },
  ];

  const marketingPages = [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Courses",
      href: "/courses",
    },
    {
      name: "Careers",
      href: "/careers",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "background.default",
        padding: "0 1rem",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}>
      <Stack
        component="header"
        className="wrapper"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
        sx={{
          height: "80px",
        }}>
        <Logo />
        <Stack
          component="nav"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          display={{
            xs: "none",
            lg: "flex",
          }}
          gap={3}>
          {(marketing ? marketingPages : landingPages).map((page) => {
            return (
              <Link key={`nav:${page.name}`} href={page.href}>
                {page.name}
              </Link>
            );
          })}
        </Stack>
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
      </Stack>
    </Box>
  );
};

export default LandingHeader;
