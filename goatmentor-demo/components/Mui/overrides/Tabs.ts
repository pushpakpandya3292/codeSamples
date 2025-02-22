import { TabsClasses, TabsProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

const MuiTabs:
  | {
      defaultProps?: Partial<TabsProps> | undefined;
      styleOverrides?:
        | Partial<
            OverridesStyleRules<
              keyof TabsClasses,
              "MuiTabs",
              Omit<Theme, "components">
            >
          >
        | undefined;
    }
  | undefined = {
  styleOverrides: {
    root: {
      width: "100%",
      borderBottom: "1px solid var(--border)",
      "& .MuiTabs-flexContainer": {
        justifyContent: "space-around",
      },
      "& .MuiTabs-indicator": {
        height: "3px",
        borderRadius: "6px 6px 0 0",
      },
      "& .MuiTab-root": {
        textTransform: "none",
        letterSpacing: "0.1px",
        padding: "12px 8px",
        minWidth: "unset",
      },
    },
  },
};

export default MuiTabs;
