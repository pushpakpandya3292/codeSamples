import React, { useEffect } from "react";
import { BoxWrapper } from "@/screens//Questionnaires/QuestionnariesSingle/Styled";
import {
  Box,
  Grid,
  List,
  ListItem,
  RadioGroup,
  Typography,
} from "@mui/material";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { Controller, useFormContext } from "react-hook-form";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import CustomRadioButton from "@/components/CustomRadioButton";

function Witnesses() {
  const { control, watch, setValue } = useFormContext();
  const prePrintWitness = watch("pre_print_witness");
  useEffect(() => {
    if (prePrintWitness === "skip") {
      setValue("witness_primary_full_name", "");
      setValue("witness_primary_address", null);
      setValue("witness_secondary_full_name", "");
      setValue("witness_secondary_address", null);
    }
  }, [prePrintWitness, setValue]);
  return (
    <>
      <Box>
        <Typography variant="h2">Disinterested Witnesses</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", py: 1 }}>
          <Typography variant="h5">
            Your Estate Plan documents require two witnesses to sign on four (4)
            sections.
          </Typography>
          <Typography variant="h5">
            Witness cannot be immediate relatives or beneficiaries of your
            estate.
          </Typography>
          <Typography variant="h5">
            Samples of witnesses can include friends, neighbors or colleagues
            who can sign in your presence.
          </Typography>
        </Box>
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
        {/* <Typography variant="body2">Witnesses</Typography>
        <Typography variant="h5">
          Certain sections of your Estate Plan will require two non-related
          adults to witness and sign your Plan documents in your presence.
          Witness signatures do not need to be notarized nor present when you
          notarize.
        </Typography>
        <Typography variant="h5">
          Please see the Tips to the right panel to see the general rules.
        </Typography>
        <Typography variant="h5">
          Tips for your: Neighbors, close friends, best man or maid of honor,
          co-workers.
        </Typography>
        <Typography
          sx={{
            mt: 1,
            textDecoration: "underline",
            textDecorationThickness: "2px",
            textUnderlineOffset: "3px",
            mb: 1,
          }}
        >
          You can skip and leave blank, or enter their information and it will
          be pre-printed on your documents.
        </Typography> */}

        <Box>
          <Typography variant="h4" mb={1}>
            Pre-print witness names on your documents?
          </Typography>
          <Controller
            name={"pre_print_witness"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <RadioGroup {...field}>
                <CustomRadioButton
                  value={"skip"}
                  label={
                    <>
                      <strong>Skip</strong> <span style={{ color: "#535F6B", fontWeight: "400", fontSize: "13px" }}>(Leave blank for now. You can select
                        witnesses later)</span>
                    </>
                  }
                />
                <CustomRadioButton
                  value={"pre-print"}
                  label={
                    <>
                      <strong>Pre-print</strong> <span style={{ color: "#535F6B", fontWeight: "400", fontSize: "13px" }}>(enter the name and home
                        addresses of one or both witnesses)</span>
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
        {watch("pre_print_witness") === "pre-print" && (
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
                  }}
                >
                  <Typography variant="h3">First Witness</Typography>
                  <Controller
                    name={"witness_primary_full_name"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Full Name"}
                      />
                    )}
                  />
                  <Controller
                    name={"witness_primary_address"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <GoogleMaps>
                        <GoogleMaps.AutoComplete
                          {...field}
                          name={"witness_primary_address"}
                          defaultValue={watch("witness_primary_address")}
                          onAddressChange={(autoAddress: any) => {
                            setValue("witness_primary_address", autoAddress);
                          }}
                          label="Full address (street, City, State, Zipcode)"
                        />
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </GoogleMaps>
                    )}
                  />
                </BoxWrapper>
              </Grid>
              <Grid item xs={12} md={6}>
                <BoxWrapper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "15px",
                  }}
                >
                  <Typography variant="h3">Second Witness</Typography>
                  <Controller
                    name={"witness_secondary_full_name"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Full Name"}
                      />
                    )}
                  />
                  <Controller
                    name={"witness_secondary_address"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <GoogleMaps>
                        <GoogleMaps.AutoComplete
                          {...field}
                          name={"witness_secondary_address"}
                          defaultValue={watch("witness_secondary_address")}
                          onAddressChange={(autoAddress: any) => {
                            setValue("witness_secondary_address", autoAddress);
                          }}
                          label="Full address (street, City, State, Zipcode)"
                        />
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </GoogleMaps>
                    )}
                  />
                </BoxWrapper>
              </Grid>
            </Grid>
          </Box>
        )}
      </BoxWrapper>
    </>
  );
}

export default Witnesses;
