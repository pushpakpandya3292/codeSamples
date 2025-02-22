import { SwitchClasses, SwitchProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

const MuiSwitch: {
  defaultProps?: Partial<SwitchProps> | undefined;
  styleOverrides?:
    | Partial<
        OverridesStyleRules<
          keyof SwitchClasses,
          "MuiSwitch",
          Omit<Theme, "components">
        >
      >
    | undefined;
} = {
  styleOverrides: {
    root: {
      width: "4.25rem",
      height: "3rem",
      padding: "0.5rem",
      "& .MuiSwitch-track": {
        borderRadius: "var(--radius-full)",
        border: "2px solid var(--border-secondary)",
        backgroundColor: "transparent",
        opacity: 1,
      },
      "& .MuiSwitch-switchBase": {
        color: "var(--border-secondary)",
      },
      "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 7,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        color: "var(--surface-secondary)",
      },
      "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
        width: 24,
        height: 24,
        margin: 3,
      },
      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        opacity: 1,
        border: "none",
      },
      "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
      "& .MuiSwitch-switchBase.Mui-disabled": {
        color: "var(--border)",
        opacity: 0.5,
      },
    },
  },
};

export default MuiSwitch;
