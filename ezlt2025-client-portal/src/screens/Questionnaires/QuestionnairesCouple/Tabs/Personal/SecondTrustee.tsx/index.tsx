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
import CustomeDateTimePicker, {
  renderDateFieldProps,
} from "@/components/CustomDateTimePicker";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import PhoneNumberField from "@/components/PhoneTextField/PhoneTextField";
import { CitizenShipEnum, EmploymentStatusEnum } from "../../../constants";

const SecondTrustee: React.FC = () => {
  const [fieldsDisabled, setFieldsDisabled] = React.useState(true);
  const { control, watch, setValue } = useFormContext();

  const handleFieldsDisabled = (value: boolean) => {
    setFieldsDisabled(value);
    setValue("primary_trustee_is_editing", !fieldsDisabled);
  };
  useEffect(() => {
    setValue("secondary_trustee_county", watch("secondary_trustee_address")?.administrativeAreaLevelTwo)
  }, [watch("secondary_trustee_address")])
  return (
    <>
      <Grid columnSpacing={2} container>
        <Grid item xs={12} md={6}>
          <BoxWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">
                Legal Name (Secondary Trustee)
              </Typography>
              {fieldsDisabled ? (
                <Box
                  sx={{
                    height: "26px",
                    width: "26px",
                    background: (theme) => theme.additionalColors?.lightBlue,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleFieldsDisabled(false)}
                >
                  <Image src={Edit} alt="edit" />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      height: "26px",
                      width: "26px",
                      background: (theme) =>
                        theme.additionalColors?.button.cancelbg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleFieldsDisabled(true)}
                  >
                    <Image src={Cross} alt="edit" />
                  </Box>
                  <Box
                    sx={{
                      height: "26px",
                      width: "26px",
                      background: (theme) => theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleFieldsDisabled(true)}
                  >
                    <Image src={Check} alt="edit" />
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                display: "flex",
              }}
            >
              <Controller
                name={"secondary_trustee_first_name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    disabled={fieldsDisabled}
                    label={"First Name"}
                    sx={{
                      flexBasis: { xs: "100%", md: "48%" },
                    }}
                  />
                )}
              />
              <Controller
                name={"secondary_trustee_middle_name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    disabled={fieldsDisabled}
                    label={"Middle Name"}
                    sx={{
                      flexBasis: { xs: "100%", md: "48%" },
                    }}
                  />
                )}
              />
              <Controller
                name={"secondary_trustee_last_name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    disabled={fieldsDisabled}
                    label={"Last Name"}
                    sx={{
                      flexBasis: { xs: "100%", md: "48%" },
                    }}
                  />
                )}
              />
              <Controller
                name={"secondary_trustee_email"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    disabled={fieldsDisabled}
                    label={"Email"}
                    sx={{
                      flexBasis: { xs: "100%", md: "48%" },
                    }}
                  />
                )}
              />
            </Box>
          </BoxWrapper>
        </Grid>{" "}
        <Grid xs={12} md={6} item>
          <BoxWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography variant="h3">Personal Information</Typography>
            <Grid container rowSpacing={3} columnSpacing={1}>
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
              <Grid xs={12} md={6} item>
                <Controller
                  name={"secondary_trustee_county"}
                  control={control}
                  defaultValue={watch("secondary_trustee_address")?.administrativeAreaLevelTwo}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      // disabled={fieldsDisabled}
                      label={"County"}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={6} item>
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
              <Grid xs={12} md={6} item>
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
              <Grid xs={12} md={6} item>
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
              <Grid xs={12} md={6} item>
                <Controller
                  name={"secondary_trustee_empolyment_status"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      label={"Employment Status"}
                      select
                    >
                      {(
                        Object.keys(EmploymentStatusEnum) as Array<
                          keyof typeof EmploymentStatusEnum
                        >
                      ).map((key) => {
                        return (
                          <MenuItem key={key} value={key}>
                            {EmploymentStatusEnum[key]}
                          </MenuItem>
                        );
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <Controller
                  name={"secondary_trustee_estimated_annual_income"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      value={field.value}
                      {...renderFieldProps(error)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (parseInt(e.target.value)) {
                          setValue(
                            "secondary_trustee_estimated_annual_income",
                            `${parseInt(
                              e.target.value.replaceAll(",", ""),
                            ).toLocaleString()}`,
                          );
                        } else if (e.target.value === "") {
                          setValue(
                            "secondary_trustee_estimated_annual_income",
                            `0`,
                          );
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      label={"Estimated Annual Income"}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </BoxWrapper>
        </Grid>
      </Grid>
    </>
  );
};

export default SecondTrustee;
