import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import {
  CitizenShipEnum,
  EmploymentStatusEnum,
  PronounsEnum,
} from "../../../../constants";
import EditPopUp from "@/components/ReviewEditPopup/EditPopUp";
import { formatPhoneNumber } from "@/utils/helper";
import {
  StyledTypography,
  stepsMainHeadingStyle,
  subHeadingStyle,
} from "../index";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnariesSingle/Styled";
import moment from "moment";

const FirstStep = ({ handleChangeStep }: any) => {
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
              Personal Information
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
            Step 1 of 6
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
          <StyledTypography>{`Trust Information`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid container spacing={2}>
              {watch("died_person") && (
                <>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5">
                      Deceased Spouse’s Full Name
                    </Typography>
                    <Typography>
                      {watch("died_person") ? watch("died_person") : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5">Spouse’s deceased date</Typography>
                    <Typography>
                      {watch("died_person_death_date")
                        ? moment
                            .utc(watch("died_person_death_date"))
                            .format("MM-DD-YYYY")
                        : "-"}
                    </Typography>
                  </Grid>
                </>
              )}
              {watch("last_married_person") && (
                <>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5">Ex-Spouse’s Full Name</Typography>
                    <Typography>
                      {watch("last_married_person")
                        ? watch("last_married_person")
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5">Divorce date</Typography>
                    <Typography>
                      {watch("last_married_person_divorce_date")
                        ? moment
                            .utc(watch("last_married_person_divorce_date"))
                            .format("MM-DD-YYYY")
                        : "-"}
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={watch("trust_status") == "new" ? 4 : 4}>
                <Typography variant="h5"> Living Trust Type</Typography>
                <Typography>
                  {watch("trust_status") == "new" ? "New" : "Restated"}
                </Typography>
              </Grid>
              {watch("trust_status") == "new" ? (
                <Grid item xs={12} md={6}>
                  <Typography variant="h5"> New Living Trust Name</Typography>
                  <Typography>{watch("complete_trust_name")}</Typography>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5">
                      Original Living Trust Name
                    </Typography>
                    <Typography>{watch("original_trust_name")}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5">
                      Original Living Trust Date
                    </Typography>
                    <Typography>
                      {dayjs(watch("original_trust_date")).format("MM-DD-YYYY")}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </BoxWrapper>
          <StyledTypography>{`Primary Trustee's Information`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">First Name</Typography>
                <Typography>{watch("primary_trustee_first_name")}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Middle Name</Typography>
                {watch("primary_trustee_middle_name") ? (
                  <Typography>
                    {watch("primary_trustee_middle_name")}
                  </Typography>
                ) : (
                  <Typography>N/A</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Last Name</Typography>
                <Typography>{watch("primary_trustee_last_name")}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Email</Typography>
                {watch("primary_trustee_email") ? (
                  <Typography>{watch("primary_trustee_email")}</Typography>
                ) : (
                  <Typography>N/A</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">Address</Typography>
                <Typography>
                  {typeof watch("primary_trustee_address") == "string"
                    ? watch("primary_trustee_address")
                    : watch("primary_trustee_address")?.name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">County</Typography>
                <Typography>
                  {watch("primary_trustee_county")
                    ? watch("primary_trustee_county")
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Mobile</Typography>
                <Typography>
                  {formatPhoneNumber(watch("primary_trustee_mobile"))}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Date of Birth</Typography>
                <Typography>
                  {dayjs(watch("primary_trustee_date_of_birth")).format(
                    "MM-DD-YYYY",
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Citizenship</Typography>
                <Typography>
                  {
                    CitizenShipEnum[
                      watch(
                        "primary_trustee_citizenship",
                      ) as keyof typeof CitizenShipEnum
                    ]
                  }
                </Typography>
              </Grid>
              {/* <Grid item xs={12} md={3}>
                <Typography variant="h5">Employee Status</Typography>

                <Typography>
                  {
                    EmploymentStatusEnum[
                      watch(
                        "primary_trustee_empolyment_status",
                      ) as keyof typeof EmploymentStatusEnum
                    ]
                  }
                </Typography>
              </Grid> */}
              {/* <Grid item xs={12} md={3}>
                <Typography variant="h5">Estimated Annual Income</Typography>
                <Typography>
                  {watch("primary_trustee_estimated_annual_income")}
                </Typography>
              </Grid> */}
            </Grid>
          </BoxWrapper>
          <StyledTypography>{`Terminology Information`}</StyledTypography>

          <BoxWrapper width={"100%"}>
            <Typography variant="h5">Gender</Typography>
            {watch("primary_trustee_gender") === 1 ? "Male" : "Female"}
          </BoxWrapper>
        </Grid>
      </Grid>
      <EditPopUp
        handleChangeStep={() => handleChangeStep(0)}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default FirstStep;
