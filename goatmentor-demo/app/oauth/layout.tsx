import { Box, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "GoatGate SSO",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        padding: { xs: "1rem", md: "2rem" },
        minHeight: "100vh",
        backgroundColor: "var(--surface-secondary)",
      }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={"/logo.png"}
          alt="logo"
          width={24}
          height={24}
          style={{
            objectFit: "contain",
          }}
        />
        <Typography variant="labellg" color="var(--text-title)">
          Sign in with GoatGate
        </Typography>
      </Stack>
      <Box
        component="section"
        sx={{
          width: "100%",
          padding: { xs: "1rem", md: "2rem" },
          minHeight: "20rem",
          maxWidth: "32rem",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignSelf: "center",
          backgroundColor: "var(--background)",
          borderRadius: "var(--radius-lg)",
        }}>
        {children}
      </Box>
      <Typography
        variant="labelmd"
        color="var(--text-subtitle)"
        textAlign="center">
        &copy; Copyright {new Date().getFullYear()} Goatmentor
      </Typography>
    </Box>
  );
};

export default Layout;
