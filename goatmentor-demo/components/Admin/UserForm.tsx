"use client";
import { api } from "@/axios";
import CountryTextField from "@/components/Common/CountryTextfield";
import LoadingButton from "@/components/Common/LoadingButton";
import PhoneTextField from "@/components/Common/PhoneTextField";
import UpdateProfilePhoto from "@/components/Common/UpdatePhoto";
import { ROLES } from "@/prisma/constants";
import { fieldValidation } from "@/utils/fieldValidation";
import firebaseUpload from "@/utils/firebaseUpload";
import { useToast } from "@/utils/toast";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { AxiosResponse } from "axios";
import { getStorage, ref } from "firebase/storage";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import { AutocompleteTextField } from "../Mui/overrides/Autocomplete";

interface Props {
  user: User;
}

const UserForm = ({ user }: Props) => {
  const { showToast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const openDeleteConfirmation = () => setDeleteConfirmation(true);
  const closeDeleteConfirmation = () => setDeleteConfirmation(false);

  const [deleting, setDeleting] = useState(false);

  const deleteUser = async () => {
    setDeleting(true);
    const response: AxiosResponse<{ user: User }> = await api.delete(
      `/api/user/${user.uid}`
    );
    if (response.status === 200) {
      showToast("success", "User deleted successfuly");
      router.push("/admin/users");
    }
    setDeleting(false);
  };

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
      roles: user.roles,
    },
    enableReinitialize: true,
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
        `/api/user/${user.uid}`,
        values
      );
      if (response.status === 200) {
        showToast("success", "Profile Updated successfuly");
        router.push("/admin/users");
      }
    },
  });
  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <Typography variant="headlinelg" color="var(--text-title)">
          Update User
        </Typography>
        <Typography variant="labellg">
          Update or delete user, and assign them permissions
        </Typography>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit} gap={2}>
        <UpdateProfilePhoto
          initialPhoto={user.photo}
          size={120}
          justifyContent="flex-start"
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
        <Autocomplete
          multiple
          options={ROLES}
          value={values.roles}
          onChange={(e, value) => setFieldValue("roles", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Roles"
              placeholder="Type to search roles"
              {...fieldValidation(touched, errors, "roles")}
              sx={{
                ...AutocompleteTextField,
              }}
            />
          )}
        />
        <LoadingButton
          variant="contained"
          loading={isSubmitting}
          type="submit"
          size="large">
          Update
        </LoadingButton>
      </Stack>
      <LoadingButton
        variant="contained"
        size="large"
        loading={deleting}
        color="error"
        onClick={openDeleteConfirmation}>
        Delete User
      </LoadingButton>
      <ConfirmationDialog
        open={deleteConfirmation}
        handleClose={closeDeleteConfirmation}
        confirm={deleteUser}
        title="Delete This User?"
        description="This action cannot be undone. This will permanently delete the user and all their data."
      />
    </Stack>
  );
};

export default UserForm;
