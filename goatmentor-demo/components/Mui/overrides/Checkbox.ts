import { CheckboxClasses, CheckboxProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

const MuiCheckbox: {
  defaultProps?: Partial<CheckboxProps> | undefined;
  styleOverrides?:
    | Partial<
        OverridesStyleRules<
          keyof CheckboxClasses,
          "MuiCheckbox",
          Omit<Theme, "components">
        >
      >
    | undefined;
} = {
  styleOverrides: {
    root: {
      color: "var(--border-secondary)",
      "&.Mui-disabled": {
        color: "rgba(189, 189, 189, .37)",
      },
    },
  },
};

export default MuiCheckbox;
