"use client";
import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import PasswordTextField from "@/components/Common/PasswordTextField";
import GoogleButtonOauth from "@/components/Onboarding/GoogleButtonOauth";
import { app } from "@/firebase";
import { fieldValidation } from "@/utils/fieldValidation";
import { firebaseError } from "@/utils/firebaseErrors";
import { useToast } from "@/utils/toast";
import { emailValidation, passwordValidation } from "@/utils/validationSchemas";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import {
  User as FirebaseUser,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFormik } from "formik";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import * as Yup from "yup";
import { NextLinkComposed } from "../Mui/Link";

const validationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

interface Props {
  redirectUri: string;
  client: { logo: string; name: string };
}

const OauthLoginForm = ({ redirectUri, client }: Props) => {
  const auth = getAuth(app);
  const search = useSearchParams();
  const client_id = search.get("client_id");
  const redirect_uri = search.get("redirect_uri");

  const { showToast } = useToast();

  const { values, handleSubmit, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        email: search.get("email") || "",
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
          const response: AxiosResponse<{ code: string; redirectUri: string }> =
            await api.post(
              `/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`,
              { token }
            );
          if (response.status === 200) {
            window.location.href = `${response.data.redirectUri}?code=${response.data.code}`;
          } else {
            showToast("error", `${response.status}: ${response.data}`);
          }
        }
      },
    });

  return (
    <>
      <Stack direction="row" alignItems="center" gap={2}>
        <Image
          src={client.logo}
          alt="logo"
          width={42}
          height={42}
          style={{
            objectFit: "contain",
          }}
        />
        <Typography variant="headlinesm" color="var(--text-title)">
          {client.name}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography variant="headlinelg">Login</Typography>
        <Typography>Sign in to your Goatmentor Account</Typography>
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
            to={`/oauth/forgot-password${location.search}`}>
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
            to={`/oauth/register${location.search}`}
            variant="text"
            size="large">
            Signup
          </Button>
        </Typography>
        <GoogleButtonOauth>Login With Google</GoogleButtonOauth>
      </Stack>
    </>
  );
};

export default OauthLoginForm;
