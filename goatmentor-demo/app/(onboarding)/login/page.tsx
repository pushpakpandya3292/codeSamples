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
import { useToast } from "@/utils/toast";
import { emailValidation, passwordValidation } from "@/utils/validationSchemas";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { AxiosResponse } from "axios";
import {
  User as FirebaseUser,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

const LoginPage = () => {
  const auth = getAuth(app);

  const { showToast } = useToast();
  const dispatch = useDispatch();

  const search = useSearchParams();

  const { values, handleSubmit, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      async onSubmit(values, formikHelpers) {
        const user: FirebaseUser | void = await signInWithEmailAndPassword(
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
          // Login Successful
          const token = await user.getIdToken(true);
          await api.post("/session", { token });
          const response: AxiosResponse<{ user: User }> = await api.get(
            "/api/user"
          );
          if (response.status === 200) {
            dispatch(setUser(response.data.user));
            const redirect = search.get("redirect");
            window.location.href = redirect || "/dashboard";
            showToast("success", "Login successful");
          } else if (response.status === 404) {
            const response: AxiosResponse<{ user: User }> = await api.post(
              "/api/user",
              {
                fullName: user.displayName ?? "",
                email: user.email,
              }
            );
            if (response.status === 201) {
              localStorage.setItem("firebaseUser", JSON.stringify(user));
              dispatch(setUser(response.data.user));
              showToast("success", "User Created successfuly");
              window.location.href = "/onboarding";
            }
          }
        }
      },
    });

  return (
    <>
      <Stack>
        <Typography variant="headlinelg">Welcome Back</Typography>
        <Typography>Please enter your credentials</Typography>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={2}>
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
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="text"
            component={NextLinkComposed}
            to="/forgot-password">
            Forgot Password?
          </Button>
        </Stack>
        <LoadingButton
          variant="contained"
          size="large"
          loading={isSubmitting}
          type="submit">
          Login
        </LoadingButton>
      </Stack>
      <Stack gap={2}>
        <Divider>or</Divider>
        <Typography variant="labellg" textAlign="center">
          Don&apos;t have an account?{" "}
          <Button
            component={NextLinkComposed}
            to="/register"
            variant="text"
            size="large">
            Signup
          </Button>
        </Typography>
        <GoogleButton>Login With Google</GoogleButton>
      </Stack>
    </>
  );
};

export default LoginPage;
