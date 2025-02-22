import React, { useEffect } from "react";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import { Box, Grid, InputAdornment, MenuItem, Typography } from "@mui/material";
import Edit from "@/assets/icons/Edit.svg";
import Check from "@/assets/icons/Check.svg";
import Cross from "@/assets/icons/Cross.svg";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CustomeDateTimePicker from "@/components/CustomDateTimePicker";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import { CitizenShipEnum, EmploymentStatusEnum } from "../../../constants";

const PrimaryTrustee: React.FC = () => {
  const [fieldsDisabled, setFieldsDisabled] = React.useState(true);
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    if (
      watch("marriage_status") === "COUPLE" &&
      watch("primary_trustee_last_name") &&
      watch("secondary_trustee_last_name")
    ) {
      setValue(
        "complete_trust_name",
        (watch("primary_trustee_last_name") as string)?.trim()?.toLowerCase() ==
          (watch("secondary_trustee_last_name") as string)
            ?.trim()
            ?.toLowerCase()
          ? `${watch("primary_trustee_last_name")}`
          : `${watch("primary_trustee_last_name")} and ${watch(
              "secondary_trustee_last_name",
            )}`,
      );
    } else if (
      watch("marriage_status") === "SINGLE" &&
      watch("primary_trustee_last_name") &&
      watch("primary_trustee_first_name")
    ) {
      setValue(
        "complete_trust_name",
        `${watch("primary_trustee_first_name")} ${
          watch("primary_trustee_middle_name") || ""
        } ${watch("primary_trustee_last_name")}`,
      );
    }
  }, [
    watch("primary_trustee_last_name"),
    watch("secondary_trustee_last_name"),
  ]);

  useEffect(() => {
    setValue(
      "primary_trustee_county",
      watch("primary_trustee_address")?.administrativeAreaLevelTwo,
    );
  }, [watch("primary_trustee_address")]);

  useEffect(() => {
    setValue(
      "secondary_trustee_county",
      watch("secondary_trustee_address")?.administrativeAreaLevelTwo,
    );
  }, [watch("secondary_trustee_address")]);

  return (
    <>
      <Typography variant="h2">Initial Trustees (Settlor/Owner)</Typography>
      <Typography variant="h5">
        {watch("marriage_status") === "COUPLE"
          ? "The initial Trustees are the people who this Trust is designed to serve. (see tips for more information)"
          : "The initial Trustee is the person who this Trust is designed to serve. (see tips for more information)"}
      </Typography>
      <Grid container sx={{ mt: 1 }} spacing={2}>
        <Grid xs={12} md={6} item>
          <BoxWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography variant="h3">
              Primary Trustee Info{" "}
              {watch("marriage_status") === "COUPLE" ? "(Spouse 1)" : ""}
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={3}>
              <Grid xs={12} item>
                <Controller
                  name={"primary_trustee_first_name"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"First Name"}
                      sx={{
                        flexBasis: { xs: "100%", md: "48%" },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} item>
                <Controller
                  name={"primary_trustee_middle_name"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Middle Name"}
                      sx={{
                        flexBasis: { xs: "100%", md: "48%" },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} item>
                <Controller
                  name={"primary_trustee_last_name"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Last Name"}
                      sx={{
                        flexBasis: { xs: "100%", md: "48%" },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={12} item>
                <Controller
                  name="primary_trustee_address"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <GoogleMaps>
                      <GoogleMaps.AutoComplete
                        {...field}
                        name={"primary_trustee_address"}
                        defaultValue={watch("primary_trustee_address")}
                        onAddressChange={(autoAddress: any) => {
                          setValue("primary_trustee_address", autoAddress);
                          setValue("primary_home_address", autoAddress);
                          setValue("secondary_trustee_address", autoAddress);
                          trigger("primary_trustee_address");
                          trigger("secondary_trustee_address");
                        }}
                        placeholder="Enter your Residence Address"
                      />
                      {error?.message && (
                        <CustomErrorMessage error={error?.message ?? {}} />
                      )}
                    </GoogleMaps>
                  )}
                />
              </Grid>
              <Grid xs={12} item>
                <Controller
                  name={"primary_trustee_county"}
                  control={control}
                  defaultValue={
                    watch("primary_trustee_address")?.administrativeAreaLevelTwo
                  }
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      //
                      label={"County"}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} item>
                <Controller
                  name="primary_trustee_mobile"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <PhoneNumberField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Mobile"}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} item>
                <Controller
                  name={"primary_trustee_email"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Email"}
                      sx={{
                        flexBasis: { xs: "100%", md: "48%" },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} item>
                <Controller
                  name={"primary_trustee_date_of_birth"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomeDateTimePicker
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Date of birth"}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} item>
                <Controller
                  name={"primary_trustee_citizenship"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Citizenship - I am"}
                      select
                    >
                      {(
                        Object.keys(CitizenShipEnum) as Array<
                          keyof typeof CitizenShipEnum
                        >
                      ).map((key) => {
                        return (
                          <MenuItem key={key} value={key}>
                            {CitizenShipEnum[key]}
                          </MenuItem>
                        );
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
            </Grid>
          </BoxWrapper>
        </Grid>
        {watch("marriage_status") === "COUPLE" && (
          <Grid xs={12} md={6} item>
            <BoxWrapper
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography variant="h3">
                Secondary Trustee Info (Spouse 2)
              </Typography>
              <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid xs={12} item>
                  <Controller
                    name={"secondary_trustee_first_name"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"First Name"}
                        sx={{
                          flexBasis: { xs: "100%", md: "48%" },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Controller
                    name={"secondary_trustee_middle_name"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Middle Name"}
                        sx={{
                          flexBasis: { xs: "100%", md: "48%" },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Controller
                    name={"secondary_trustee_last_name"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Last Name"}
                        sx={{
                          flexBasis: { xs: "100%", md: "48%" },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} md={12} item>
                  <Controller
                    name="secondary_trustee_address"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <GoogleMaps>
                        <GoogleMaps.AutoComplete
                          {...field}
                          name={"secondary_trustee_address"}
                          defaultValue={watch("secondary_trustee_address")}
                          onAddressChange={(autoAddress: any) => {
                            setValue("secondary_trustee_address", autoAddress);
                            trigger("secondary_trustee_address");
                          }}
                          placeholder="Enter your Residence Address"
                        />
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </GoogleMaps>
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Controller
                    name={"secondary_trustee_county"}
                    control={control}
                    defaultValue={
                      watch("secondary_trustee_address")
                        ?.administrativeAreaLevelTwo
                    }
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        //
                        label={"County"}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Controller
                    name="secondary_trustee_mobile"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <PhoneNumberField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Mobile"}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Controller
                    name={"secondary_trustee_email"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Email"}
                        sx={{
                          flexBasis: { xs: "100%", md: "48%" },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Controller
                    name={"secondary_trustee_date_of_birth"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomeDateTimePicker
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Date of birth"}
                      />
                    )}
                  />
                </Grid>

                <Grid xs={12} item>
                  <Controller
                    name={"secondary_trustee_citizenship"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Citizenship - I am"}
                        select
                      >
                        {(
                          Object.keys(CitizenShipEnum) as Array<
                            keyof typeof CitizenShipEnum
                          >
                        ).map((key) => {
                          return (
                            <MenuItem key={key} value={key}>
                              {CitizenShipEnum[key]}
                            </MenuItem>
                          );
                        })}
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>
            </BoxWrapper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PrimaryTrustee;
