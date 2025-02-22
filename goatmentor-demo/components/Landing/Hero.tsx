import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PlayButton from "../Common/PlayButton";
import { NextLinkComposed } from "../Mui/Link";

const Hero = () => {
  return (
    <Box
      component="section"
      bgcolor="background.surfaceSecondary"
      sx={{
        borderRadius: "var(--radius-xl)",
        maxWidth: "1440px",
        width: { xs: "calc(100% - 1rem)", md: "calc(100% - 2rem)" },
        margin: { xs: "0 0.5rem 1rem", md: "0 1rem 3rem" },
        padding: "0 1rem",
        overflow: "hidden",
      }}>
      <Stack
        className="wrapper"
        direction={{ xs: "column-reverse", lg: "row" }}
        justifyContent="space-around"
        alignItems={{ xs: "center", lg: "stretch" }}
        gap={{ xs: 3, md: 5 }}>
        <div id="hero-cover">
          <Image
            src="/images/cover.webp"
            alt="Cover image"
            width={483}
            height={729}
            priority
            style={{
              minHeight: "min(calc(100vh - 96px), 640px, 100vw)",
              maxHeight: "640px",
              objectFit: "contain",
              objectPosition: "bottom",
              width: "auto",
              aspectRatio: "2399 / 3206",
              height: "auto",
            }}
          />
        </div>

        <Stack
          direction="column"
          gap={{ xs: 3, md: 4 }}
          justifyContent="center"
          sx={{
            maxWidth: "34.5rem",
            textAlign: { xs: "center", lg: "left" },
            padding: { xs: "3rem 0 0", lg: "3rem 0" },
            zIndex: 2,
          }}>
          <Typography variant="displaylg" color="var(--text-title)">
            Take Your Tech{" "}
            <span style={{ color: "var(--text-primary)" }}>Experience</span> To
            The Next Level
          </Typography>
          <Typography variant="headlinemd">
            Your one-stop destination for exceptional online learning
            experiences.
          </Typography>
          <Stack
            direction="row"
            gap={2}
            justifyContent={{ xs: "center", lg: "flex-start" }}>
            <Button
              variant="contained"
              size="large"
              component={NextLinkComposed}
              to="/register"
              sx={{ flexBasis: { xs: "60%", md: "50%" } }}>
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={NextLinkComposed}
              to="/about"
              sx={{ flexBasis: { xs: "40%", md: "30%" } }}>
              About Us
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xs: "center", lg: "flex-start" }}
            gap={2}>
            <PlayButton ariaLabel="Play Icon" />
            <Link href="#welcome-video">
              <Typography
                variant="headlinesm"
                color="var(--text-title)"
                sx={{ textDecoration: "underline" }}>
                What’s Goatmentor?
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Hero;
