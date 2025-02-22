import React from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface MultiSelectInputProps {
  value?: string[];
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  options: string[];
  onChange: (event: React.ChangeEvent<{}>, value: string[]) => void;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  value,
  options,
  label,
  placeholder,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <Autocomplete
      sx={{ width: "100%" }}
      multiple
      value={value || []}
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error ? true : false}
          helperText={error ? error : ""}
          size="small"
          variant="outlined"
          label={label || "Select Options"}
          placeholder={placeholder || "Select Options"}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: "space-between" }}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  );
};

export default MultiSelectInput;
