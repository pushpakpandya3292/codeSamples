import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Grid,
  RadioGroup,
  Typography,
  MenuItem,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Table,
  TableBody,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { BoxWrapper } from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import CustomCheckBox from "@/components/CustomCheckBox";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import { usePropertiesDetail } from "@/provider/properties";
import {
  HomeTrustEnum,
  MarriageStatusEnum,
  PrimaryResidenceEnum,
  PropertyQuestionsEnum,
  PropertySearchEnum,
  QuitClaimEnum,
  RentPropertyEnum,
} from "../../../constants";
import { toast } from "react-toastify";
import SideDrawer from "@/components/Drawer";
import { MailingAddressEnum, TypeOfPropertyEnum } from "@/screens/Questionnaires/types";
import PropertyNotFound from "@/components/PropertyNotFound";
const RentProperty = [
  {
    label: "I own this property",
    value: RentPropertyEnum.I_OWN_PROPERTY,
  },
  {
    label: "I rent this property",
    value: RentPropertyEnum.I_RENT_PROPERTY,
  },
];
const HomeTrust = [
  {
    label: "Yes, absolutely",
    value: HomeTrustEnum.Yes,
  },
  {
    label: "No, I don’t want",
    value: HomeTrustEnum.No,
  },
];
const PrimaryResidence = [
  {
    label: "We fully own this property  (with or without a mortgage)",
    value: PrimaryResidenceEnum.COUPLE_FULLY_OWN,
  },
  {
    label: "We partially own this property with another person(s)",
    value: PrimaryResidenceEnum.COUPLE_PARTIALLY_OWN,
  },
  {
    label: "No, we rent this property",
    value: PrimaryResidenceEnum.COUPLE_RENT,
  },
];
const QuitCliams = [
  {
    label: "Yes, please prepare the Quit Claim for this property (included) ",
    value: QuitClaimEnum.COUPLE_PREPARE_CLAIM,
  },
  {
    label: "No, we don’t want to protect this property at this time. ",
    value: QuitClaimEnum.COUPLE_DONT_PREPARE_CLAIM,
  },
  {
    label: "No, our property is already protected by an existing Trust. ",
    value: QuitClaimEnum.COUPLE_PROPERTY_ALREADY_PROTECTED,
  },
];
const PropertyQuestions = [
  {
    label: "The data is correct. We are the full and sole owners.",
    value: PropertyQuestionsEnum.CORRECT_OWN,
  },
  {
    label: "The data is NOT correct. Please contact me.",
    value: PropertyQuestionsEnum.NOT_CORRECT_CONTACT_ME,
  },
  {
    label:
      "The data is NOT correct. My deceased spouse or someone else is on the deed. Please contact me to correct this.",
    value: PropertyQuestionsEnum.DECEASED_SPOUSE_ON_DEED,
  },
  {
    label:
      "The data is correct, but I don't want to put my home in a Trust at this time.",
    value: PropertyQuestionsEnum.CORRECT_DONT_WANT,
  },
  {
    label: "There was a data error. I was unable to view my County records.",
    value: PropertyQuestionsEnum.UNABLE_TO_VIEW,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
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

const PrimaryHome = () => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const propertyDetial = usePropertiesDetail({});
  useEffect(() => {
    if (propertyDetial?.data) {
      setValue("primary_home_property_api_details", propertyDetial?.data);
      setValue("is_check_county_record", true);
    }
  }, [propertyDetial?.data]);
  useEffect(() => {
    if (propertyDetial?.error) {
      toast.error("Property detail not found", { position: "top-right" });
      setValue("primary_home_property_api_details", undefined);
    }
  }, [propertyDetial?.error]);
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  // useEffect(() => {
  //   if (errors?.property_question?.message) {
  //     setDrawerOpen(true);
  //   }
  // }, [errors?.property_question]);
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ pb: 2 }} variant="h2">
        Probate Protection (Primary residence)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <BoxWrapper
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Box>
              <Typography variant="h2" fontSize={"16px"}>
                Do you want put your home into the Trust name?
              </Typography>
              <Typography variant="h5">
                We’ll prepare the Quit Claim documents for your primary home
              </Typography>
              <Typography sx={{ my: 1 }} variant="body1">
                Quit Claim instructions
              </Typography>
              <Controller
                name={"quit_qlaim"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    {...renderFieldProps(error)}
                    label={"Shall we prepare the Quit Claim document?"}
                    select
                    sx={{ mt: 1 }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: { width: { xs: "min-content", md: "300px" } },
                        },
                      },
                    }}
                  >
                    {QuitCliams?.map((quitclaim, index) => {
                      return (
                        <MenuItem key={index} value={quitclaim.value}>
                          <Typography
                            sx={{
                              color: "black",
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              fontWeight: "400",
                            }}
                          >
                            {quitclaim?.label}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </CustomTextField>
                )}
              />
            </Box>
            {watch("quit_qlaim") === QuitClaimEnum.COUPLE_PREPARE_CLAIM && (
              <>
                <Box>
                  <Typography variant="h2" fontSize={"16px"} mb={1.5}>
                    Primary home address
                  </Typography>
                  <Controller
                    name="primary_home_address"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <GoogleMaps>
                        <GoogleMaps.AutoComplete
                          {...field}
                          name={"primary_home_address"}
                          defaultValue={watch("primary_home_address")}
                          onAddressChange={(autoAddress: any) => {
                            setValue("primary_home_address", autoAddress);
                          }}
                          placeholder="Enter your Residence Address"
                        />
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </GoogleMaps>
                    )}
                  />
                </Box>
                <Box mt={1}>
                  <Typography variant="h2" fontSize={"16px"}>
                    What type of property is it?
                  </Typography>
                  <Controller
                    name={"property_type_question"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <RadioGroup {...field} sx={{ py: 2 }}>
                        <CustomRadioButton
                          value={TypeOfPropertyEnum.IS_SINGLE_FAMILY}
                          label={
                            <Typography>
                              Single-family house (one unit on one lot)
                            </Typography>
                          }
                        />
                        <CustomRadioButton
                          value={TypeOfPropertyEnum.IS_DUPLEX}
                          label={
                            <Typography>
                              Duplex (two units on one lot)
                            </Typography>
                          }
                        />
                        <CustomRadioButton
                          value={TypeOfPropertyEnum.IS_Multi_UNIT}
                          label={
                            <Typography>
                              Multi-unit (more than two units on one lot)
                            </Typography>
                          }
                        />
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </RadioGroup>
                    )}
                  />
                </Box>
                <Box mt={1}>
                  <Typography variant="h2" fontSize={"16px"}>
                    Mailing Address to receive county documents
                  </Typography>
                  <Typography variant="h5">
                    Where do you want your county documents and tax bill mailed?
                  </Typography>
                  <Controller
                    name={"mailing_address_checkbox"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <RadioGroup {...field} sx={{ py: 2 }}>
                        <CustomRadioButton
                          value={MailingAddressEnum.MAILING_ADDRESS}
                          label={
                            <Typography>
                              Primary:{" "}
                              <small>
                                {watch("primary_home_address")?.name
                                  ? watch("primary_home_address")?.name
                                  : "-"}
                              </small>
                            </Typography>
                          }
                        />
                        <CustomRadioButton
                          value={MailingAddressEnum.IS_MAILING_ADDRESS}
                          label={
                            <Typography>Mail to another address</Typography>
                          }
                        />
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </RadioGroup>
                    )}
                  />
                  {watch("mailing_address_checkbox") ===
                    MailingAddressEnum.IS_MAILING_ADDRESS && (
                    <>
                      <Typography sx={{ mb: 1 }} variant="body1">
                        Mailing Address
                      </Typography>
                      <Controller
                        name={"mailing_address_field"}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <GoogleMaps>
                              <GoogleMaps.AutoComplete
                                {...field}
                                name={"mailing_address_field"}
                                defaultValue={watch("mailing_address_field")}
                                onAddressChange={(autoAddress: any) => {
                                  setValue(
                                    "mailing_address_field",
                                    autoAddress,
                                  );
                                }}
                                placeholder="Enter your Mailing Address"
                              />
                              {error?.message && (
                                <CustomErrorMessage
                                  error={error?.message ?? {}}
                                />
                              )}
                            </GoogleMaps>
                          </>
                        )}
                      />
                    </>
                  )}
                </Box>
                <Box>
                  <Typography variant="h2" fontSize={"16px"}>
                    Ownership percentage of Primary home
                  </Typography>
                  <Typography variant="h5">
                    To properly prepare your Quit Claim, enter ownership type.
                  </Typography>
                  <Controller
                    name={"primary_residence"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CustomTextField
                        {...field}
                        {...renderFieldProps(error)}
                        label={"Primary residence"}
                        select
                        sx={{ mt: 1 }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: { width: { xs: "min-content", md: "300px" } },
                            },
                          },
                        }}
                      >
                        {PrimaryResidence?.map((residence, index) => {
                          return (
                            <MenuItem key={index} value={residence.value}>
                              <Typography
                                sx={{
                                  color: "black",
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                  fontWeight: "400",
                                }}
                              >
                                {residence?.label}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </CustomTextField>
                    )}
                  />
                </Box>
              </>
            )}
          </BoxWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <BoxWrapper sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                height: "250px",
                width: "100%",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <GoogleMaps.Map address={watch("primary_home_address")} />
            </Box>
            {watch("quit_qlaim") === QuitClaimEnum.COUPLE_PREPARE_CLAIM &&
              (watch("primary_residence") ===
                PrimaryResidenceEnum.COUPLE_FULLY_OWN ||
                watch("primary_residence") ===
                  PrimaryResidenceEnum.COUPLE_PARTIALLY_OWN) && (
                <Box sx={{ order: { xs: "-1", sm: "inherit" } }}>
                  <Button
                    variant="contained"
                    sx={{
                      mt: { xs: 0, sm: 2 },
                      mb: { xs: 2, sm: 0 },
                      background: (theme) => theme.palette.error.dark,
                    }}
                    onClick={() => {
                      propertyDetial.mutate({
                        address: watch("primary_home_address"),
                        planId: getValues("plan_id"),
                        marriageStatus:
                          MarriageStatusEnum[
                            getValues(
                              "marriage_status",
                            ) as keyof typeof MarriageStatusEnum
                          ],
                        propertySearchEnumValue:
                          PropertySearchEnum.primary_address,
                      });
                      setDrawerOpen(true);
                      setValue("is_check_county_record", true);
                    }}
                  >
                    View County Records
                  </Button>
                  {errors && errors?.is_check_county_record && (
                    <CustomErrorMessage
                      error={errors?.is_check_county_record?.message || ""}
                    />
                  )}
                </Box>
              )}
            {(watch("primary_home_property_api_details") ||
              watch("primary_home_property_api_details") === undefined) &&
              watch("quit_qlaim") === QuitClaimEnum.COUPLE_PREPARE_CLAIM && (
                <Box
                  sx={{
                    width: "100%",
                    mt: 2,
                    borderRadius: "12px",
                    background: "#F4F6F9",
                    px: { xs: 1.5, sm: 4 },
                    py: 2,
                  }}
                >
                  <Typography sx={{ my: 1 }} variant="body1">
                    Please Select One :
                  </Typography>
                  <Controller
                    name={"property_question"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <RadioGroup {...field}>
                        {PropertyQuestions?.map((el, i) => (
                          <CustomRadioButton
                            key={i}
                            value={el.value}
                            label={el?.label}
                          />
                        ))}
                        {error?.message && (
                          <CustomErrorMessage error={error?.message ?? {}} />
                        )}
                      </RadioGroup>
                    )}
                  />
                </Box>
              )}
          </BoxWrapper>
        </Grid>
      </Grid>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: 9999,
        }}
        open={drawerOpen}
      >
        <SideDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          title="Verify County Records"
          sx={{
            zIndex: 9999,
            width: { xs: "100%", md: "800px" },
            ".MuiPaper-root.MuiPaper-elevation": {
              width: { xs: "100%", md: "800px" },
              maxWidth: { xs: "100%", md: "800px" },
            },
          }}
        >
          {propertyDetial.isError && <PropertyNotFound />}
          {propertyDetial.isLoading ? (
            <BoxWrapper
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <CircularProgress />
              <Typography variant="h2">Loading...</Typography>
            </BoxWrapper>
          ) : (
            watch("primary_home_property_api_details") &&
            watch("quit_qlaim") === QuitClaimEnum.COUPLE_PREPARE_CLAIM && (
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    {/* <TableHead>
                      <TableRow>
                        <StyledTableCell>Key</StyledTableCell>
                        <StyledTableCell align="right">Details</StyledTableCell>
                      </TableRow>
                    </TableHead> */}
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
                          {watch(`primary_home_address`)?.name || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Property type
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {watch(`primary_home_property_api_details`)
                            ?.siteLocation?.data?.landUseAndZoningCodes
                            ?.countyLandUseDescription || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {`Assessor's Parcel Number`}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {watch("primary_home_property_api_details")
                            ?.legalAndVesting?.assessorsParcelNumber || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Mailing Address
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {watch("primary_home_property_api_details")?.ownership
                            ?.data?.currentOwnerMailingInfo?.mailingAddress
                            ?.streetAddress || "-"}
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
                            ?.legalAndVesting?.vestingOwnershipRight || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {watch("primary_home_property_api_details")
                            ?.legalAndVesting?.shortLegalDescription || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: 2,
            }}
          >
            <Button
              onClick={handleDrawerClose}
              sx={{ width: "120px" }}
              variant="contained"
              color="error"
              size="small"
            >
              Close
            </Button>
          </Box>
        </SideDrawer>
      </Backdrop>
    </Box>
  );
};

export default PrimaryHome;
