"use client";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
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
import Pageheader from "@/components/PageHeader";
import CustomButton from "@/components/CustomButton";
import GoogleMaps from "@/components/Maps/GoogleMaps/GoogleMaps";
import { usePropertiesDetail } from "@/provider/propertiesSearch";
import { BoxWrapper } from "@/components/BoxWrapper";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    border: `1px solid ${theme.additionalColors?.mainBorder}`,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));
const PropertySearch = () => {
  const [searchValue, setSearchValue] = useState({
    lat: 34.0879137,
    lng: -118.1828467,
    name: "",
    detail: "",
    streetNumber: "",
    route: "",
    locality: "",
    administrativeAreaLevelOne: "",
    administrativeAreaLevelTwo: "",
    postalCode: "",
    neighborhood: "",
    postalCodeSuffix: "",
  });
  const propertyDetial = usePropertiesDetail({});
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const handleSearch = async () => {
    const propertyData = await propertyDetial.mutateAsync({
      address: searchValue,
    });
    setPropertyDetails({ ...propertyData, ...searchValue });
  };
  useEffect(() => {
    if (propertyDetial?.error) {
      toast.error("Property detail not found", { position: "top-right" });
    }
  }, [propertyDetial?.error]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          mt: 1,
        }}
      >
        <Pageheader title="Search List" />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "50%",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <GoogleMaps>
          <GoogleMaps.AutoComplete
            name={"searchValue"}
            defaultValue={searchValue}
            onAddressChange={(autoAddress: any) => {
              if (autoAddress) setSearchValue(autoAddress);
            }}
          />
        </GoogleMaps>
        <CustomButton
          onClick={handleSearch}
          height="40px"
          width="150px"
          type={"ADD"}
        >
          Search
        </CustomButton>
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} md={6} item>
          <BoxWrapper>
            <Box
              sx={{
                height: "400px",
                width: "100%",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <GoogleMaps.Map address={searchValue || {}} />
            </Box>
          </BoxWrapper>
        </Grid>
        <Grid xs={12} md={6} item>
          {propertyDetial.isError && (
            <BoxWrapper
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWight: 600,
                  textTransform: "capitalize",
                  fontSize: "22px",
                }}
                variant="h4"
              >
                Property detail not found
              </Typography>
            </BoxWrapper>
          )}
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
              <Typography
                sx={{
                  fontWight: 600,
                  textTransform: "capitalize",
                  fontSize: "22px",
                }}
                variant="h4"
              >
                Loading...
              </Typography>
            </BoxWrapper>
          ) : (
            propertyDetial?.data && (
              <BoxWrapper
                sx={{
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWight: 600,
                    textTransform: "capitalize",
                    fontSize: "22px",
                  }}
                  variant="h4"
                >
                  Check the County Records
                </Typography>
                <Divider sx={{ my: 1 }} />
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell width={"25%"}>Key</StyledTableCell>
                        <StyledTableCell align="right">Details</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Physical Address
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {propertyDetails?.name || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Mailing Address
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {propertyDetails?.ownership?.data
                            ?.currentOwnerMailingInfo?.mailingAddress
                            ?.streetAddress || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          APN
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {propertyDetails?.legalAndVesting
                            ?.assessorsParcelNumber || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          County Name
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {propertyDetails?.legalAndVesting?.countyName || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      {propertyDetial?.data &&
                        propertyDetails?.ownership?.data?.currentOwners?.ownerNames?.map(
                          (item: any, index: number) => {
                            return (
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                  Owner {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {item.fullName || "-"}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          },
                        )}
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Vesting
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {propertyDetails?.legalAndVesting?.ownerVestingCode ||
                            "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Vesting OwnerShip
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {propertyDetails?.legalAndVesting?.vestingOwnershipRight ||
                            "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {propertyDetails?.legalAndVesting
                            ?.legalDescription || "-"}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </BoxWrapper>
            )
          )}
        </Grid>
      </Grid>
      {/* <Box sx={{ mb: 2 }}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Key</StyledTableCell>
                                <StyledTableCell align="right">Details</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Property address
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Property type
                                </StyledTableCell>
                                <StyledTableCell align="right"> </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {`Assessor's Parcel Number`}
                                </StyledTableCell>
                                <StyledTableCell align="right"> </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Mailing Address
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    County Name
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Vesting
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    Description
                                </StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box> */}

      {/* <Box sx={{ height: "70vh", mt: 2 }}>
                <CustomCard>
                    <DataGrid
                        rowSelection={false}
                        rows={row || []}
                        columns={columns}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        // loading={clientListing.isFetching}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </CustomCard>
            </Box> */}
    </>
  );
};

export default PropertySearch;
