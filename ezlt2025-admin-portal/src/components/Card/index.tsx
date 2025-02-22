import { Box } from "@mui/material";

interface CustomCardProps {
  autoHeight?: boolean;
  border?: string;
  padding?: string | number;
  children?: React.ReactNode;
  width?: string | number;
}

const CustomCard = ({
  autoHeight,
  children,
  border,
  padding,
  width,
}: CustomCardProps) => {
  return (
    <Box
      sx={{
        background: "rgb(255, 255, 255)",
        boxShadow:
          "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px, rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
        borderRadius: "12px",
        padding: padding ? padding : "20px",
        width: width ? width : "100%",
        height: autoHeight ? "auto" : "100%",
        border: border,
      }}
    >
      {children}
    </Box>
  );
};

export default CustomCard;
