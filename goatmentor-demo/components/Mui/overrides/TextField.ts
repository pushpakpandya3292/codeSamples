import { TextFieldProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

const MuiTextField:
  | {
    defaultProps?: Partial<TextFieldProps> | undefined;
    styleOverrides?:
    | Partial<
      OverridesStyleRules<
        "root",
        "MuiTextField",
        Omit<Theme, "components">
      >
    >
    | undefined;
  }
  | undefined = {
  defaultProps: {
    size: "medium",
    onFocus: (e) => {
      if (e.target.type === 'number') {
        e.target.addEventListener("wheel",
          (e) => { e.preventDefault() },
          { passive: false }
        )
      }
    },
    onKeyDown: (e) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
      }
    }
  },
  styleOverrides: {
    root: {
      '& input[type=number]': {
        '-moz-appearance': 'textfield'
      },
      '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      "& .MuiInputBase-root": {
        borderRadius: "var(--radius-md)",
        padding: "0",
      },
      "& .MuiInputBase-input": {
        padding: "0.875rem 1rem",
        color: "var(--text-subtitle)",
        fontSize: "1rem",
      },
      // "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      //   borderColor: "var(--border-primary)",
      // },
      // "&:hover .MuiOutlinedInput-notchedOutline": {
      //   borderColor: "var(--surface-primary)",
      // },
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: "var(--border-primary)",
        },
        "&.Mui-focused fieldset": {
          borderColor: "var(--border-primary)",
        },
      },
      "& svg": {
        color: "var(--text-subtitle)",
      },
      "& .MuiInputLabel-shrink": {
        color: "var(--text-subtitle)",
        fontSize: "1rem",
        lineHeight: "1.25rem",
      },
      "& .MuiInputLabel-shrink.Mui-focused": {
        color: "var(--border-primary)",
      },
    },
  },
};

export default MuiTextField;
