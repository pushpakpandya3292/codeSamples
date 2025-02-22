import { ArrowBack, BackHand } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
  title: string;
  active?: string;
  isBack?: boolean;
}

const Pageheader: React.FC<PageHeaderProps> = ({ title, active, isBack }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1,
        py: 2,
      }}
    >
      {isBack && (
        <ArrowBack
          sx={{
            fontSize: "28px",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        />
      )}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontFamily: "Roboto",
          fontStyle: "normal",
          lineHeight: "normal",
          color: (theme) => theme.palette.text.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
        }}
      >
        {title}
      </Typography>
      {active && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            fontFamily: "Roboto",
            fontStyle: "normal",
            lineHeight: "normal",
            color: (theme) => theme.palette.text.disabled,
            fontSize: "16px",
            pt: "2px",
          }}
        >
          / {active}
        </Typography>
      )}
    </Box>
  );
};

export default Pageheader;
