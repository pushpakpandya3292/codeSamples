"use client";
import { api } from "@/axios";
import { fieldValidation } from "@/utils/fieldValidation";
import { useToast } from "@/utils/toast";
import { emailValidation } from "@/utils/validationSchemas";
import { Stack, TextField } from "@mui/material";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "../Common/LoadingButton";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: emailValidation,
  message: Yup.string().required("Message is required"),
});

const ContactUsForm = () => {
  const { showToast } = useToast();

  const { values, handleSubmit, isSubmitting, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        message: "",
      },
      validationSchema,
      onSubmit: async () => {
        const response: AxiosResponse<{ message: string }> = await api.post(
          "/api/contact",
          values
        );
        if (response.status === 200) {
          showToast("success", response.data.message);
        } else {
          showToast("error", response.data.message);
        }
      },
    });

  return (
    <Stack component="form" onSubmit={handleSubmit} gap={2}>
      <Stack direction="row" gap={2}>
        <TextField
          label="First Name"
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "firstname")}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={values.lastname}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "lastname")}
          sx={{ flex: 1 }}
        />
      </Stack>
      <TextField
        label="Email Address"
        name="email"
        value={values.email}
        onChange={handleChange}
        {...fieldValidation(touched, errors, "email")}
      />
      <TextField
        label="Message"
        multiline
        rows={5}
        name="message"
        value={values.message}
        onChange={handleChange}
        {...fieldValidation(touched, errors, "message")}
      />
      <LoadingButton
        loading={isSubmitting}
        type="submit"
        variant="contained"
        size="large">
        Submit
      </LoadingButton>
    </Stack>
  );
};

export default ContactUsForm;
