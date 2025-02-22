"use client";
import { api } from "@/axios";
import CountryTextField from "@/components/Common/CountryTextfield";
import LoadingButton from "@/components/Common/LoadingButton";
import PhoneTextField from "@/components/Common/PhoneTextField";
import UpdateProfilePhoto from "@/components/Common/UpdatePhoto";
import { setUser } from "@/store/user";
import { fieldValidation } from "@/utils/fieldValidation";
import firebaseUpload from "@/utils/firebaseUpload";
import { useToast } from "@/utils/toast";
import { faPartyHorn } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { AxiosResponse } from "axios";

import { User as FirebaseUser } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Onboarding = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser>();

  const router = useRouter();
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
      phone: null,
      linkedin: null,
      country: null,
      phoneCountry: null,
      photo: firebaseUser?.photoURL ?? null,
      ...(!!firebaseUser?.displayName && {
        fullName: firebaseUser?.displayName,
      }),
    },
    enableReinitialize: true,
    async onSubmit(values, formikHelpers) {
      if (values.photo !== firebaseUser?.photoURL && values.photo) {
        const storage = getStorage();
        // @ts-ignore
        const file: File = values.photo;
        const ext = file?.name.split(".").pop();
        const profileRef = ref(
          storage,
          `users/${firebaseUser?.uid ?? Date.now()}.${ext ?? "jpg"}`
        );
        values.photo = await firebaseUpload(profileRef, file);
      }
      const response: AxiosResponse<{ user: User }> = await api.patch(
        "/api/user",
        values
      );
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        showToast("success", "Profile Updated successfuly");
        router.push("/dashboard");
        localStorage.removeItem("firebaseUser");
      }
    },
  });

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("firebaseUser") ?? "{}"
    ) as FirebaseUser;
    setFirebaseUser(userData);
    if (!Object.keys(userData).length) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <IconButton
        color="primary"
        sx={{
          alignSelf: "flex-start",
          padding: `1rem`,
          aspectRatio: 1,
        }}>
        <FontAwesomeIcon icon={faPartyHorn} size="2x" />
      </IconButton>
      <Stack gap={1}>
        <Typography variant="headlinelg">Welcome To Goatmentor</Typography>
        <Typography>
          Complete your profile by sharing some basic info.
        </Typography>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={2}>
        <UpdateProfilePhoto
          initialPhoto={values.photo}
          size={100}
          sx={{ paddingBottom: 1 }}
          setFieldValue={setFieldValue}
        />
        {!!firebaseUser?.displayName && (
          <TextField
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            {...fieldValidation(touched, errors, "fullName")}
          />
        )}
        <PhoneTextField
          name="phone"
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
          set={(e) => setFieldValue("country", e)}
          {...fieldValidation(touched, errors, "country")}
        />

        <LoadingButton
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}>
          Complete Profile
        </LoadingButton>
      </Stack>
    </>
  );
};

export default Onboarding;
