import React, { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import EditPopUp from "@/components/ReviewEditPopup/EditPopUp";
import {
  CitizenShipEnum,
  EmploymentStatusEnum,
  PronounsEnum,
  TrusteesRealtionEnum,
} from "../../../../constants";
import { formatPhoneNumber } from "@/utils/helper";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import {
  StyledTypography,
  stepsMainHeadingStyle,
  subHeadingStyle,
} from "../index";

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
          <BoxWrapper sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={watch("trust_status") == "new" ? 6 : 4}>
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
          <BoxWrapper sx={{ width: "100%" }}>
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
                    : watch("primary_trustee_address").name}
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
          <StyledTypography>{`Secondary Trustee's Information`}</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">First Name</Typography>
                <Typography>{watch("secondary_trustee_first_name")}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Middle Name</Typography>
                {watch("secondary_trustee_middle_name") ? (
                  <Typography>
                    {watch("secondary_trustee_middle_name")}
                  </Typography>
                ) : (
                  <Typography>N/A</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Last Name</Typography>
                <Typography>{watch("secondary_trustee_last_name")}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Email</Typography>
                {watch("secondary_trustee_email") ? (
                  <Typography>{watch("secondary_trustee_email")}</Typography>
                ) : (
                  <Typography>N/A</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">Address</Typography>
                <Typography>
                  {typeof watch("secondary_trustee_address") == "string"
                    ? watch("secondary_trustee_address")
                    : watch("secondary_trustee_address").name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">County</Typography>
                <Typography>
                  {watch("secondary_trustee_county")
                    ? watch("secondary_trustee_county")
                    : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Mobile</Typography>
                <Typography>
                  {formatPhoneNumber(watch("secondary_trustee_mobile"))}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Date of Birth</Typography>
                <Typography>
                  {dayjs(watch("secondary_trustee_date_of_birth")).format(
                    "MM-DD-YYYY",
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Citizenship</Typography>
                {/* <Typography>{watch("secondary_trustee_citizenship")}</Typography> */}
                <Typography>
                  {
                    CitizenShipEnum[
                      watch(
                        "secondary_trustee_citizenship",
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
                        "secondary_trustee_empolyment_status",
                      ) as keyof typeof EmploymentStatusEnum
                    ]
                  }
                </Typography>
              </Grid> */}
              {/* <Grid item xs={12} md={3}>
                <Typography variant="h5">Estimated Annual Income</Typography>
                <Typography>
                  {watch("secondary_trustee_estimated_annual_income")}
                </Typography>
              </Grid> */}
            </Grid>
          </BoxWrapper>
          <StyledTypography>{`Terminology Information`}</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid
                container
                spacing={2}
                sx={{
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    {watch("primary_trustee_first_name")}{" "}
                    {watch("primary_trustee_last_name")} (Primary Trustee)
                  </Typography>
                  <Typography variant="h5">Gender</Typography>
                  {watch("primary_trustee_gender") === 1 ? "Male" : "Female"}
                  <Typography variant="h5">
                    Relationship to Secondary Trustee
                  </Typography>
                  {
                    TrusteesRealtionEnum[
                      watch(
                        "primary_trustee_secondary_relation",
                      ) as keyof typeof TrusteesRealtionEnum
                    ]
                  }
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    {watch("secondary_trustee_first_name")}{" "}
                    {watch("secondary_trustee_last_name")} (Secondary Trustee)
                  </Typography>
                  <Typography variant="h5">Gender</Typography>
                  {watch("secondary_trustee_gender") === 1 ? "Male" : "Female"}
                  <Typography variant="h5">
                    Relationship to Primary Trustee
                  </Typography>
                  <Typography>
                    {
                      TrusteesRealtionEnum[
                        watch(
                          "secondary_trustee_primary_relation",
                        ) as keyof typeof TrusteesRealtionEnum
                      ]
                    }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </BoxWrapper>
        </Grid>
      </Grid>
      {/* EDIT MODAL */}
      <EditPopUp
        handleChangeStep={() => handleChangeStep(0)}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default FirstStep;
