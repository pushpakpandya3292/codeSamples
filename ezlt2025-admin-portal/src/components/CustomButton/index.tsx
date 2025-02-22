import React, { ReactNode } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CustomButtonProps {
  icon?: ReactNode;
  onClick?: () => void;
  children: any;
  disabled?: boolean;
  width?: string;
  height?: string;
  buttonType?: "button" | "reset" | "submit" | undefined;
  variant?: "contained" | "outlined" | "text";
  type: "ADD" | "CANCEL" | "DEFAULT";
  mr?: number;
  buttonBehaviour?: "button" | "reset" | "submit" | undefined;
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
  buttonBehaviour,
  variant,
  buttonType,
}: CustomButtonProps) {
  return (
    <Button
      startIcon={icon}
      onClick={onClick}
      disabled={disabled || false}
      type={buttonBehaviour}
      {...(buttonType && { type: buttonType })}
      sx={{
        height: height || "45px",
        width: { sm: width || "100%", md: width || "100%" },
        background: (theme) =>
          type === "DEFAULT"
            ? ""
            : type === "ADD"
            ? theme.additionalColors?.background.tertiary
            : theme.additionalColors?.button.cancelbg,
        color: (theme) =>
          type === "DEFAULT"
            ? ""
            : type === "ADD"
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
      variant={variant}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
