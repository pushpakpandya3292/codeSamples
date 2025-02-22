import { createTheme } from "@mui/material/styles";
import palette from "./config/palette";
import typography, { variantMapping } from "./config/typography";
import { MuiAccordionSummary } from "./overrides/Accordion";
import { MuiAutocomplete } from "./overrides/Autocomplete";
import MuiButton from "./overrides/Button";
import MuiCheckbox from "./overrides/Checkbox";
import MuiIconButton from "./overrides/IconButton";
import MuiSelect from "./overrides/Select";
import MuiSwitch from "./overrides/Switch";
import MuiTabs from "./overrides/Tabs";
import MuiTextField from "./overrides/TextField";

const theme = createTheme({
  palette: palette,
  typography: typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: variantMapping,
        variant: "bodylg",
      },
    },
    MuiButton: MuiButton,
    MuiCheckbox: MuiCheckbox,
    MuiTextField: MuiTextField,
    MuiSwitch: MuiSwitch,
    MuiIconButton: MuiIconButton,
    MuiTabs: MuiTabs,
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--primary-container)",
          borderRadius: "var(--radius-md)",
          color: "var(--primary)",
          "& .MuiChip-icon": {
            marginLeft: "8px",
            color: "var(--primary)",
          },
          ...typography.labelmd,
        },
        outlined: {
          border: "1px solid var(--border-secondary)",
          color: "var(--text-title)",
          backgroundColor: "transparent",
        },
        colorInfo: {
          backgroundColor: palette?.info?.light,
          color: palette?.info?.main,
        },
        colorSuccess: {
          backgroundColor: palette?.success?.light,
          color: palette?.success?.main,
        },
        colorWarning: {
          backgroundColor: palette?.warning?.light,
          color: palette?.warning?.dark,
        },
        colorError: {
          backgroundColor: palette?.error?.light,
          color: palette?.error?.main,
        },
        sizeSmall: {
          height: "auto",
          "& .MuiChip-label": {
            padding: "0.375rem 1rem",
          },
          ...typography.labelsm,
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "var(--border)",
          ...typography.labelmd,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            ...typography.labelmd,
            color: "var(--text-title)",
          },
        },
      },
    },
    MuiSelect: MuiSelect,
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "translate(14px, 14px) scale(1)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
            color: "var(--text-subtitle)",
          },
          "&.MuiInputLabel-shrink.Mui-focused": {
            color: "var(--border-primary)",
          },
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      },
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--modal)",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.25)",
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            marginTop: "0",
            marginBottom: "0",
          },
          "&:not(:last-child)": {
            borderBottom: 0,
          },
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          borderTop: "1px solid var(--border)",
        },
      },
    },
    MuiAccordionSummary: MuiAccordionSummary,
    MuiAlert: {
      styleOverrides: {
        root: {
          background: "var(--background)",
          boxShadow: "var(--modal)",
          borderRadius: "var(--radius-md)",
        },
        standardError: {
          color: palette?.error?.main,
        },
        standardInfo: {
          color: palette?.info?.main,
        },
        standardSuccess: {
          color: palette?.success?.main,
        },
        standardWarning: {
          color: palette?.warning?.main,
        },
      },
    },
    MuiAutocomplete: MuiAutocomplete,
  },
});

export default theme;
