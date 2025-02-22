import styled from "@emotion/styled";
import { TextField } from "@mui/material";

interface InputFieldProps {
  theme?: any;
  error?: any;
}

export const CustomTextField = styled(TextField)(
  ({ theme, error }: InputFieldProps) => {
    return {
      "& > label": {
        color: "#535F6B",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "normal",
      },
      "& .MuiFormHelperText-root": {
        height: "6.5px",
        marginTop: 0,
        padding: 0,
        fontSize: "10px",
        display: error ? "flex" : "none"
      },
      "& .MuiOutlinedInput-root:hover fieldset": {
        borderColor: " rgba(0, 0, 0, 0.26)!important",
        borderWidth: "1px !important",
      },

      // "& .MuiInputBase-input": {
      //   background: theme.additionalColors?.formInputBg,
      //   borderRadius: "5px",
      //   fontFamily: "Roboto",
      //   fontSize: "14px",
      //   fontStyle: "normal",
      //   fontWeight: "400",
      //   lineHeight: "normal",
      //   "&.Mui-disabled": {
      //     background: theme.additionalColors?.disabledInputbg,
      //     borderRadius: "3px",
      //   },
      // },
      // // "& label.Mui-focused": {
      // //   top: "5%",
      // //   color: !error ? "" : "",
      // // },
      // "& .MuiInput-underline:after": {
      //   borderBottomColor: !error ? "" : "",
      // },
      // "& .MuiOutlinedInput-notchedOutline": {
      //   border: "0",
      //   borderColor: "#F0F7FF",
      // },
      // '& legend': { display: 'none' },
      // '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
    };
  }
);
export const renderFieldProps = (error?: any) => {
  return {
    size: "small" as any,
    variant: "outlined" as any,
    error: error ? true : false,
    helperText: error?.message ? error?.message : " ",
  };
};

export default CustomTextField;
