import { faClose } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AutocompleteClasses,
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  Chip,
  Stack,
} from "@mui/material";
import { OverridesStyleRules } from "@mui/material/styles/overrides";

export const AutocompleteTags = (
  value: string[],
  getTagProps: AutocompleteRenderGetTagProps
) => (
  <Stack direction="row" gap={1} sx={{ overflowX: "auto" }}>
    {value.map((option, index) => (
      <Chip
        {...getTagProps({ index })}
        key={`tag:${option}`}
        label={option}
        size="small"
        variant="outlined"
        deleteIcon={
          <FontAwesomeIcon
            icon={faClose}
            style={{ marginRight: "6px", fontSize: "14px" }}
          />
        }
      />
    ))}
  </Stack>
);

export const MuiAutocomplete: {
  defaultProps?:
    | Partial<AutocompleteProps<any, any, any, any, "div">>
    | undefined;
  styleOverrides?:
    | Partial<OverridesStyleRules<keyof AutocompleteClasses, "MuiAutocomplete">>
    | undefined;
} = {
  defaultProps: {
    componentsProps: {
      paper: {
        sx: {
          maxWidth: { sm: "432px" },
          minWidth: "unset !important",
          width: "100%",
          boxShadow: "var(--modal)",
          "& .MuiAutocomplete-option": {
            margin: "0.25rem 0.75rem 0.25rem 1rem",
            padding: "0.75rem 1rem !important",
            borderRadius: "var(--radius-lg)",
          },
        },
      },
    },
    renderTags: (value, getTagProps) => AutocompleteTags(value, getTagProps),
  },
};

export const AutocompleteTextField = {
  "& .MuiAutocomplete-inputRoot": {
    paddingLeft: "0.75rem",
  },
  "& .MuiAutocomplete-input": {
    padding: "1rem 2rem 0.75rem 0.25rem !important",
  },
};
