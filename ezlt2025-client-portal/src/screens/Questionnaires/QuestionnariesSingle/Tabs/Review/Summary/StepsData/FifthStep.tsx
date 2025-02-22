import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import EditPopUp from "@/components/ReviewEditPopup/EditPopUp";
import {
  stepsMainHeadingStyle,
  subHeadingStyle,
  StyledTypography,
} from "../index";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import {
  Notary_county_name,
  Notary_legal_name,
} from "@/constants/DataMiddleWare";
import { DeliveryOptionEnum, MailingAddressEnum } from "@/screens/Questionnaires/QuestionnairesCouple/constants";
import { EstatePlanBinderEnum, ShippedToEnum } from "@/screens/Questionnaires/types";

const FifthStep = ({ handleChangeStep }: any) => {
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
        <Grid xs={12} sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h2" sx={stepsMainHeadingStyle}>
              Logistics
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
            Step 5 of 6
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
          <StyledTypography>Delivery Method</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {" "}
                    How would like receive your complete Estate Plan binder?{" "}
                  </Typography>
                  <Typography> {watch("estate_plan_binder")} </Typography>
                </Grid>
                {watch("estate_plan_binder") == EstatePlanBinderEnum.USPS &&
                  (watch("shipped_to") === ShippedToEnum.ME ? (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="h5">USPS 2-day Priority Shipping (included)</Typography>
                        <Typography> {watch("shipped_to")} </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h5">Shipping Name</Typography>
                        <Typography>
                          {" "}
                          {watch("shipping_name_for_doc")}{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h5">Address</Typography>
                        <Typography>
                          {" "}
                          {watch("shipping_address_for_doc")?.name}{" "}
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={6}>
                      <Typography variant="h5">USPS 2-day Priority Shipping (included)</Typography>
                      <Typography> {watch("shipped_to")} </Typography>
                    </Grid>
                  )
                  )}
                {watch("estate_plan_binder") == EstatePlanBinderEnum.LOCAL && (
                  <Grid item xs={6}>
                    <Typography variant="h5">Local pick-up at the EZ Living Trust Office (South Pasadena, CA office)</Typography>
                    <Typography> {watch("shipped_to")} </Typography>
                  </Grid>
                )
                }
              </Grid>
            </>
          </BoxWrapper>
          <StyledTypography>Witness</StyledTypography>
          <Grid item xs={12}>
            <Typography variant="h5">
              Pre-print witness names on your documents?
            </Typography>
            <Typography>
              {watch("pre_print_witness") ? watch("pre_print_witness") : "-"}
            </Typography>
          </Grid>
          {watch("pre_print_witness") === "pre-print" && (
            <>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  First Witness
                </Typography>
                <Typography>
                  {watch("witness_primary_full_name") ? watch("witness_primary_full_name") : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  Full address (street, City, State, Zipcode)
                </Typography>
                <Typography>
                  {watch("witness_primary_address") ? watch("witness_primary_address")?.name : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  Second Witness
                </Typography>
                <Typography>
                  {watch("witness_secondary_full_name") ? watch("witness_secondary_full_name") : "-"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  Full address (street, City, State, Zipcode)
                </Typography>
                <Typography>
                  {watch("witness_secondary_address") ? watch("witness_secondary_address")?.name : "-"}
                </Typography>
              </Grid>
            </>
          )}



          {/* {(watch("witness_primary_full_name") ||
            watch("witness_primary_address")?.name) && (
            <BoxWrapper sx={{ width: "100%" }}>
              {(watch("witness_primary_full_name") ||
                watch("witness_primary_address")?.name) && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        fontWeight={600}
                        sx={{ color: "#333", fontSize: "16px", mt: 1 }}
                      >
                        First Witness
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5">Full Name</Typography>
                      <Typography>
                        {watch("witness_primary_full_name")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {watch("witness_primary_address") && (
                        <>
                          <Typography variant="h5">Full Address</Typography>
                          <Typography>
                            {typeof watch("witness_primary_address") == "string"
                              ? watch("witness_primary_address")
                              : watch("witness_primary_address")?.name}
                          </Typography>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </>
              )}
            </BoxWrapper>
          )}
          {(watch("witness_secondary_full_name") ||
            watch("witness_secondary_address")?.name) && (
            <BoxWrapper sx={{ width: "100%", mt: 2 }}>
              {(watch("witness_secondary_full_name") ||
                watch("witness_secondary_address")?.name) && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        fontWeight={600}
                        sx={{ color: "#333", fontSize: "16px", mt: 2 }}
                      >
                        Second Witness
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5">Full Name</Typography>
                      <Typography>
                        {watch("witness_secondary_full_name")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {watch("witness_secondary_address") && (
                        <>
                          <Typography variant="h5">Full Address</Typography>
                          <Typography>
                            {typeof watch("witness_secondary_address") ==
                            "string"
                              ? watch("witness_secondary_address")
                              : watch("witness_secondary_address").name}
                          </Typography>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </>
              )}
            </BoxWrapper>
          )}
          {!(
            watch("witness_primary_full_name") ||
            watch("witness_primary_address")?.name
          ) &&
            !(
              watch("witness_secondary_full_name") ||
              watch("witness_secondary_address")?.name
            ) && (
              <BoxWrapper width={"100%"}>
                <Typography>N/A</Typography>
              </BoxWrapper>
            )} */}

          <StyledTypography>{`Notary`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">
                Pre-selected Notary
              </Typography>
              <Typography>
                {watch("pre_print_notary") ? watch("pre_print_notary") : "-"}
              </Typography>
            </Grid>
            {watch("pre_print_notary") === "pre-print" && (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">
                    Notary Public complete legal name
                  </Typography>
                  <Typography>
                    {watch("notary_complete_name") ? watch("notary_complete_name") : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">
                    County name you will Notarize the documents
                  </Typography>
                  <Typography>
                    {watch("notary_country_name") ? watch("notary_country_name") : "-"}
                  </Typography>
                </Grid>
              </>
            )}
          </BoxWrapper>
          <StyledTypography>{`Signing Date`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5">
                Exact Signature Date
              </Typography>
              <Typography>
                {watch("signing_date") ? watch("signing_date") : "-"}
              </Typography>
            </Grid>
            {watch("signing_date") === "yes" && (
              <>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5">
                    Date the documents are to be signed
                  </Typography>
                  <Typography>
                    {watch("signing_date_field") ? dayjs(watch("signing_date_field")).format("MM/DD/YYYY") : "-"}
                  </Typography>
                </Grid>
              </>
            )}
            {/* {watch("signing_date") == "yes" ? (
              <Grid item xs={12}>
                <Typography variant="h5">
                  Date the documents are to be signed
                </Typography>
                <Typography>
                  {dayjs(watch("signing_date_field")).format("MM-DD-YYYY")}
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography>N/A</Typography>
              </Grid>
            )} */}
          </BoxWrapper>
          <StyledTypography>{`Acknowledgement & Agreement`}</StyledTypography>
          <BoxWrapper width={"100%"}>
            <Grid item xs={12}>
              <Typography variant="h5">Signature</Typography>
              <img
                style={{ height: "50px", width: "50px", marginTop: "10px" }}
                src={watch("e_signature") || "/images/Signature.svg"}
                alt="edit"
              />
            </Grid>
          </BoxWrapper>
        </Grid>
      </Grid>
      {/* EDIT MODAL */}
      <EditPopUp
        handleChangeStep={() => handleChangeStep(4)}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default FifthStep;
