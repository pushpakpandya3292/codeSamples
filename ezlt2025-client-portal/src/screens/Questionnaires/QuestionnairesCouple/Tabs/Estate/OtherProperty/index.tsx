import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  BoxWrapper,
  ToggleBox,
} from "@/screens/Questionnaires/QuestionnairesCouple/Styled";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Paper,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import CustomButton from "@/components/CustomButton";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomizedSwitches from "@/components/CustomSwitch";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import {
  MarriageStatusEnum,
  PrimaryResidenceEnum,
  PropertyQuestionsEnum,
  PropertySearchEnum,
} from "../../../constants";
import { usePropertiesDetail } from "@/provider/properties";
import { toast } from "react-toastify";
import CustomTextField, {
  renderFieldProps,
} from "@/components/CustomTextField/CustomTextField";
import { MailingAddressEnum } from "@/screens/Questionnaires/types";
import PropertyNotFound from "@/components/PropertyNotFound";

const PrimaryResidence = [
  {
    label: "Full - Only we are on the deed",
    value: PrimaryResidenceEnum.COUPLE_FULLY_OWN,
  },
  {
    label: "Partial - We have half or partial ownership with someone else",
    value: PrimaryResidenceEnum.COUPLE_PARTIALLY_OWN,
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

const OtherProperty = () => {
  const { control, watch, setValue, getValues } = useFormContext();
  const propertyDetial = usePropertiesDetail({});

  const [investmentProperties, setInvestmentProperties] = useState(
    watch("investment_properties").length === 0
      ? [{}]
      : watch("investment_properties"),
  );
  const [propertyIndex, setPropertyIndex] = useState<number | null>(null);
  const handleAddProperty = () => {
    if (investmentProperties.length < 3) {
      setInvestmentProperties([...investmentProperties, []]);
    }
  };
  const handleRemoveProperty = (index: number) => {
    if (investmentProperties.length > 1) {
      const updatedProperties = [...investmentProperties];
      updatedProperties.splice(index, 1);
      setInvestmentProperties(updatedProperties);
      setValue("investment_properties", updatedProperties);
    }
  };
  useEffect(() => {
    if (!watch("investment_property")) {
      setValue("investment_properties", []);
    }
  }, [watch("investment_property")]);

  useEffect(() => {
    if (propertyDetial?.data && propertyIndex !== null) {
      setValue(
        `investment_properties[${propertyIndex}].property_api_details`,
        propertyDetial?.data as any,
      );
      setValue(
        `investment_properties[${propertyIndex}].is_check_county_record`,
        true,
      );
      setPropertyIndex(null);
    }
  }, [propertyDetial?.data]);

  useEffect(() => {
    if (propertyDetial?.error) {
      toast.error("Property detail not found", { position: "top-right" });
      setValue(
        `investment_properties[${propertyIndex}].property_api_details`,
        false,
      );
      setValue(
        `investment_properties[${propertyIndex}].is_check_county_record`,
        true,
      );
      setPropertyIndex(null);
    }
  }, [propertyDetial?.error]);
  return (
    <Box>
      <Typography sx={{ pb: 2 }} variant="h2">
        Probate Protection (Investment Property)
      </Typography>
      <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
        <ToggleBox
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography variant="h4">
            Do you have investment properties you want to protect?
          </Typography>
          <Controller
            name={"investment_property"}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CustomizedSwitches
                {...field}
                setChecked={(value: boolean) => {
                  setValue("investment_property", value);
                }}
                checked={watch("investment_property")}
              />
            )}
          />
        </ToggleBox>
        <Typography
          sx={{
            color: (theme) => theme.additionalColors?.tablightBlue,
            mt: 1,
            ml: 1,
          }}
        >
          We’ll add $100 document preparation fee for each property to your
          shopping cart.
        </Typography>
      </Box>
      {watch("investment_property") && (
        <>
          {investmentProperties?.map((property: any, index: number) => (
            <Grid key={index} sx={{ my: 2 }} item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  mb: 2,
                }}
              >
                <Typography variant="h2" ml={1}>
                  Investment Property {index + 1}
                </Typography>
                {index > 0 && (
                  <CustomButton
                    onClick={() => handleRemoveProperty(index)}
                    type="CANCEL"
                    width="20px"
                    height="20px"
                  >
                    Remove
                  </CustomButton>
                )}
              </Box>
              <Grid container columnSpacing={2}>
                <Grid item xs={12} md={6}>
                  <BoxWrapper>
                    <Box mb={3}>
                      <Typography variant="h2" fontSize={"16px"} mb={2}>
                        Investment property address
                      </Typography>
                      <Controller
                        name={`investment_properties[${index}].investment_property_primary_home_address`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <GoogleMaps>
                              <GoogleMaps.AutoComplete
                                {...field}
                                name={`investment_properties[${index}].investment_property_primary_home_address`}
                                defaultValue={watch(
                                  `investment_properties[${index}].investment_property_primary_home_address`,
                                )}
                                onAddressChange={(autoAddress: any) => {
                                  setValue(
                                    `investment_properties[${index}].investment_property_primary_home_address`,
                                    autoAddress,
                                  );
                                  setValue(
                                    `investment_properties[${index}].property_api_details`,
                                    null,
                                  );
                                  setValue(
                                    `investment_properties[${index}].is_check_county_record`,
                                    false,
                                  );
                                  setValue(
                                    `investment_properties[${index}].property_question`,
                                    null,
                                  );
                                }}
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
                    </Box>
                    <Box>
                      <Typography variant="h2" fontSize={"16px"}>
                        Mailing Address to receive county documents
                      </Typography>
                      <Typography variant="h5" mb={1}>
                        Where do you want your county documents and tax bill
                        mailed?
                      </Typography>
                      <Controller
                        name={`investment_properties[${index}].mailing_address_checkbox`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <RadioGroup {...field}>
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
                              <CustomErrorMessage
                                error={error?.message ?? {}}
                              />
                            )}
                          </RadioGroup>
                        )}
                      />
                      {watch(
                        `investment_properties[${index}].mailing_address_checkbox`,
                      ) === MailingAddressEnum.IS_MAILING_ADDRESS && (
                        <>
                          <Typography
                            sx={{ mb: 2 }}
                            variant="h2"
                            mt={1}
                            fontSize={"16px"}
                          >
                            Mailing Address
                          </Typography>
                          <Controller
                            name={`investment_properties[${index}].mailing_address_field`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <GoogleMaps>
                                  <GoogleMaps.AutoComplete
                                    {...field}
                                    name={`investment_properties[${index}].mailing_address_field`}
                                    defaultValue={watch(
                                      `investment_properties[${index}].mailing_address_field`,
                                    )}
                                    onAddressChange={(autoAddress: any) => {
                                      setValue(
                                        `investment_properties[${index}].mailing_address_field`,
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
                    <Box mt={2}>
                      <Typography variant="h2" fontSize={"16px"} mt={1}>
                        Ownership percentage
                      </Typography>
                      <Typography variant="h5" mb={1}>
                        To properly prepare your Quit Claim, enter ownership
                        type
                      </Typography>
                      <Controller
                        name={`investment_properties[${index}].property_ownership_status`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CustomTextField
                            {...field}
                            {...renderFieldProps(error)}
                            label={"Investment Property"}
                            select
                            sx={{ mt: 1 }}
                            SelectProps={{
                              MenuProps: {
                                PaperProps: {
                                  sx: {
                                    width: { xs: "min-content", md: "300px" },
                                  },
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
                      {/* <Controller
                        name={`investment_properties[${index}].property_ownership_status`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <RadioGroup {...field}>
                            {PrimaryResidence?.map((el, i) => (
                              <CustomRadioButton
                                key={i}
                                value={el.value}
                                label={el?.label}
                              />
                            ))}
                            {error?.message && (
                              <CustomErrorMessage
                                error={error?.message ?? {}}
                              />
                            )}
                          </RadioGroup>
                        )}
                      /> */}
                    </Box>
                    <Button
                      onClick={() => {
                        setPropertyIndex(index);
                        propertyDetial.mutate({
                          // prettier-ignore
                          address: watch(`investment_properties[${index}].investment_property_primary_home_address`),
                          planId: getValues("plan_id"),
                          marriageStatus:
                            MarriageStatusEnum[
                              getValues(
                                "marriage_status",
                              ) as keyof typeof MarriageStatusEnum
                            ],
                          propertySearchEnumValue:
                            PropertySearchEnum[
                              `${
                                PropertySearchEnum[index + 2]
                              }` as keyof typeof PropertySearchEnum
                            ],
                        });
                      }}
                      sx={{
                        mt: 2,
                        background: (theme) => theme.palette.error.dark,
                      }}
                      variant="contained"
                    >
                      View County Records
                    </Button>
                    <Controller
                      name={`investment_properties[${index}].is_check_county_record`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          {error?.message && (
                            <CustomErrorMessage error={error?.message ?? {}} />
                          )}
                        </>
                      )}
                    />
                  </BoxWrapper>
                  <BoxWrapper sx={{ mt: 1 }}>
                    <Box
                      sx={{
                        height: "250px",
                        width: "100%",
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <GoogleMaps.Map
                        address={watch(
                          `investment_properties[${index}].investment_property_primary_home_address`,
                        )}
                      />
                    </Box>
                  </BoxWrapper>
                </Grid>
                <Grid xs={12} md={6} item>
                  {propertyDetial.isError &&
                    !watch(
                      `investment_properties[${index}].property_api_details`,
                    ) && <PropertyNotFound />}
                  {propertyDetial.isLoading && propertyIndex === index ? (
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
                    // prettier-ignore
                    watch(`investment_properties[${index}].property_api_details`)
                    && (
                      <BoxWrapper
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography sx={{}} variant="h3">
                          Verify County Records
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <TableContainer component={Paper}>
                          <Table aria-label="customized table">
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
                                <StyledTableCell component="th" scope="row">
                                  Property address
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {watch(`investment_properties[${index}].investment_property_primary_home_address`)?.name || "-"}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  Property type
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {watch(`investment_properties[${index}].property_api_details`)?.siteLocation?.data?.landUseAndZoningCodes?.countyLandUseDescription ||
                                    "-"}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  {`Assessor's Parcel Number`}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {watch(`investment_properties[${index}].property_api_details`)
                                    ?.legalAndVesting?.assessorsParcelNumber ||
                                    "-"}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  Mailing Address
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {watch(`investment_properties[${index}].property_api_details`)
                                    ?.ownership?.data?.currentOwnerMailingInfo
                                    ?.mailingAddress?.streetAddress || "-"}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  County Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {watch(`investment_properties[${index}].property_api_details`)?.legalAndVesting?.countyName || "-"}
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  Vesting
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {watch(`investment_properties[${index}].property_api_details`)
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
                                  {watch(`investment_properties[${index}].property_api_details`)
                                    ?.legalAndVesting?.shortLegalDescription ||
                                    "-"}
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Box sx={{
                          width: "100%",
                          mt: 3.5,
                          borderRadius: "12px",
                          background: "#F4F6F9",
                          px: 4,
                          py: 2,
                        }}>
                          <Typography sx={{ my: 1 }} variant="body1">
                            Please Select One :
                          </Typography>
                          <Controller
                            name={`investment_properties[${index}].property_question`}
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
                                  <CustomErrorMessage
                                    error={error?.message ?? {}}
                                  />
                                )}
                              </RadioGroup>
                            )}
                          />
                        </Box>
                      </BoxWrapper>
                    )
                  )}
                  {watch(
                    `investment_properties[${index}].property_api_details`,
                  ) == false && (
                    <Box
                      sx={{
                        width: "100%",
                        mt: 3.5,
                        borderRadius: "12px",
                        background: "#F4F6F9",
                        px: 4,
                        py: 2,
                      }}
                    >
                      <Typography sx={{ my: 1 }} variant="body1">
                        Please Select One :
                      </Typography>
                      <Controller
                        name={`investment_properties[${index}].property_question`}
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
                              <CustomErrorMessage
                                error={error?.message ?? {}}
                              />
                            )}
                          </RadioGroup>
                        )}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
          {investmentProperties.length <= 2 && (
            <CustomButton
              width="250px"
              icon={<Add />}
              type="ADD"
              onClick={handleAddProperty}
            >
              Add another
            </CustomButton>
          )}
        </>
      )}
    </Box>
  );
};

export default OtherProperty;
