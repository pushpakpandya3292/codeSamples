import { FormHelperText } from "@mui/material";
import { ReactNode } from "react";

export const fieldValidation = (touched: any, errors: any, name: string) => {
  const values: {
    error: boolean;
    helperText?: ReactNode;
  } = {
    error: !!errors[name] && !!touched[name],
  };
  if (!!errors[name] && !!touched[name]) {
    values.helperText = errors[name];
  }
  return values;
};

export const formHelperText = (touched: any, errors: any, name: string) => {
  const showError = !!errors[name] && !!touched[name]
  return (
    <>
      {showError &&
        <FormHelperText error={showError}>
          {errors[name]}
        </FormHelperText>
      }
    </>
  );
};
