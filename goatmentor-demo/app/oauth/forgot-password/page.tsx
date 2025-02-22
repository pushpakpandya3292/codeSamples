"use client";

import LoadingButton from "@/components/Common/LoadingButton";
import { NextLinkComposed } from "@/components/Mui/Link";
import { app } from "@/firebase";
import { fieldValidation } from "@/utils/fieldValidation";
import { firebaseError } from "@/utils/firebaseErrors";
import { useToast } from "@/utils/toast";
import { emailValidation } from "@/utils/validationSchemas";
import { faArrowLeft, faLockKeyhole } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: emailValidation,
});

const ForgotPassword = () => {
  const auth = getAuth(app);
  const search = useSearchParams();
  const client_id = search.get("client_id");
  const redirect_uri = search.get("redirect_uri");

  const router = useRouter();
  const { showToast } = useToast();

  const { values, handleSubmit, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema,
      async onSubmit(values, formikHelpers) {
        await sendPasswordResetEmail(auth, values.email, {
          url: `${window.location.origin}/oauth/login?client_id=${client_id}&redirect_uri=${redirect_uri}`,
        })
          .then(() => {
            localStorage.setItem("recoveryEmail", values.email);
            router.push(`/oauth/recover-account${location.search}`);
          })
          .catch((error) => {
            showToast("error", firebaseError(error.code));
          });
      },
    });

  return (
    <>
      <IconButton
        color="secondary"
        sx={{
          alignSelf: "flex-start",
          padding: `1rem`,
          // paddingLeft: `${scale * 1.25}rem`,
          marginTop: "1rem",
          aspectRatio: 1,
        }}>
        <FontAwesomeIcon icon={faLockKeyhole} size="xl" />
      </IconButton>
      <Stack gap={1}>
        <Typography variant="headlinelg">Forgot Password</Typography>
        <Typography>Enter your email to recover your account</Typography>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={2}>
        <TextField
          label="Email Address"
          name="email"
          value={values.email}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "email")}
        />
        <LoadingButton
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}>
          Continue
        </LoadingButton>
        <Button
          variant="text"
          size="large"
          component={NextLinkComposed}
          to={`/oauth/login${location.search}`}
          startIcon={
            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "1rem" }} />
          }>
          Back to Login
        </Button>
      </Stack>
    </>
  );
};

export default ForgotPassword;
