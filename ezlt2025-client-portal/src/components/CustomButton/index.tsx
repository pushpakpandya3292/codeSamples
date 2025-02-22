import React, { ReactNode } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CustomButtonProps {
  icon?: ReactNode;
  onClick?: () => void;
  children: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  type: "ADD" | "CANCEL";
  mr?: number;
}

function CustomButton({
  icon,
  onClick,
  children,
  disabled,
  width,
  height,
  type,
  mr,
}: CustomButtonProps) {
  return (
    <Button
      startIcon={icon}
      onClick={onClick}
      disabled={disabled || false}
      sx={{
        height: height || "45px",
        width: { sm: width || "100%", md: width || "100%" },
        background: (theme) =>
          type === "ADD"
            ? theme.additionalColors?.background.tertiary
            : theme.additionalColors?.button.cancelbg,
        color: (theme) =>
          type === "ADD"
            ? theme.palette.primary.main
            : theme.additionalColors?.button.canceltext,
        borderRadius: "5px",
        padding: "12px 45px",
        fontSize: "16px",
        fontFamily: "Roboto",
        textTransform: "capitalize",
        fontWeight: "600",
        mr: mr,
      }}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
