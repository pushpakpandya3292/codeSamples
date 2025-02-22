import React from "react";
import { CardBox, CardInnerBox } from "./Styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface CustomCardProps {
  title: string;
  image: string;
  secondaryTitle?: string;
  content: string;
  children?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  secondaryTitle,
  content,
  image,
  children,
}: CustomCardProps) => {
  return (
    <CardBox sx={{ height: "100%" }}>
      <CardInnerBox>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        {secondaryTitle && (
          <Typography
            variant="h4"
            sx={{ fontWeight: "400", textAlign: "center" }}
          >
            ({secondaryTitle})
          </Typography>
        )}
        <Box className="imageBox" sx={{ my: 2 }}>
          <Image src={image} alt="" width={250} height={150} />
        </Box>
        <Typography variant="h5">{content}</Typography>
      </CardInnerBox>
      <CardInnerBox sx={{ mt: 1 }}>{children}</CardInnerBox>
    </CardBox>
  );
};

export default CustomCard;
