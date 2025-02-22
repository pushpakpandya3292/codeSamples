import React, { useEffect, useState } from "react";
import { Box, RadioGroup, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomizedSwitches from "@/components/CustomSwitch";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import {
  DeliveryOptionEnum,
  EstatePlanBinderEnum,
  MailingAddressEnum,
  ShippedToEnum,
} from "../../../constants";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";

function DeliveryMethod() {
  const { control, watch, setValue } = useFormContext();
  return (
    <Box>
      <Typography variant="h2">Delivery Method</Typography>
      <BoxWrapper sx={{ width: { xs: "100%", md: "60%" }, my: 2 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            How would like receive your complete Estate Plan binder?
          </Typography>
          <RadioGroup sx={{ gap: "5px" }} row>
            <Controller
              name={"estate_plan_binder"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <RadioGroup
                  {...field}
                  onChange={(e) => {
                    setValue("estate_plan_binder", e.target.value);
                    setValue("shipped_to", "");
                    setValue("shipping_address_for_doc", null);
                    setValue("shipping_name_for_doc", "");
                  }}
                >
                  <CustomRadioButton
                    value={EstatePlanBinderEnum.USPS}
                    label={`USPS 2-day Priority Shipping (included)`}
                  />
                  {watch("estate_plan_binder") == EstatePlanBinderEnum.USPS && (
                    <Controller
                      name={"shipped_to"}
                      control={control}
                      render={({
                        field: shipped_to_field,
                        fieldState: { error: shipped_to_error },
                      }) => (
                        <RadioGroup {...shipped_to_field}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              //   justifyContent: "space-between",
                              //   alignItems: "center",
                              width: "100%",
                              borderRadius: "10px",
                              background: "#F5F5F5",
                              px: 2,
                              gap: "10px",
                              py: 2,
                              mb: 2,
                            }}
                          >
                            <CustomRadioButton
                              value={ShippedToEnum.PRIMARY}
                              label={
                                <Typography sx={{ color: "black" }}>
                                  Shipped to Primary Trustee:
                                  <Typography
                                    sx={{
                                      color: (theme) =>
                                        theme.additionalColors?.tablightBlue,
                                      mt: 1,
                                      fontSize: "12px",
                                    }}
                                  >
                                    ({watch("primary_trustee_first_name")},
                                    {watch("primary_trustee_address")?.name})
                                  </Typography>
                                </Typography>
                              }
                            />
                            <CustomRadioButton
                              value={ShippedToEnum.ME}
                              label={
                                <Typography sx={{ color: "black" }}>
                                  Ship to someone else
                                </Typography>
                              }
                            />
                            {watch("shipped_to") === ShippedToEnum.ME && (
                              <>
                                <Controller
                                  name={"shipping_name_for_doc"}
                                  control={control}
                                  render={({
                                    field: shipping_name_for_doc_field,
                                    fieldState: {
                                      error: shipping_name_for_doc_error,
                                    },
                                  }) => (
                                    <>
                                      <CustomTextField
                                        {...shipping_name_for_doc_field}
                                        {...renderFieldProps(
                                          shipping_name_for_doc_error,
                                        )}
                                        placeholder={"Shipping Name"}
                                        label="Shipping Name"
                                        sx={{
                                          width: { xs: "100%", md: "80%" },
                                        }}
                                      />
                                    </>
                                  )}
                                />
                                <Controller
                                  name={"shipping_address_for_doc"}
                                  control={control}
                                  render={({
                                    field: shipping_address_for_doc_field,
                                    fieldState: {
                                      error: shipping_address_for_doc_error,
                                    },
                                  }) => (
                                    <Box
                                      sx={{
                                        my: 1,
                                        width: { xs: "100%", md: "80%" },
                                      }}
                                    >
                                      <GoogleMaps>
                                        <GoogleMaps.AutoComplete
                                          {...shipping_address_for_doc_field}
                                          name={"shipping_address_for_doc"}
                                          defaultValue={watch(
                                            "shipping_address_for_doc",
                                          )}
                                          onAddressChange={(
                                            autoAddress: any,
                                          ) => {
                                            setValue(
                                              "shipping_address_for_doc",
                                              autoAddress,
                                            );
                                          }}
                                          placeholder="Enter your Address"
                                        />
                                        {shipping_address_for_doc_error?.message && (
                                          <CustomErrorMessage
                                            error={
                                              shipping_address_for_doc_error?.message ??
                                              {}
                                            }
                                          />
                                        )}
                                      </GoogleMaps>
                                    </Box>
                                  )}
                                />
                              </>
                            )}
                          </Box>
                          {shipped_to_error?.message && (
                            <CustomErrorMessage
                              error={shipped_to_error?.message ?? {}}
                            />
                          )}
                        </RadioGroup>
                      )}
                    />
                  )}
                  <CustomRadioButton
                    value={EstatePlanBinderEnum.LOCAL}
                    label="Local pick-up at the EZ Living Trust Office (South Pasadena, CA office)"
                  />
                  {watch("estate_plan_binder") ==
                    EstatePlanBinderEnum.LOCAL && (
                    <Controller
                      name={"shipped_to"}
                      control={control}
                      render={({
                        field: shipped_to_field,
                        fieldState: { error: shipped_to_error },
                      }) => (
                        <RadioGroup {...shipped_to_field}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              //   justifyContent: "space-between",
                              //   alignItems: "center",
                              width: "100%",
                              borderRadius: "10px",
                              background: "#F5F5F5",
                              px: 2,
                              gap: "10px",
                              py: 2,
                            }}
                          >
                            <CustomRadioButton
                              value={ShippedToEnum.PICKUP}
                              label={
                                <Typography
                                  sx={{
                                    color: "black",
                                    display: "flex",
                                    gap: 0.5,
                                    fontSize: "14px",
                                  }}
                                >
                                  Pick-up ONLY
                                </Typography>
                              }
                            />
                            <CustomRadioButton
                              value={ShippedToEnum.PICKUPNOTARY}
                              label={
                                <Typography
                                  sx={{
                                    color: "black",
                                    display: "flex",
                                    gap: 0.5,
                                    fontSize: "14px",
                                  }}
                                >
                                  Pick-up and Notarize in the EZ Living Trust
                                  office
                                </Typography>
                              }
                            />
                            <Typography variant="caption">
                              * When your binder is ready for pick-up, we will
                              contact you to select a date and time that works
                              best for you.
                            </Typography>
                          </Box>
                          {shipped_to_error?.message && (
                            <CustomErrorMessage
                              error={shipped_to_error?.message ?? {}}
                            />
                          )}
                        </RadioGroup>
                      )}
                    />
                  )}
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </RadioGroup>
              )}
            />
            {/* <Controller
              name={"delivery_option"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <RadioGroup {...field}>
                  <CustomRadioButton
                    value={DeliveryOptionEnum.SHIP}
                    label={`Ship`}
                  />
                  <CustomRadioButton
                    value={DeliveryOptionEnum.PICKUP}
                    label="PickUp"
                  />
                  <CustomRadioButton
                    value={DeliveryOptionEnum.PICKUP_NOTARY}
                    label="Pickup And Notary"
                  />
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </RadioGroup>
              )}
            /> */}
          </RadioGroup>
        </Box>
      </BoxWrapper>

      {/* <BoxWrapper sx={{ width: "60%", my: 2 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2">
            Licensed Notary Public Officer
          </Typography>
          <Typography sx={{ py: 1 }} variant="h5">
            A active licensed Notary in the state you reside in will be required
            for the Primary and Secondary Trustee . Notarization is not required
            for Successor Trustees, Health or Financial agents, or
            beneficiaries.
          </Typography>
          <Typography variant="body2">Pre-selected Option</Typography>
          <RadioGroup sx={{ gap: "5px" }} row>
            <Controller
              name={"licensed_notary_public_0fficer_option"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <RadioGroup {...field}>
                  <CustomRadioButton
                    value="1"
                    label={`Notary near me - I am unable to travel to your South Pasadena office and will find a Notary near me. `}
                  />
                  <CustomRadioButton
                    value="2"
                    label="Local pick-up but use my own Notary"
                  />
                  <CustomRadioButton
                    value="3"
                    label="Local pick-up and Notarize at your office - I will schedule a pick-up and date to Notarize in your office"
                  />
                  {error?.message && (
                    <CustomErrorMessage error={error?.message ?? {}} />
                  )}
                </RadioGroup>
              )}
            />
          </RadioGroup>
        </Box>
      </BoxWrapper>
      {(watch("licensed_notary_public_0fficer_option") === "1" ||
        watch("licensed_notary_public_0fficer_option") === "2") && (
        <BoxWrapper sx={{ width: "60%" }}>
          <Typography variant="body2">Use an External Notary</Typography>
          <Typography sx={{ py: 1 }} variant="h5">
            If you are planning using another Notary, you can add their
            information below to have it pre-printed on your documents, else it
            will be left blank to use any notary.
          </Typography>
          <ToggleBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Notary name</Typography>
            <CustomizedSwitches
              checked={livingChildren}
              setChecked={setLivingChildren}
            />
          </ToggleBox>
          <Typography sx={{ mt: 1 }} variant="h5">
            Click YES if you want to add their name to your documents, otherwise
            it will be blank
          </Typography>
          {watch("notary") == "yes" && (
            <>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Controller
                  name={"notary_complete_name"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      placeholder={"Notary Public complete legal name"}
                    />
                  )}
                />
                <Box sx={{ mx: 2 }}></Box>
                <Controller
                  name={"notary_country_name"}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      {...renderFieldProps(error)}
                      placeholder={
                        "County name you will Notarize the documents"
                      }
                    />
                  )}
                />
              </Box>
              <Typography variant="h5">
                Include the complete name for the county corresponding political
                subdivision as you would like it presented in the document (i.e.
                Los Angeles County, San Diego County, Harris County, County of
                Davis, or Denali Borough)
              </Typography>
            </>
          )}
        </BoxWrapper>
      )}
      {watch("licensed_notary_public_0fficer_option") === "3" && (
        <BoxWrapper sx={{ width: "60%" }}>
          <Box>
            <Typography variant="h3">Use your South Pasadena Notary</Typography>
            <Typography variant="h5">
              Our experience Notary Public officer can notarize for any licensed
              adult in California.
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h3">Blanca Leticia Mena</Typography>
            <Typography variant="h5">Los Angeles County</Typography>
            <Typography variant="h5">California, COM: 2330393</Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5">
              <span style={{ fontWeight: "700" }}>{`Please bring:`}</span>{" "}
              {`A
              government issued picture ID such as State ID, Driver's License,
              or Passport.`}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">
              Payment to the Notary will be separate. CA State Law caps
              signature fee at $15 a signature.
            </Typography>
          </Box>
        </BoxWrapper>
      )} */}
    </Box>
  );
}

export default DeliveryMethod;
