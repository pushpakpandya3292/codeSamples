import * as React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 0,
  width: "62px",
  height: "28px",
  borderRadius: "40px",
  "& .MuiSwitch-switchBase": { padding: "0 !important", color: "#FDA440" },
  "& .MuiSwitch-switchBase.Mui-checked": {
    transform: "translateX(30px) !important",
    color: "#fff",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#F0F7FF",
    opacity: "1 !important",
    borderRadius: 22 / 2,
    "&::before, &::after": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 21,
      height: 21,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
    },
    "&::before": {
      content: '"Yes"',
      left: 5,
      color: "#fff",
    },
    "&::after": {
      content: '"No"',
      right: 5,
      color: "#000",
    },
  },
  "& .Mui-checked+.MuiSwitch-track": {
    backgroundColor: "#31C859 !important",
  },

  "& .MuiSwitch-thumb": {
    width: 21,
    height: 21,
    margin: 2,
    position: "relative",
    top: "2px",
    left: "3px",
    boxShadow:
      "0px 2.657px 0.886px 0px rgba(0, 0, 0, 0.06), 0px 2.657px 7.086px 0px rgba(0, 0, 0, 0.15)",
  },
  "& .MuiFormControlLabel-root": {
    marginLeft: "0 !important"
  }
}));
export default function CustomToggle({ checked, setChecked, label }: any) {
  return (
    <FormControlLabel
      sx={{ marginLeft: "0", gap: "10px" }}
      label={label ? label : ""}
      control={<CustomSwitch checked={checked} onChange={() => setChecked(!checked)} />}
    >

    </FormControlLabel>
  );
}
