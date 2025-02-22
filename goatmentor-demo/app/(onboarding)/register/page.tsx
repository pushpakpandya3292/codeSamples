"use client";
import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import PasswordTextField from "@/components/Common/PasswordTextField";
import { NextLinkComposed } from "@/components/Mui/Link";
import GoogleButton from "@/components/Onboarding/GoogleButton";
import { app } from "@/firebase";
import { setUser } from "@/store/user";
import { fieldValidation } from "@/utils/fieldValidation";
import { firebaseError } from "@/utils/firebaseErrors";
import { logGaEvent } from "@/utils/googleAnalytics";
import { useToast } from "@/utils/toast";
import { emailValidation, passwordValidation } from "@/utils/validationSchemas";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { AxiosResponse } from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: emailValidation,
  password: passwordValidation,
});

const RegisterPage = () => {
  const auth = getAuth(app);

  const router = useRouter();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const { values, handleSubmit, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
      },
      validationSchema,
      async onSubmit(values, formikHelpers) {
        const user = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then((userCredential) => {
            return userCredential.user;
          })
          .catch((error) => {
            showToast("error", firebaseError(error.code));
          });
        if (user) {
          // User Created
          const token = await user.getIdToken(true);
          await api.post("/session", { token });
          const response: AxiosResponse<{ user: User }> = await api.post(
            "/api/user",
            {
              fullName: values.fullName,
              email: values.email,
            }
          );
          if (response.status === 201) {
            try {
              logGaEvent("event", {
                action: "click",
                category: "button",
                label: "RegisterPage: User registered",
              });
            } catch (e) {
              console.log(e);
            }
            localStorage.setItem("firebaseUser", JSON.stringify(user));
            dispatch(setUser(response.data.user));
            showToast("success", "User Created successfuly");
            window.location.href = "/onboarding";
          }
        }
      },
    });

  return (
    <>
      <Stack>
        <Typography variant="headlinelg">Join With Us</Typography>
        <Typography>Kickstart your tech journey</Typography>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={2}>
        <TextField
          label="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "fullName")}
        />
        <TextField
          label="Email Address"
          name="email"
          value={values.email}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "email")}
        />
        <PasswordTextField
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "password")}
        />
        <LoadingButton
          variant="contained"
          loading={isSubmitting}
          size="large"
          type="submit">
          Signup
        </LoadingButton>
      </Stack>
      <Stack gap={2}>
        <Divider>or</Divider>
        <Typography variant="labellg" textAlign="center">
          Already have an account?{" "}
          <Button
            component={NextLinkComposed}
            to="/login"
            variant="text"
            size="large">
            Login
          </Button>
        </Typography>
        <GoogleButton>Signup With Google</GoogleButton>
      </Stack>
    </>
  );
};

export default RegisterPage;
