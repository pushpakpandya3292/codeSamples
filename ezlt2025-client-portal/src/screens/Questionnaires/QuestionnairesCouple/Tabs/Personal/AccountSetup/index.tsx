import { Box, Grid, MenuItem, RadioGroup, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BoxWrapper } from "../../../Styled";
import { Controller, useFormContext } from "react-hook-form";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import {
  CartChoiceEnum,
  endUsers,
  MailingAddressEnum,
  states,
} from "../../../constants";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import CustomeDateTimePicker from "@/components/CustomDateTimePicker";
interface AccountSetupProps {
  // Add any props you need for this component
}

const AccountSetup: React.FC<AccountSetupProps> = () => {
  const { control, watch, setValue } = useFormContext();
  return (
    <Box sx={{ pointerEvents: "none" }}>
      <Typography variant="h2">Setup up a Document</Typography>
      <Grid container spacing={2} mt={1}>
        <Grid xs={12} item>
          <BoxWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography variant="h3">Document Ownership</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Box sx={{ width: { xs: "100%" } }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Who is this Trust Document for ?
                </Typography>
                <Controller
                  name={"end_user"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Box>
                      <RadioGroup {...field}>
                        <Box>
                          <CustomRadioButton
                            value={CartChoiceEnum.SELF as string}
                            label={`This Trust document is for me`}
                          />
                        </Box>
                        <Box>
                          <CustomRadioButton
                            value={CartChoiceEnum.OTHERS as string}
                            label="This Trust document is for somebody else"
                          />
                        </Box>
                      </RadioGroup>
                      {error?.message && (
                        <CustomErrorMessage error={error?.message ?? {}} />
                      )}
                    </Box>
                  )}
                />
                {/* <Controller
                  name={"end_user"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      select
                    >
                      {endUsers.map((el) => (
                        <MenuItem key={el.value} value={el.value}>
                          {el.label}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                /> */}
              </Box>
              {watch("end_user") === CartChoiceEnum.OTHERS && (
                <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: "13px",
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    What is your relationship with this person or couple ?
                  </Typography>
                  <Controller
                    name={"relation_with_end_user"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        sx={{ width: "300px" }}
                        placeholder="Relationship"
                      />
                    )}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      color: (theme) => theme.additionalColors?.orange,
                    }}
                  >
                    E.g. - They are my parents
                  </Typography>
                </Box>
              )}
              {watch("end_user") === CartChoiceEnum.OTHERS && (
                <Box sx={{ width: { xs: "100%" } }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Do you have permission to set up account on their behalf ?
                  </Typography>
                  <Controller
                    name={"is_allowed_by_other"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Box>
                        <RadioGroup {...field}>
                          <Box>
                            <CustomRadioButton value={"yes"} label={`Yes`} />
                          </Box>
                          <Box>
                            <CustomRadioButton value={"no"} label="No" />
                          </Box>
                        </RadioGroup>
                        {error?.message && (
                          <Box
                            sx={{
                              display: "flex",
                              background: "#fce8e8",
                              px: 2,
                              py: 1,
                              width: "fit-content",
                              borderRadius: "10px",
                              gap: 2,
                              mt: 2,
                            }}
                          >
                            <WarningAmberRoundedIcon
                              sx={{ color: "#F44040" }}
                            />
                            <CustomErrorMessage error={error?.message ?? {}} />
                          </Box>
                        )}
                        <Typography
                          variant="h5"
                          sx={{
                            mt: 1,
                            color: (theme) => theme.additionalColors?.orange,
                          }}
                        >
                          NOTE - You are able to help complete multiple
                          questionnaires for other people.
                        </Typography>
                      </Box>
                    )}
                  />
                </Box>
              )}
            </Box>
          </BoxWrapper>
        </Grid>
        {/* Mailing Address fields */}
        {/* <Grid xs={12} item>
          <BoxWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography variant="h3">Mailing Address</Typography>
            <Box>
              <Typography variant="h6">
                Where do you want to ship your document?
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Controller
                  name={"is_mailing_address_for_doc"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Box>
                      <RadioGroup {...field}>
                        <Box>
                          <CustomRadioButton
                            value={MailingAddressEnum.MAILING_ADDRESS as string}
                            label="Same as primary home address"
                          />
                        </Box>
                        <Box>
                          <CustomRadioButton
                            value={
                              MailingAddressEnum.IS_MAILING_ADDRESS as string
                            }
                            label={`I want to add different mailing address`}
                          />
                        </Box>
                      </RadioGroup>
                      {error?.message && (
                        <CustomErrorMessage error={error?.message ?? {}} />
                      )}
                    </Box>
                  )}
                />
                {watch("is_mailing_address_for_doc") ===
                  MailingAddressEnum.IS_MAILING_ADDRESS && (
                  <Controller
                    name={"mailing_address_for_doc"}
                    control={control}
                    render={({ field: field, fieldState: { error } }) => (
                      <Box
                        sx={{
                          mt: 2,
                          width: { xs: "100%", md: "50%" },
                        }}
                      >
                        <GoogleMaps>
                          <GoogleMaps.AutoComplete
                            {...field}
                            name={"mailing_address_for_doc"}
                            defaultValue={watch("mailing_address_for_doc")}
                            onAddressChange={(autoAddress: any) => {
                              setValue("mailing_address_for_doc", autoAddress);
                            }}
                            placeholder="Enter your Address"
                          />
                          {error?.message && (
                            <CustomErrorMessage error={error?.message ?? {}} />
                          )}
                        </GoogleMaps>
                      </Box>
                    )}
                  />
                )}
              </Box>
            </Box>
          </BoxWrapper>
        </Grid> */}
        <Grid xs={12} item>
          <BoxWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography variant="h3">Marital Details</Typography>
            <Box>
              <Typography variant="h4">
                {watch("end_user") === CartChoiceEnum.OTHERS
                  ? "What is the Martial Status for this other person(s) ?"
                  : "What is your Marital Status ?"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Controller
                  name={"marriage_status"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Box>
                      <RadioGroup
                        {...field}
                        onChange={(e) => {
                          setValue("marriage_status", e.target.value);
                          setValue("additional_info", "");
                        }}
                      >
                        <Box>
                          <CustomRadioButton
                            value={"COUPLE"}
                            label={`Couple`}
                          />
                          {watch("marriage_status") === "COUPLE" && (
                            <Controller
                              name={"additional_info"}
                              control={control}
                              render={({
                                field,
                                fieldState: { error: additional_info_error },
                              }) => (
                                <RadioGroup {...field}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                      borderRadius: "10px",
                                      background: "#F5F5F5",
                                      px: 2,
                                      gap: "10px",
                                      my: 2,
                                      flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                      },
                                    }}
                                  >
                                    <CustomRadioButton
                                      value={"LEGALLY_MARRIED"}
                                      label={`Legally Married`}
                                    />
                                    <CustomRadioButton
                                      value={"COMMON_LAW"}
                                      label="Common Law"
                                    />
                                  </Box>
                                  {additional_info_error?.message && (
                                    <CustomErrorMessage
                                      error={
                                        additional_info_error?.message ?? {}
                                      }
                                    />
                                  )}
                                </RadioGroup>
                              )}
                            />
                          )}
                        </Box>
                        <Box>
                          <CustomRadioButton value={"SINGLE"} label="Single" />
                          {watch("marriage_status") === "SINGLE" && (
                            <Controller
                              name={"additional_info"}
                              control={control}
                              render={({
                                field,
                                fieldState: { error: additional_info_error },
                              }) => (
                                <RadioGroup {...field}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                      borderRadius: "10px",
                                      background: "#F5F5F5",
                                      px: 2,
                                      gap: "10px",
                                      my: 2,
                                    }}
                                  >
                                    <CustomRadioButton
                                      value="NEVER_MARRIED"
                                      label="Never Married "
                                    />
                                    <CustomRadioButton
                                      value="WIDOWED"
                                      label="Widowed"
                                    />
                                    <CustomRadioButton
                                      value="DIVORCED"
                                      label="Unmarried (previously married)"
                                    />
                                  </Box>
                                  {additional_info_error?.message && (
                                    <CustomErrorMessage
                                      error={
                                        additional_info_error?.message ?? {}
                                      }
                                    />
                                  )}

                                  {watch("marriage_status") === "SINGLE" &&
                                    watch("additional_info") === "WIDOWED" && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                          flexDirection: {
                                            xs: "column",
                                            md: "row",
                                          },
                                        }}
                                      >
                                        <Controller
                                          name={"died_person"}
                                          control={control}
                                          render={({
                                            field: field_died_person,
                                            fieldState: {
                                              error: died_person_error,
                                            },
                                          }) => (
                                            <CustomTextField
                                              {...field_died_person}
                                              {...renderFieldProps(
                                                died_person_error,
                                              )}
                                              label="Deceased Spouse’s Full Name"
                                            />
                                          )}
                                        />
                                        <Controller
                                          name={"died_person_death_date"}
                                          control={control}
                                          render={({
                                            field: field_died_person_death_date,
                                            fieldState: {
                                              error:
                                                died_person_death_date_error,
                                            },
                                          }) => (
                                            <CustomeDateTimePicker
                                              {...field_died_person_death_date}
                                              {...renderFieldProps(
                                                died_person_death_date_error,
                                              )}
                                              label={"Deceased Death"}
                                            />
                                          )}
                                        />
                                      </Box>
                                    )}
                                  {watch("marriage_status") === "SINGLE" &&
                                    watch("additional_info") === "DIVORCED" && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                          flexDirection: {
                                            xs: "column",
                                            md: "row",
                                          },
                                        }}
                                      >
                                        <Controller
                                          name={"last_married_person"}
                                          control={control}
                                          render={({
                                            field,
                                            fieldState: {
                                              error: last_married_person_error,
                                            },
                                          }) => (
                                            <CustomTextField
                                              {...field}
                                              {...renderFieldProps(
                                                last_married_person_error,
                                              )}
                                              label="Ex-Spouse’s Full Name"
                                            />
                                          )}
                                        />
                                        <Controller
                                          name={
                                            "last_married_person_divorce_date"
                                          }
                                          control={control}
                                          render={({
                                            field:
                                              field_last_married_person_divorce_date,
                                            fieldState: {
                                              error:
                                                last_married_person_divorce_date_error,
                                            },
                                          }) => (
                                            <CustomeDateTimePicker
                                              {...field_last_married_person_divorce_date}
                                              {...renderFieldProps(
                                                last_married_person_divorce_date_error,
                                              )}
                                              label={"Divorce Date"}
                                            />
                                          )}
                                        />
                                      </Box>
                                    )}
                                </RadioGroup>
                              )}
                            />
                          )}
                        </Box>
                      </RadioGroup>
                      {error?.message && (
                        <CustomErrorMessage error={error?.message ?? {}} />
                      )}
                    </Box>
                  )}
                />
              </Box>
            </Box>
          </BoxWrapper>
        </Grid>
        <Grid xs={12} item>
          <BoxWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography variant="h3">Resident State</Typography>
            <Typography variant="h4">
              Which state do the owners of this legal documents primarily reside
              in?
            </Typography>
            <Controller
              name={"default_state"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Box>
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      setValue("default_state", e.target.value);
                      if (e.target.value === "CA") {
                        setValue("state", "CA");
                      }
                    }}
                  >
                    <Box>
                      <CustomRadioButton
                        value={"CA"}
                        label={`California (eligible for instant document review at checkout)`}
                      />
                    </Box>
                    <Box>
                      <CustomRadioButton
                        value={"otherState"}
                        label="Other State (documents are manually prepared)"
                      />
                    </Box>
                  </RadioGroup>
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </Box>
              )}
            />
            {watch("default_state") !== "CA" && watch("default_state") && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <Controller
                  name={"state"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      onChange={(e: any) => {
                        field.onChange(e);
                        setValue("state", e.target.value);
                        // setValue("state", e.target.value);
                      }}
                      select
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: { maxHeight: 220, width: "300px" },
                          },
                        },
                      }}
                    >
                      {states.map((el) => (
                        <MenuItem key={el.value} value={el.value}>
                          {el.label}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Box>
            )}
          </BoxWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountSetup;
