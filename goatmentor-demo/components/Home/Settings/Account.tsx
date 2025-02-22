import { api } from "@/axios";
import CountryTextField from "@/components/Common/CountryTextfield";
import LoadingButton from "@/components/Common/LoadingButton";
import PhoneTextField from "@/components/Common/PhoneTextField";
import UpdateProfilePhoto from "@/components/Common/UpdatePhoto";
import { RootState } from "@/store";
import { setUser } from "@/store/user";
import { fieldValidation } from "@/utils/fieldValidation";
import firebaseUpload from "@/utils/firebaseUpload";
import { useToast } from "@/utils/toast";
import { Stack, TextField } from "@mui/material";
import { User } from "@prisma/client";
import { AxiosResponse } from "axios";
import { getStorage, ref } from "firebase/storage";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Your full name is required"),
  linkedin: Yup.string().matches(
    /^[A-z0-9_-]+$/,
    "Provide linkedin username, not the full URL"
  ),
});

const AccountInformation = () => {
  const user = useSelector((state: RootState) => state.user);

  const { showToast } = useToast();
  const dispatch = useDispatch();

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: user.fullName,
      phone: user.phone,
      phoneCountry: user.phoneCountry,
      linkedin: user.linkedin,
      country: user.country,
      photo: user.photo,
    },
    enableReinitialize: true,
    validationSchema,
    async onSubmit(values, formikHelpers) {
      if (values.photo !== user.photo && values.photo) {
        const storage = getStorage();
        // @ts-ignore
        const file: File = values.photo;
        if (file?.name) {
          const ext = file?.name.split(".").pop();
          const profileRef = ref(storage, `users/${user.uid}.${ext ?? "jpg"}`);
          values.photo = await firebaseUpload(profileRef, file);
        }
      }
      const response: AxiosResponse<{ user: User }> = await api.patch(
        "/api/user",
        values
      );
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        showToast("success", "Profile Updated successfuly");
      }
    },
  });
  return (
    <Stack component="form" onSubmit={handleSubmit} gap={2}>
      <UpdateProfilePhoto
        initialPhoto={user.photo}
        size={120}
        justifyContent="center"
        setFieldValue={setFieldValue}
      />

      <TextField
        label="Full Name"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        {...fieldValidation(touched, errors, "fullName")}
      />
      <PhoneTextField
        name="phone"
        defaultValue={values.phone}
        defaultCountry={values.phoneCountry}
        set={(phone, phoneCountry) => {
          setFieldValue("phone", phone);
          setFieldValue("phoneCountry", phoneCountry);
        }}
        {...fieldValidation(touched, errors, "phone")}
      />
      <TextField
        label="LinkedIn Username"
        name="linkedin"
        value={values.linkedin}
        onChange={handleChange}
        {...fieldValidation(touched, errors, "linkedin")}
      />
      <CountryTextField
        name="country"
        defaultValue={values.country}
        set={(e) => setFieldValue("country", e)}
        {...fieldValidation(touched, errors, "country")}
      />
      <LoadingButton
        variant="contained"
        loading={isSubmitting}
        type="submit"
        size="large">
        Update
      </LoadingButton>
    </Stack>
  );
};

export default AccountInformation;
