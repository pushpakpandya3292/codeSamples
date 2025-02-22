import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Divider,
  Grid,
  TableCell,
  tableCellClasses,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Table,
  TableBody,
  Typography,
  styled,
} from "@mui/material";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import EditPopUp from "@/components/ReviewEditPopup/EditPopUp";
import {
  PrimaryResidenceEnum,
  QuitClaimEnum,
} from "@/screens/Questionnaires/QuestionnairesCouple/constants";
import {
  StyledTypography,
  stepsMainHeadingStyle,
  subHeadingStyle,
} from "../index";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import { MailingAddressEnum } from "@/screens/Questionnaires/types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FourthStep = ({ handleChangeStep }: any) => {
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
              Estate
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
            Step 4 of 6
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
          <StyledTypography>Primary Home</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography
                  fontWeight={600}
                  sx={{ color: "#333", fontSize: "16px", mb: 1 }}
                >
                  {`Probate Protection (Primary residence)`}
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <Box>
                    <Typography variant="h5">Primary home address</Typography>
                    <Typography>
                      {typeof watch("primary_home_address") == "string"
                        ? watch("primary_home_address")
                        : watch("primary_home_address")?.name}
                    </Typography>
                  </Box>
                  <>
                    <Box>
                      <Typography variant="h5">Property Type</Typography>
                      {watch("property_type_question")  && (
                        <Typography>
                          {typeof watch("property_type_question") == "string"
                            ? watch("property_type_question")
                            : watch("property_type_question").name}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Typography variant="h5">Mailing Address</Typography>
                      {watch("mailing_address_checkbox") ===
                      MailingAddressEnum.IS_MAILING_ADDRESS ? (
                        <Typography>
                          {typeof watch("mailing_address_field") == "string"
                            ? watch("mailing_address_field")
                            : watch("mailing_address_field").name}
                        </Typography>
                      ) : (
                        <Typography>
                          {watch(`mailing_address_checkbox`)
                            ? watch(`mailing_address_checkbox`)
                            : "-"}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Typography variant="h5">
                        Tell us about your Primary residence?
                      </Typography>
                      <Typography>
                        {watch("primary_residence")
                          ? watch("primary_residence")
                          : "-"}
                      </Typography>
                    </Box>
                  </>
                  {!(
                    watch("primary_residence") ==
                    PrimaryResidenceEnum.COUPLE_RENT
                  ) && (
                    <Box>
                      <Typography variant="h5">
                        {`Do you want to prepare a Quit Claim?`}
                      </Typography>
                      <Typography>
                        {watch("quit_qlaim") ==
                          QuitClaimEnum.COUPLE_PREPARE_CLAIM &&
                          "Yes, please prepare the Quit Claim for this property (included)"}
                        {watch("quit_qlaim") ==
                          QuitClaimEnum.COUPLE_DONT_PREPARE_CLAIM &&
                          "No, I don’t want to protect this property at this time."}
                        {watch("quit_qlaim") ==
                          QuitClaimEnum.COUPLE_PROPERTY_ALREADY_PROTECTED &&
                          "No, my property is already protected by an existing Trust."}
                      </Typography>
                    </Box>
                  )}
                  {watch("quit_qlaim") === QuitClaimEnum.COUPLE_PREPARE_CLAIM &&
                    watch("property_question") && (
                      <Box>
                        <Typography variant="h5">Property question</Typography>
                        <Typography>
                          {watch("property_question") || "-"}
                        </Typography>
                      </Box>
                    )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" mb={2}>
                  Check the County Records
                </Typography>
                {watch("quit_qlaim") === QuitClaimEnum.COUPLE_PREPARE_CLAIM &&
                watch("primary_home_property_api_details") ? (
                  <>
                    <Box>
                      <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Key</StyledTableCell>
                              <StyledTableCell align="right">
                                Details
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {watch(
                              "primary_home_property_api_details",
                            )?.ownership?.data?.currentOwners?.ownerNames?.map(
                              (el: any, index: any) =>
                                el.fullName && (
                                  <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                      Owner {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {el.fullName}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ),
                            )}
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                Property address
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {"-"}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                Property type
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {"-"}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                {`Assessor's Parcel Number`}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {watch("primary_home_property_api_details")
                                  ?.legalAndVesting?.assessorsParcelNumber ||
                                  "-"}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                Mailing Address
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {watch("primary_home_property_api_details")
                                  ?.ownership?.data?.currentOwnerMailingInfo
                                  ?.mailingAddress?.streetAddress || "-"}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                County Name
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {watch("primary_home_property_api_details")
                                  ?.legalAndVesting?.countyName || "-"}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                Vesting
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {watch("primary_home_property_api_details")
                                  ?.legalAndVesting?.ownerVestingCode || "-"}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                Vesting Ownership
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {watch("primary_home_property_api_details")
                                  ?.legalAndVesting?.vestingOwnershipRight ||
                                  "-"}
                              </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                Description
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {watch("primary_home_property_api_details")
                                  ?.legalAndVesting?.shortLegalDescription ||
                                  "-"}
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </>
                ) : watch("quit_qlaim") ===
                    QuitClaimEnum.COUPLE_PREPARE_CLAIM &&
                  watch("primary_home_property_api_details") == null ? (
                  <Typography>Property detail not found</Typography>
                ) : (
                  <Typography>-</Typography>
                )}
              </Grid>
            </Grid>
          </BoxWrapper>
          <StyledTypography>Other Properties</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Box mb={2}>
              <Typography variant="h5">
                Do you own investment property and want to prepare Quit Claims
                for 100$ each?
              </Typography>
              <Typography>
                {watch("investment_property") == true ? "Yes" : "No"}
              </Typography>
            </Box>
            {watch("investment_property") && (
              <>
                {watch("investment_properties")?.map(
                  (property: any, index: number) => {
                    return (
                      <>
                        <Grid container spacing={2} mb={2}>
                          <Grid item xs={12} md={6}>
                            <Typography mb={1} variant="h2">
                              Property {index + 1}
                            </Typography>
                            <Typography variant="h5">
                              Primary Home Address
                            </Typography>
                            <Typography key={index} mt={0}>
                              {
                                property
                                  ?.investment_property_primary_home_address
                                  ?.name
                              }
                            </Typography>
                            <Box>
                              <Typography variant="h5">
                                Mailing Address
                              </Typography>
                              {watch(
                                `investment_properties[${index}].mailing_address_checkbox`,
                              ) === MailingAddressEnum.IS_MAILING_ADDRESS ? (
                                <Typography>
                                  {typeof watch(
                                    `investment_properties[${index}].mailing_address_field`,
                                  ) == "string"
                                    ? watch(
                                        `investment_properties[${index}].mailing_address_field`,
                                      )
                                    : watch(
                                        `investment_properties[${index}].mailing_address_field`,
                                      ).name}
                                </Typography>
                              ) : (
                                <Typography>
                                  {watch(
                                    `investment_properties[${index}].mailing_address_checkbox`,
                                  )}
                                </Typography>
                              )}
                            </Box>
                            <Typography variant="h5" mt={"16px"}>
                              Ownership percentage
                            </Typography>
                            <Typography key={index} mt={0}>
                              {property?.property_ownership_status}
                            </Typography>
                            {watch(
                              `investment_properties[${index}].property_question`,
                            ) && (
                              <>
                                <Typography variant="h5" mt={"16px"}>
                                  Property question
                                </Typography>
                                <Typography key={index} mt={0}>
                                  {property?.property_question}
                                </Typography>
                              </>
                            )}
                          </Grid>
                          <Grid item xs={12} md={6}>
                            {watch(
                              `investment_properties[${index}].property_api_details`,
                            ) && (
                              <>
                                <TableContainer component={Paper}>
                                  <Table
                                    size="small"
                                    aria-label="customized table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <StyledTableCell>Key</StyledTableCell>
                                        <StyledTableCell align="right">
                                          Details
                                        </StyledTableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {watch(
                                        `investment_properties[${index}].property_api_details`,
                                      )?.ownership?.data?.currentOwners?.ownerNames?.map(
                                        (el: any, index: any) =>
                                          el.fullName && (
                                            <StyledTableRow key={index}>
                                              <StyledTableCell
                                                component="th"
                                                scope="row"
                                              >
                                                Owner {index + 1}
                                              </StyledTableCell>
                                              <StyledTableCell align="right">
                                                {el.fullName}
                                              </StyledTableCell>
                                            </StyledTableRow>
                                          ),
                                      )}
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          Property address
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {"-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          Property type
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {"-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          {`Assessor's Parcel Number`}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {watch(
                                            `investment_properties[${index}].property_api_details`,
                                          )?.legalAndVesting
                                            ?.assessorsParcelNumber || "-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          Mailing Address
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {watch(
                                            `investment_properties[${index}].property_api_details`,
                                          )?.ownership?.data
                                            ?.currentOwnerMailingInfo
                                            ?.mailingAddress?.streetAddress ||
                                            "-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          County Number
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {watch(
                                            `investment_properties[${index}].property_api_details`,
                                          )?.siteLocation?.data
                                            ?.landUseAndZoningCodes
                                            ?.countyLandUseCode || "-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          Vesting
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {watch(
                                            `investment_properties[${index}].property_api_details`,
                                          )?.legalAndVesting
                                            ?.ownerVestingCode || "-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          Vesting Ownership
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {watch(
                                            `investment_properties[${index}].property_api_details`,
                                          )?.legalAndVesting
                                            ?.vestingOwnershipRight || "-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          Description
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                          {watch(
                                            `investment_properties[${index}].property_api_details`,
                                          )?.legalAndVesting
                                            ?.shortLegalDescription || "-"}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </>
                    );
                  },
                )}
              </>
            )}
          </BoxWrapper>
          <StyledTypography>Estate Wishes</StyledTypography>
          <BoxWrapper sx={{ width: "100%" }}>
            <Typography
              fontWeight={600}
              sx={{ color: "#333", fontSize: "16px", mb: 2 }}
            >
              Your Living Trust Wishes
            </Typography>
            <Grid item xs={12}>
              <Typography variant="h5">Estate Wishes Minimum Age</Typography>
              <Typography>
                {watch("trustee_responsibility_minimum_age") === 1
                  ? "18"
                  : watch("trustee_responsibility_minimum_age") === 2
                  ? "21"
                  : "25"}
              </Typography>
              <Typography variant="h5" mt={1}>
                {`Successor Trustee’s Responsibilities`}
              </Typography>
              <Typography>{watch("trustee_responsibility")}</Typography>
            </Grid>
            {!watch("property_division_skip") && <Divider sx={{ my: 2 }} />}
            {!watch("property_division_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">
                  Division of properties and tangible assets
                </Typography>
                <Typography>{watch("property_division")}</Typography>
              </Grid>
            )}
            {!watch("property_division_skip") && <Divider sx={{ my: 2 }} />}
            {!watch("gifts_to_other_people_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">
                  Gifts to other people or charities
                </Typography>
                <Typography>{watch("gifts_to_other_people")}</Typography>
              </Grid>
            )}
            {!watch("gifts_to_other_people_skip") && <Divider sx={{ my: 2 }} />}
            {!watch("retirement_and_insurance_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">
                  Retirement, life insurance and other investments
                </Typography>
                <Typography>{watch("retirement_and_insurance")}</Typography>
              </Grid>
            )}
            {!watch("retirement_and_insurance_skip") && (
              <Divider sx={{ my: 2 }} />
            )}
            {!watch("wishes_for_pets_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">Wishes for pets</Typography>
                <Typography>{watch("wishes_for_pets")}</Typography>
              </Grid>
            )}
            {!watch("wishes_for_pets_skip") && <Divider sx={{ my: 2 }} />}
            {!watch("businesses_and_social_media_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">
                  Businesses and Social media
                </Typography>
                <Typography>{watch("businesses_and_social_media")}</Typography>
              </Grid>
            )}
            {!watch("businesses_and_social_media_skip") && (
              <Divider sx={{ my: 2 }} />
            )}
            {!watch("debts_or_loans_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">Debts or Loans</Typography>
                <Typography>{watch("debts_or_loans")}</Typography>
              </Grid>
            )}
            {!watch("debts_or_loans_skip") && <Divider sx={{ my: 2 }} />}

            {!watch("trustee_compensation_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">
                  Trustee and Professional Compensation
                </Typography>
                <Typography>{watch("trustee_compensation")}</Typography>
              </Grid>
            )}
            {!watch("trustee_compensation_skip") && <Divider sx={{ my: 2 }} />}
            {!watch("additional_skip") && (
              <Grid item xs={12}>
                <Typography variant="h5">
                  Anything you would like to add?
                </Typography>
                <Typography>{watch("additional")}</Typography>
              </Grid>
            )}
          </BoxWrapper>
        </Grid>
      </Grid>
      {/* EDIT MODAL */}
      <EditPopUp
        handleChangeStep={() => handleChangeStep(3)}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default FourthStep;
