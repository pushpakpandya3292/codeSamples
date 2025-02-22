import React, { forwardRef } from "react";
import { Box, TextField } from "@mui/material";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneNumberFieldProps {
  onChange: (value: string | undefined) => void;
  value: string | undefined | null;
  label: string;
  rest?: any;
}
interface FieldInputProps {
  InputLabelProps?: any;
}
const FieldInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  FieldInputProps
> = (props: Omit<FieldInputProps, "ref">, ref: React.Ref<HTMLInputElement>) => {
  return <TextField {...props} inputRef={ref} />;
};
const InputField = forwardRef<HTMLInputElement, FieldInputProps>(FieldInput);

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  onChange,
  label,
  value,
  ...rest
}) => {
  return (
    <Box
      sx={{
        "& .PhoneInputCountry": {
          display: "none",
        },
        "& .MuiInputLabel-root": {
          color: (theme) => theme.palette.text.disabled,
          fontWeight: "400",
          fontFamily: "Roboto",
          lineHeight: "normal",
        },
        "& .PhoneInputInput .MuiFormHelperText-root": {
          // position: "absolute",
          // bottom: "-6px",
          height: "10px",
          marginTop: "0",
          padding: "0",
          fontSize: "10px",
          color: (theme) => theme.palette.error.main,
        },
        "& .MuiOutlinedInput-root fieldset": {
          borderColor: " rgba(0, 0, 0, 0.26)!important",
        },
        "& .MuiOutlinedInput-root:hover fieldset": {
          borderColor: (theme) => theme.palette.text.disabled,
          borderWidth: "1px !important",
        },
      }}
    >
      <PhoneInputWithCountrySelect
        inputComponent={InputField}
        placeholder="(XXX) XXX-XXXX"
        limitMaxLength={true}
        defaultCountry="US"
        addInternationalOption={false}
        value={value ? value : undefined}
        initialValueFormat="national"
        international={false}
        onChange={onChange}
        countries={["US"]}
        label={label}
        // useNationalFormatForDefaultCountryValue={true}
        {...rest}
      />
    </Box>
  );
};

PhoneNumberField.displayName = "PhoneNumberField";
export default PhoneNumberField;
