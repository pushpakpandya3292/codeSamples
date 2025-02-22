import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ContactUsForm from "./ContactUs";

const Footer = () => {
  return (
    <Box
      component="footer"
      bgcolor="var(--surface-secondary)"
      sx={{
        width: "100%",
        padding: "3rem 1rem",
      }}>
      <Stack className="wrapper" gap={10}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={3}>
          <Stack
            gap={4}
            alignItems={{ xs: "center", lg: "flex-start" }}
            sx={{
              flex: 1,
              maxWidth: "500px",
            }}>
            <Image
              src="/images/logo-text.svg"
              alt="logo"
              width={232}
              height={100}
              style={{ marginBlock: "2rem" }}
            />
            <Stack gap={2}>
              <Stack
                direction="row"
                component="a"
                href="mailto:xxxxxxx"
                target="_blank"
                gap={2}
                alignItems="center"
                color="var(--text-title)">
                <FontAwesomeIcon icon={faAt} size="xl" />
                <Typography variant="headlinesm">
                  xxxxxx
                </Typography>
              </Stack>
              <Stack
                direction="row"
                component="a"
                href="xxxxx"
                target="_blank"
                gap={2}
                alignItems="center"
                color="var(--text-title)">
                <FontAwesomeIcon icon={faLinkedinIn} size="xl" />
                <Typography variant="headlinesm">
                  goatmentortechnologies
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              component="nav"
              gap={2}
              justifyContent="space-between"
              style={{
                marginBlock: "2rem",
                width: "100%",
              }}>
              <Stack gap={1}>
                <Link href="/about">About Us</Link>
                <Link href="/about#team">Our Team</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </Stack>
              <Stack gap={1}>
                <Link href="/blogs">Blogs</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/courses">Courses</Link>
                <Link href="/register">Register</Link>
              </Stack>
            </Stack>
          </Stack>
          <Stack id="contact-us" gap={2} sx={{ maxWidth: "440px" }}>
            <Typography
              variant="displaymd"
              textAlign={{ xs: "center", lg: "left" }}
              color="var(--text-title)"
              sx={{ marginBottom: 2 }}>
              Contact Us
            </Typography>
            <ContactUsForm />
          </Stack>
        </Stack>
        <Typography
          variant="labellg"
          color="var(--text-title)"
          textAlign="center">
          Copyright {new Date().getFullYear()} Goatmentor
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
