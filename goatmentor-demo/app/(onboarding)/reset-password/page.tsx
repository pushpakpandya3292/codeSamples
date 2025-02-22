"use client";
import LoadingButton from "@/components/Common/LoadingButton";
import PasswordTextField from "@/components/Common/PasswordTextField";
import { NextLinkComposed } from "@/components/Mui/Link";
import { app } from "@/firebase";
import { fieldValidation } from "@/utils/fieldValidation";
import { firebaseError } from "@/utils/firebaseErrors";
import { useToast } from "@/utils/toast";
import { passwordValidation } from "@/utils/validationSchemas";
import { faArrowLeft, faFingerprint } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  password: passwordValidation,
  passwordConfirmation: passwordValidation,
});

const ResetPassword = () => {
  const auth = getAuth(app);

  const router = useRouter();
  const params = useSearchParams();
  const { showToast } = useToast();

  const continueUrl = params.get("continueUrl");

  const { values, handleSubmit, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        password: "",
        passwordConfirmation: "",
      },
      validationSchema,
      async onSubmit(values, formikHelpers) {
        if (values.password !== values.passwordConfirmation) {
          formikHelpers.setErrors({
            passwordConfirmation: "Passwords do not match",
          });
          return;
        }
        await confirmPasswordReset(
          auth,
          params.get("oobCode") as string,
          values.password
        )
          .then(() => {
            showToast("success", "Password Reset Successful");
            if (continueUrl) {
              router.push(continueUrl);
            } else {
              router.push("/login");
            }
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
          aspectRatio: 1,
        }}>
        <FontAwesomeIcon icon={faFingerprint} size="2x" />
      </IconButton>
      <Stack gap={1}>
        <Typography variant="headlinelg">Set a new Password</Typography>
        <Typography>Must be at least 8 characters long</Typography>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={2}>
        <PasswordTextField
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "password")}
        />
        <PasswordTextField
          label="Confirm Password"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "passwordConfirmation")}
        />
        <LoadingButton
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}>
          Reset Password
        </LoadingButton>
        <Button
          variant="text"
          size="large"
          component={NextLinkComposed}
          to={continueUrl ?? "/login"}
          startIcon={
            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "1rem" }} />
          }>
          Back to Login
        </Button>
      </Stack>
    </>
  );
};

export default ResetPassword;
