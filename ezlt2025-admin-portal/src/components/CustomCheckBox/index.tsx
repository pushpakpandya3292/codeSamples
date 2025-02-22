import React, { Dispatch, SetStateAction } from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FormControlLabel } from "@mui/material";

interface CustomCheckBoxProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  type: "CIRCLE" | "SQUARE";
  value?: string | boolean;
  disabled?: boolean;
  sx?: any;
  defaultChecked?: boolean;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = (props) => {
  const {
    checked,
    setChecked,
    children,
    type = "SQUARE",
    value,
    disabled,
    defaultChecked,
    sx,
  } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={disabled}
          value={value}
          checked={checked}
          defaultChecked
          sx={sx}
          onChange={() => {
            setChecked(!checked);
          }}
          icon={
            type == "CIRCLE" ? (
              <RadioButtonUncheckedIcon
                sx={{ color: (theme) => theme.palette.text.disabled }}
              />
            ) : (
              <CheckBoxOutlineBlankIcon
                sx={{ color: (theme) => theme.palette.text.disabled }}
              />
            )
          }
          checkedIcon={
            type == "SQUARE" ? (
              <CheckBoxIcon
                sx={{ color: (theme) => theme.additionalColors?.orange }}
              />
            ) : (
              <CheckCircleIcon
                sx={{ color: (theme) => theme.additionalColors?.orange }}
              />
            )
          }
        />
      }
      label={children}
    />
  );
};

export default CustomCheckBox;
