import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Divider, Grid, Typography } from "@mui/material";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import EditPopUp from "@/components/ReviewEditPopup/EditPopUp";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnariesSingle/Styled";
import {
  StyledTypography,
  stepsMainHeadingStyle,
  subHeadingStyle,
} from "../index";
import {
  GeneralInvestingEnum,
  HealthInsuranceEnum,
  MedicareInsuranceEnum,
  MortgageInsuranceEnum,
  RetirementandInvestingPlansEnum,
  SetupIRAEnum,
} from "@/screens/Questionnaires/QuestionnariesSingle/constants";

const SixthStep = ({ handleChangeStep }: any) => {
  const { watch } = useFormContext();
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Grid my={2}>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h2" sx={stepsMainHeadingStyle}>
              Services
            </Typography>
            <BorderColorTwoToneIcon
              color="primary"
              onClick={handleOpenModal}
              sx={{
                background: (theme) =>
                  theme.additionalColors?.background.tertiary,
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "26px",
                p: "4px",
              }}
            />
          </Box>
          <Typography variant="h3" sx={{ fontSize: "14px" }}>
            Step 6 of 6
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            my: 1,
            ml: "-7px",
            borderRadius: 2,
            p: 2,
            boxShadow: "0 0px 3px rgba(0,0,0,0.2)",
            background: "#fcfcfc",
          }}
        >
          <StyledTypography>{`Protect your home`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {" "}
                Commitment to Fund your Trust
              </Typography>
              <Typography>
                {watch("fund_your_trust") == true ? "Yes" : "No"}
              </Typography>
            </Grid>
          </BoxWrapper>
          <StyledTypography>{`Insurance Planning`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5">Mortgage or Life Insurance</Typography>
                <Typography>
                  {watch("mortgage_or_life_Insurance")
                    ? MortgageInsuranceEnum[
                        watch(
                          "mortgage_or_life_Insurance",
                        ) as keyof typeof MortgageInsuranceEnum
                      ]
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5">Health Insurance</Typography>
                <Typography>
                  {watch("health_insurance")
                    ? HealthInsuranceEnum[
                        watch(
                          "health_insurance",
                        ) as keyof typeof HealthInsuranceEnum
                      ]
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5">Medicare Insurance</Typography>
                <Typography>
                  {watch("medicare_insurance")
                    ? MedicareInsuranceEnum[
                        watch(
                          "medicare_insurance",
                        ) as keyof typeof MedicareInsuranceEnum
                      ]
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </BoxWrapper>
          <StyledTypography>{`Retirement Plans`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5">
                  Help rollover your old Orphan 401(k) plan
                </Typography>
                <Typography>
                  {watch("retirement_and_investing_plans")
                    ? RetirementandInvestingPlansEnum[
                        watch(
                          "retirement_and_investing_plans",
                        ) as keyof typeof RetirementandInvestingPlansEnum
                      ]
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5">
                  Help you set up a new IRA, Roth or SEP IRA
                </Typography>
                <Typography>
                  {watch("setupIRA")
                    ? SetupIRAEnum[
                        watch("setupIRA") as keyof typeof SetupIRAEnum
                      ]
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h5">
                  Investing in Stocks, ETFs Index portfolios
                </Typography>
                <Typography>
                  {watch("general_investing")
                    ? GeneralInvestingEnum[
                        watch(
                          "general_investing",
                        ) as keyof typeof GeneralInvestingEnum
                      ]
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </BoxWrapper>
          <StyledTypography>{`Other Professional Services`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Box>
              {watch("ProfessionalServices").map(
                (item: string, index: number) => (
                  <Typography key={index}>{item ? item : "-"}</Typography>
                ),
              )}
            </Box>
          </BoxWrapper>
        </Grid>
      </Grid>
      <EditPopUp
        handleChangeStep={() => handleChangeStep(5)}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default SixthStep;
