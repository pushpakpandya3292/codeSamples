import { IconButtonClasses, IconButtonProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

const MuiIconButton: {
  defaultProps?: Partial<IconButtonProps> | undefined;
  styleOverrides?:
    | Partial<
        OverridesStyleRules<
          keyof IconButtonClasses,
          "MuiIconButton",
          Omit<Theme, "components">
        >
      >
    | undefined;
} = {
  styleOverrides: {
    root: {
      color: "var(--text-title)",
      transition: "all 300ms ease-in-out",
      "&.MuiIconButton-colorPrimary": {
        backgroundColor: "var(--surface-primary)",
        color: "var(--surface-secondary)",
        "&:hover": {
          backgroundColor: "var(--primary-variant)",
        },
      },
      "&.MuiIconButton-colorSecondary": {
        border: "1px solid var(--border-secondary)",
      },
      "& svg": {
        aspectRatio: 1,
      },
    },
  },
};

export default MuiIconButton;
