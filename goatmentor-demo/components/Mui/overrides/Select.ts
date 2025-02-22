import { SelectClasses, SelectProps, Theme } from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

const MuiSelect: {
  defaultProps?: Partial<SelectProps<unknown>> | undefined;
  styleOverrides?:
    | Partial<
        OverridesStyleRules<
          keyof SelectClasses,
          "MuiSelect",
          Omit<Theme, "components">
        >
      >
    | undefined;
} = {
  defaultProps: {
    MenuProps: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      sx: {
        "& .MuiList-root": {
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 0,
        },
        "& .MuiPaper-root": {
          overflowY: "auto",
          maxWidth: { sm: "432px" },
          minWidth: "unset !important",
          width: "100%",
        },
        "& .MuiMenuItem-root": {
          margin: "0 1rem",
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-lg)",
        },
        "& .MuiMenuItem-root:first-child": {
          marginTop: "1rem",
        },
        "& .MuiMenuItem-root:last-child": {
          marginBottom: "1rem",
        },
      },
    },
  },
  // @ts-ignore
  styleOverrides: {
    ...{
      root: {
        "& .MuiInputBase-input": {
          padding: "1rem 2rem 0.75rem 1rem",
          color: "var(--text-subtitle)",
          fontSize: "1rem",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "var(--radius-md)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--border-primary)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--border-primary)",
        },
      },
    },
  },
};

export default MuiSelect;
