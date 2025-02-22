import Logo from "@/components/Logo";
import Slideshow from "@/components/Onboarding/Slideshow";
import { Box, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoatMentor",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="main"
      className="wrapper-wide"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        padding: "2rem",
        minHeight: "100vh",
      }}>
      <Stack
        gap={3}
        sx={{
          flex: 5,
          minHeight: "min(calc(100vh - 4rem), 50rem)",
          maxHeight: "50rem",
        }}>
        <div style={{ alignSelf: "flex-start" }}>
          <Logo />
        </div>
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: "27rem",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
          }}>
          {children}
        </Box>

        <Typography
          variant="labelmd"
          color="var(--text-subtitle)"
          textAlign="center">
          &copy; Copyright {new Date().getFullYear()} Goatmentor
        </Typography>
      </Stack>
      <Slideshow />
    </Box>
  );
};

export default Layout;
