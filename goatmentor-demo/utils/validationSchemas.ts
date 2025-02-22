import * as Yup from "yup";

export const emailValidation = Yup.string()
  .required("Email Address is required")
  .email("Enter a valid email");

export const passwordValidation = Yup.string()
  .required("Password is required")
  .min(6, "A password should be more than 6 characters");
