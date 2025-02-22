import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import PasswordTextField from "@/components/Common/PasswordTextField";
import { app } from "@/firebase";
import { RootState } from "@/store";
import { fieldValidation } from "@/utils/fieldValidation";
import { firebaseError } from "@/utils/firebaseErrors";
import { useToast } from "@/utils/toast";
import { passwordValidation } from "@/utils/validationSchemas";
import { Stack } from "@mui/material";
import {
  User as FirebaseUser,
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
  confirmPassword: passwordValidation,
});

const SecuritySettings = () => {
  const auth = getAuth(app);

  const user = useSelector((state: RootState) => state.user);
  const { showToast } = useToast();

  const { values, handleSubmit, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema,
      async onSubmit(values, formikHelpers) {
        if (values.newPassword !== values.confirmPassword) {
          formikHelpers.setErrors({
            confirmPassword: "Passwords do not match",
          });
          return;
        }
        const loggedUser: FirebaseUser | void =
          await signInWithEmailAndPassword(
            auth,
            user.email,
            values.currentPassword
          )
            .then((userCredential) => {
              return userCredential.user;
            })
            .catch((error) => {
              if (error.code === "auth/wrong-password") {
                showToast("error", "Wrong Current Password");
                return;
              }
              showToast("error", firebaseError(error.code));
            });
        if (loggedUser) {
          await updatePassword(loggedUser, values.newPassword)
            .then(async () => {
              const token = await loggedUser.getIdToken(true);
              await api.post("/session", { token });
              showToast("success", "Password Updated Successfully");
              formikHelpers.resetForm();
            })
            .catch((error) => {
              showToast("error", firebaseError(error.code));
            });
        }
      },
    });
  return (
    <Stack component="form" onSubmit={handleSubmit} gap={2}>
      <PasswordTextField
        label="Current Password"
        name="currentPassword"
        value={values.currentPassword}
        onChange={handleChange}
        {...fieldValidation(touched, errors, "currentPassword")}
      />
      <PasswordTextField
        label="New Password"
        name="newPassword"
        value={values.newPassword}
        onChange={handleChange}
        {...fieldValidation(touched, errors, "newPassword")}
      />
      <PasswordTextField
        label="Confirm Password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        {...fieldValidation(touched, errors, "confirmPassword")}
      />
      <LoadingButton
        variant="contained"
        size="large"
        type="submit"
        loading={isSubmitting}>
        Update
      </LoadingButton>
    </Stack>
  );
};

export default SecuritySettings;
