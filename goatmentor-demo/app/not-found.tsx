"use client";
import Header from "@/components/Home/Header";
import { NextLinkComposed } from "@/components/Mui/Link";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <Box
      bgcolor="var(--surface-secondary)"
      sx={{
        minHeight: "100vh",
        paddingBottom: { xs: "0.5rem", lg: "2rem" },
      }}>
      <Header hideDrawerIcon />
      <Box
        sx={{
          borderRadius: { xs: "var(--radius-lg)", md: "var(--radius-xl)" },
          backgroundColor: "var(--background)",
          padding: { xs: 2, lg: 6 },
          marginInline: { xs: "0.5rem", lg: "2rem" },
          minHeight: { xs: "calc(100vh - 88px)", lg: "calc(100vh - 112px)" },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, sm: 6 },
          alignItems: "center",
        }}>
        <Image
          src="/images/404.svg"
          alt="Illustration"
          width={300}
          height={350}
          priority
          style={{
            display: "block",
            width: "100%",
            height: "35vh",
          }}
        />
        <Stack alignItems="center" sx={{ gap: 1, textAlign: "center" }}>
          <div className="primary-divider"></div>
          <Typography variant="displaysm" color="var(--text-primary)">
            404
          </Typography>
          <Typography variant="displaymd" color="var(--text-title)">
            Page Not Found!
          </Typography>
          <Typography variant="headlinesm">
            The page you’re looking for doesn’t exist or has been moved.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          sx={{
            width: "100%",
            maxWidth: "500px",
          }}>
          <Button
            variant="outlined"
            size="large"
            onClick={(e) => router.back()}
            sx={{
              flex: 1,
            }}>
            Go Back
          </Button>
          <Button
            variant="contained"
            size="large"
            component={NextLinkComposed}
            to="/dashboard"
            sx={{
              flex: 1,
            }}>
            Dashboard
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NotFound;
