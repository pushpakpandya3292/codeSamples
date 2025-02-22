import { ButtonClasses, ButtonProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";
import typography from "../config/typography";

const MuiButton:
  | {
      defaultProps?: Partial<ButtonProps> | undefined;
      styleOverrides?:
        | Partial<
            OverridesStyleRules<
              keyof ButtonClasses,
              "MuiButton",
              Omit<Theme, "components">
            >
          >
        | undefined;
    }
  | undefined = {
  styleOverrides: {
    root: {
      textTransform: "none",
      borderRadius: "var(--radius-md)",
      boxShadow: "none",
      padding: "0.625rem 1.5rem",
      transition: "all 300ms ease-in-out",
      gap: "0.5rem",
      cursor: "pointer",
      whiteSpace: "nowrap",
      ...typography?.labelmd,

      "&:hover, &:focus": {
        boxShadow: "none",
        // transform: "scale(1.0125)",
      },
      "& .MuiButton-startIcon": {
        margin: "0",
      },
      "& .MuiButton-startIcon>*:nth-of-type(1)": {
        fontSize: "1rem",
      },
    },
    contained: {
      color: "#fff",
      "&.Mui-disabled": {
        background: "var(--surface)",
        color: "rgba(77, 71, 71, .37)",
      },
    },
    outlined: {
      border: "1px solid var(--border-secondary)",
      color: "var(--text-title)",
      "&:hover, &:focus": {
        border: "1px solid var(--surface-primary)",
        color: "var(--surface-primary)",
      },
      "& .MuiButton-startIcon svg": {
        color: "inherit",
      },
      "&.Mui-disabled": {
        border: "1px solid var(--surface, #F5F5F5)",
        color: "rgba(77, 71, 71, .37)",
      },
    },
    text: {
      color: "var(--text-primary)",
      "&, &.MuiButton-textSizeLarge": {
        padding: "0.625rem 0.75rem",
      },
      "&:hover, &:focus": {
        color: "var(--surface-primary)",
      },
      "&.Mui-disabled": {
        color: "rgba(247, 145, 61, .37)",
      },
    },
    sizeLarge: {
      ...typography?.labellg,
      padding: "0.875rem 1.5rem",
      "& .MuiButton-startIcon>*:nth-of-type(1)": {
        fontSize: "1.25rem",
      },
      "&.MuiButton-outlinedSizeLarge": {
        borderWidth: "2px",
      },
    },
  },
};

export default MuiButton;
