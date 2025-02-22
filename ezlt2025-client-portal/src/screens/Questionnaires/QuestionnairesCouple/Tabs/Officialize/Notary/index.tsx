import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  RadioGroup,
  Typography,
} from "@mui/material";
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
import { DeliveryOptionEnum, MailingAddressEnum } from "../../../constants";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import RecommendedChip from "@/components/RecommendedChip";

function Notary() {
  const { control, watch, setValue } = useFormContext();
  return (
    <Box>
      <Box>
        <Typography variant="h2">Pre-selected Notary</Typography>
        {/* <List dense sx={{ h5: { lineHeight: "1" } }}>
            <ListItem> */}
        <Typography variant="h5">
          You can have the the legal name of a trusted Notary Public pre-printed
          onto your legal documents.
        </Typography>
        {/* </ListItem>
          </List> */}
      </Box>
      <BoxWrapper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          width: { xs: "100%", md: "70%" },
          mt: 1,
        }}
      >
        <Box>
          <Controller
            name={"pre_print_notary"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  setValue("pre_print_notary", e.target.value);
                  if (e.target.value === "skip") {
                    setValue("notary_complete_name", "");
                    setValue("notary_country_name", "");
                  }
                }}
              >
                <CustomRadioButton
                  value={"skip"}
                  label={
                    <>
                      <strong> Skip / Leave Blank</strong> <span></span>{" "}
                      <RecommendedChip />
                    </>
                  }
                />
                <CustomRadioButton
                  value={"pre-print"}
                  label={
                    <>
                      <strong>Pre-print</strong> (enter the name of your trusted
                      Notary Public below)
                    </>
                  }
                />
                {error?.message && (
                  <CustomErrorMessage error={error?.message ?? {}} />
                )}
              </RadioGroup>
            )}
          />
        </Box>
        {watch("pre_print_notary") === "pre-print" && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container columnSpacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} md={6}>
                <BoxWrapper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "15px",
                    p: 2,
                  }}
                >
                  <Box>
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
                    <Typography
                      variant="h5"
                      sx={{
                        color: (theme) => theme.additionalColors?.tablightBlue,
                      }}
                    >
                      Enter the name as exactly written on the Commission Stamp
                    </Typography>
                  </Box>
                </BoxWrapper>
                <BoxWrapper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "15px",
                    mt: 2,
                  }}
                >
                  <Box>
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
                    />{" "}
                    <Typography
                      variant="h5"
                      sx={{
                        color: (theme) => theme.additionalColors?.tablightBlue,
                      }}
                    >
                      Skip if you are unsure
                    </Typography>
                  </Box>
                </BoxWrapper>
              </Grid>
            </Grid>
          </Box>
        )}
      </BoxWrapper>
    </Box>
  );
}

export default Notary;
