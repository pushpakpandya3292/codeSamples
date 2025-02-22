"use client";
import { api } from "@/axios";
import { fieldValidation } from "@/utils/fieldValidation";
import { useToast } from "@/utils/toast";
import { emailValidation } from "@/utils/validationSchemas";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "../Common/LoadingButton";

interface Props {
  description?: string;
  padding?: boolean;
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: emailValidation,
});

const NewsLetter = ({ description, padding = true }: Props) => {
  const { showToast } = useToast();

  const { values, handleSubmit, isSubmitting, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
      },
      validationSchema,
      onSubmit: async () => {
        const response: AxiosResponse<{ message: string }> = await api.post(
          "/marketing/video",
          {
            email: values.email,
            fullname: `${values.firstname} ${values.lastname}`,
          }
        );
        if (response.status === 200) {
          showToast("success", response.data.message);
        } else {
          showToast("error", response.data.message);
        }
      },
    });

  return (
    <Box className="wrapper" id="discount">
      <Stack
        alignItems="center"
        component="section"
        bgcolor="var(--surface-secondary)"
        gap={3}
        sx={{
          textAlign: "center",
          marginBlock: { xs: "1rem 3rem", md: "3rem 5rem" },
          marginInline: { xs: padding ? 2 : 0, sm: 2, lg: 10 },
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--primary-shadow)",
          padding: { xs: "2rem 1.5rem 1rem", lg: "3rem 6rem" },
        }}>
        <Typography variant="displaymd" color="var(--text-title)">
          Claim Your Gift
        </Typography>
        <Typography variant="headlinesm" sx={{ maxWidth: "740px" }}>
          {description ??
            "Leave your email to receive a free CEO video with IT career tips and a discount code for our IT internship application's introduction course."}
        </Typography>

        <Stack
          component="form"
          id="newsletter-form"
          onSubmit={handleSubmit}
          gap={2}
          sx={{ width: "100%", maxWidth: "600px", marginTop: 1 }}>
          <Stack direction="row" gap={2}>
            <TextField
              label="First Name"
              name="firstname"
              id="firstname"
              sx={{ flex: 1 }}
              value={values.firstname}
              onChange={handleChange}
              {...fieldValidation(touched, errors, "firstname")}
            />
            <TextField
              label="Last Name"
              name="lastname"
              id="lastname"
              sx={{ flex: 1 }}
              value={values.lastname}
              onChange={handleChange}
              {...fieldValidation(touched, errors, "lastname")}
            />
          </Stack>
          <TextField
            label="Email Address"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            {...fieldValidation(touched, errors, "email")}
          />
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            size="large">
            Submit
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewsLetter;
