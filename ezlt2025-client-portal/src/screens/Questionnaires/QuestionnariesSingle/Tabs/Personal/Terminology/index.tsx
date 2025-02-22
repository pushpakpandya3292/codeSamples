import React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { BoxWrapper } from "@/screens//Questionnaires/QuestionnariesSingle/Styled";
import { GenderEnum, PronounsEnum } from "../../../constants";
import CustomToolTip from "@/components/CutomToolTip";

const genderOption = [
  {
    label: "Male",
    value: GenderEnum.MALE,
  },
  {
    label: "Female",
    value: GenderEnum.FEMALE,
  },
  // {
  //   label:
  //     "other",
  //   value: GenderEnum.OTHER,
  // },
];

const Terminology: React.FC = () => {
  const { control, watch } = useFormContext();
  return (
    <>
      <Typography variant="h2">Terms</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          pointerEvents: "none",
          mt: 2,
          flexDirection: { xs: "column", md: "row" }
        }}
      >
        <BoxWrapper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            flexBasis: { xs: "100%", md: "50%" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Typography variant="h4">
              Gender of{" "}
              <span style={{ color: "#4b8ad1" }}>
                {" "}
                {watch("primary_trustee_first_name")}{" "}
                {watch("primary_trustee_last_name")}{" "}
              </span>
              <CustomToolTip
                title="Currently, due to legal limitations we are unable to offer other
            self-identifications. Please choose the gender you most associate
            with or described in government identifications."
              />
            </Typography>
            <Controller
              name={"primary_trustee_gender"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={"Gender"}
                  select
                  sx={{
                    flexBasis: { lg: "31%", md: "32%", sm: "47%", xs: "100%" },
                  }}
                >
                  {genderOption?.map((option, index) => {
                    return (
                      <MenuItem key={index} value={option.value}>
                        {option?.label}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </Box>
          {/* <Typography variant="body2">SKIP THIS SECTION</Typography>
          <Typography variant="body2">
            {watch("primary_trustee_first_name")}{" "}
            {watch("primary_trustee_last_name")} (Primary Trustee)
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Typography variant="h6">
              What are the pronouns for {watch("primary_trustee_first_name")}{" "}
              {watch("primary_trustee_last_name")}?
            </Typography>
            <Controller
              name={"primary_trustee_pronouns_relation"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomTextField
                  {...field}
                  {...renderFieldProps(error)}
                  label={"Pronouns for Primary Trustee"}
                  select
                  sx={{
                    flexBasis: { lg: "31%", md: "32%", sm: "47%", xs: "100%" },
                  }}
                >
                  {(
                    Object.keys(PronounsEnum) as Array<
                      keyof typeof PronounsEnum
                    >
                  ).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {PronounsEnum[key]}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              )}
            />
          </Box> */}
        </BoxWrapper>
      </Box>
    </>
  );
};

export default Terminology;
