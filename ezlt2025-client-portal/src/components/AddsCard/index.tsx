import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import dummy from "@/assets/img/Doc.png";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Image, { StaticImageData } from "next/image";
interface AddsCardProps {
  image: StaticImageData;
  title: string;
  backgroundColor: string;
  description: string;
  buttonContent: string;
  onClick?: () => void;
  buttonIcon: React.ReactNode;
  className?: string;
}

const AddsCard: React.FC<AddsCardProps> = ({
  image,
  title,
  backgroundColor,
  description,
  onClick,
  buttonIcon,
  buttonContent,
  className
}) => {
  return (
    <Card
      sx={{
        height: { xs: "auto", md: "100%" },
        maxHeight: { xs: "auto", md: "auto", lg: "auto", xl: "auto" },
        backgroundColor: "#c3d7ff80", // Light yellow background color
        borderRadius: 2,
        gap: 2,
        position: "relative",
        padding: "50px 25px",
        overflow: "visible",
        boxShadow: "none",
        border: "0",
        display: "flex",
        img: {
          width: "80px",
          height: "80px",
          borderRadius: "50%",
        },
      }}
      className={className}
    >
      <Image src={image} alt="Feedback Icon" width={80} height={80} />
      <CardContent sx={{ padding: "0 !important" }}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h4" fontWeight={400} sx={{ marginTop: 1 }}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          endIcon={buttonIcon}
          sx={{
            marginTop: 2,
            background: "#1976D2",
            color: "#fff",
            border: "1px solid #1976D2",
            textTransform: "capitalize",
            "&:hover": {
              color: "#000",
              backgroundColor: "transparent",
            },
            fontSize: { xs: "12px", md: "16px" },
          }}
          onClick={onClick}
        >
          {buttonContent}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddsCard;
