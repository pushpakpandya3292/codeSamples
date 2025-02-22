"use client";

import { api } from "@/axios";
import LoadingButton from "@/components/Common/LoadingButton";
import UpdatePhoto from "@/components/Common/UpdatePhoto";
import { fieldValidation } from "@/utils/fieldValidation";
import firebaseUpload from "@/utils/firebaseUpload";
import { useToast } from "@/utils/toast";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { SsoApp } from "@prisma/client";
import { AxiosResponse } from "axios";
import { getStorage, ref } from "firebase/storage";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import { AutocompleteTextField } from "../Mui/overrides/Autocomplete";
import AppPreview from "./SSOAppPreview";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("A name is required")
    .max(24, "The name should be less than 24 characters"),
  redirectUris: Yup.array().of(Yup.string().url("Please enter a valid url")),
});

const SSOAppForm = ({ update }: { update?: SsoApp }) => {
  const router = useRouter();
  const { showToast } = useToast();

  const [appPreview, setAppPreview] = useState<SsoApp>();
  const closeAppPreview = () => setAppPreview(undefined);

  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const openDeleteConfirmation = () => setDeleteConfirmation(true);
  const closeDeleteConfirmation = () => setDeleteConfirmation(false);

  const deleteApp = async () => {
    setDeleting(true);
    const response: AxiosResponse<{ app: SsoApp }> = await api.delete(
      `/api/apps/${update?.clientId}`
    );
    if (response.status === 200) {
      showToast("success", "App deleted successfuly");
      router.push("/admin/apps");
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
      name: update?.name ?? "",
      redirectUris: update?.redirectUris ?? [],
      logo: update?.logo ?? "",
    },
    validationSchema,
    async onSubmit(values, formikHelpers) {
      if (!values.logo) {
        showToast("error", "App logo is required");
        return;
      }
      if (values.logo !== update?.logo && values.logo) {
        const storage = getStorage();
        // @ts-ignore
        const file: File = values.logo;
        if (file?.name) {
          const ext = file?.name.split(".").pop();
          const logoRef = ref(storage, `apps/${Date.now()}.${ext ?? "jpg"}`);
          values.logo = await firebaseUpload(logoRef, file);
        }
      }

      if (update) {
        const response: AxiosResponse<{ app: SsoApp }> = await api.patch(
          "/api/apps",
          { clientId: update.clientId, ...values }
        );
        if (response.status === 200) {
          showToast("success", "App Updated successfully");
          router.push("/admin/apps");
        }
      } else {
        const response: AxiosResponse<{ app: SsoApp }> = await api.post(
          "/api/apps",
          { ...values }
        );
        if (response.status === 201) {
          showToast("success", "App Created successfully");
          setAppPreview(response.data.app);
          // router.push(`/admin/apps/${response.data.app.clientId}`);
        }
      }
    },
  });

  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <Typography variant="headlinelg" color="var(--text-title)">
          {Boolean(update) ? "Update SSO App" : "Create SSO App"}
        </Typography>
        <Typography variant="labellg">
          Create or update an App for GoatGate SSO
        </Typography>
        <Typography variant="labellg" color="var(--text-primary)">
          All Fields are Required
        </Typography>
      </Stack>

      <Stack component="form" onSubmit={handleSubmit} gap={{ xs: 2, sm: 3 }}>
        <UpdatePhoto
          initialPhoto={update?.logo}
          size={120}
          name="logo"
          label="Logo"
          borderRadius="0"
          objectFit="contain"
          justifyContent="flex-start"
          gap={4}
          setFieldValue={setFieldValue}
        />

        <TextField
          label="App Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          {...fieldValidation(touched, errors, "name")}
        />

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={values.redirectUris}
          onChange={(e, value) => setFieldValue("redirectUris", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Valid Redirect Uris"
              placeholder="Type to add redirect uris"
              {...fieldValidation(touched, errors, "redirectUris")}
              sx={{
                ...AutocompleteTextField,
              }}
            />
          )}
        />

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          size="large">
          {Boolean(update) ? "Update App" : "Create App"}
        </LoadingButton>
      </Stack>
      {Boolean(update) && (
        <LoadingButton
          variant="contained"
          size="large"
          loading={deleting}
          color="error"
          onClick={openDeleteConfirmation}>
          Delete App
        </LoadingButton>
      )}
      {Boolean(update) && (
        <ConfirmationDialog
          open={deleteConfirmation}
          handleClose={closeDeleteConfirmation}
          confirm={deleteApp}
          title="Delete This App?"
          description="This action cannot be undone. This will permanently delete the app and GoatGate SSO will no longer work for this app."
        />
      )}
      {!!appPreview && (
        <AppPreview
          app={appPreview}
          open={!!appPreview}
          handleClose={closeAppPreview}
        />
      )}
    </Stack>
  );
};

export default SSOAppForm;
