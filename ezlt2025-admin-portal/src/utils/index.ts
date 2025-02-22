import * as Yup from "yup";

export function formatDate(dateString: any) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-US");
}

export const emailValidation = Yup.string()
  .email("Invalid email")
  .required("Email is required")
  .test("email-domain", "Invalid email", (value) => {
    if (!value) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  });

export const phoneValidation = Yup.string().optional().nullable();
export const requiredString = (message: string = "This field is required") =>
  Yup.string()
    .matches(
      /^[A-Za-z\s\_\-\&\(\)\']*$/,
      "Only letters, spaces, and special characters (_-&'()).",
    )
    .required(message);

export const experienceValidation = Yup.number()
  .transform((value, originalValue) =>
    typeof originalValue === "string" && originalValue.trim() === ""
      ? undefined
      : value,
  )
  .positive("Experience should be a positive number")
  .integer("Experience should be a whole number")
  .min(0, "Experience should be at least 0 Years")
  .max(5, "Experience should not be more than 5 Years")
  .optional();

export const allowOnlyText = (value: string): string => {
  return value.replace(/[^a-zA-Z\s]/g, "");
};
