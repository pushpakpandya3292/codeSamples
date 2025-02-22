import React, { Dispatch, SetStateAction } from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { FormControlLabel } from "@mui/material";

interface CustomCheckBoxProps {
  checked: boolean;
  setChecked?: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  type: "CIRCLE" | "SQUARE";
  value?: string | boolean;
  disabled?: boolean;
  sx?: any;
  defaultChecked?: boolean;
  performOnChange?: boolean;
  onChange?: () => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = (props) => {
  const {
    checked,
    setChecked = () => {},
    children,
    type = "SQUARE",
    value,
    disabled,
    defaultChecked,
    sx,
    performOnChange = false,
    onChange = () => {},
  } = props;

  const handleChange = () => {
    if (performOnChange) {
      onChange();
    } else {
      setChecked(!checked);
    }
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={disabled}
          value={value}
          checked={checked}
          defaultChecked
          sx={sx}
          onChange={handleChange}
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
              <CheckBoxRoundedIcon
                sx={{ color: (theme) => theme.palette.primary.main }}
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
