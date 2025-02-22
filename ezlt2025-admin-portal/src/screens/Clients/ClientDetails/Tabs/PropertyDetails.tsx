import React from "react";
import {
  Box,
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

interface root {
  primary_address_property_detail: {
    buildings: Object;
    lastMarketSale: Object;
    legalAndVesting: {
      assessorsParcelNumber: string;
      countyName: string;
      ownerVestingCode: string;
      shortLegalDescription: string;
    };
    mostRecentOwnerTransfer: Object;
    ownership: {
      data: {
        currentOwnerMailingInfo: {
          mailingAddress: {
            streetAddress: string;
          };
        };
        currentOwners: {
          ownerNames: string[];
        };
      };
    };
    siteLocation: Object;
    taxAssessment: Object;
  };
  investment_properties: {
    primary_address: Object;
    property_detail: Object;
    residence_detail: string;
  }[];
}
interface IProppertyProps {
  data: root;
}

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

const PropertyDetails = ({ data }: any) => {
  return (
    <>
      <Box>
        <Box sx={{ mb: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell width={1}>Property Type</StyledTableCell>
                  <StyledTableCell width={1}>Primary</StyledTableCell>
                  <StyledTableCell width={1}>Investment 1</StyledTableCell>
                  <StyledTableCell width={1}>Investment 2</StyledTableCell>
                  <StyledTableCell width={1}>Investment 3</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Physical address</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address?.name || "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.primary_address?.name || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Prepare Quit Claim document</strong>
                  </StyledTableCell>
                  <StyledTableCell>{data?.quit_claim || "-"}</StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.quit_claim || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Ownership percentage</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.residence_detail || "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.residence_detail || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Property question</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_questions || "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.property_address_questions || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Mailing address</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.mailingAddress ||
                      "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.property_detail?.mailingAddress || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell>
                    <strong>APN</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.apn || "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.property_detail?.apn || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>County Name</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.countyName || "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.property_detail?.countyName || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Owner 1</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.owner?.currentOwners
                      ?.ownerNames[0]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[0]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[0]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[1]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[0]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[2]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[0]?.fullName || "-"}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Owner 2</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.owner?.currentOwners
                      ?.ownerNames[1]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[0]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[1]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[1]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[1]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[2]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[1]?.fullName || "-"}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Owner 3</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.owner?.currentOwners
                      ?.ownerNames[2]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[0]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[2]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[1]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[2]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[2]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[2]?.fullName || "-"}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Owner 4</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.owner?.currentOwners
                      ?.ownerNames[3]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[0]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[3]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[1]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[3]?.fullName || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.investment_properties[2]?.property_detail?.owner
                      ?.currentOwners?.ownerNames[3]?.fullName || "-"}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Vesting</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.vesting || "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.property_detail?.vesting || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Vesting OwnerShip</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.vestingOwnerShip ||
                      "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.property_detail?.vestingOwnerShip || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <strong>Brief Description</strong>
                  </StyledTableCell>
                  <StyledTableCell>
                    {data?.primary_address_property_detail?.description || "-"}
                  </StyledTableCell>
                  {data?.investment_properties?.length > 0 ? (
                    data?.investment_properties?.map(
                      (item: any, index: number) => (
                        <StyledTableCell key={index}>
                          {item?.property_detail?.description || "-"}
                        </StyledTableCell>
                      ),
                    )
                  ) : (
                    <>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                      <StyledTableCell>-</StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default PropertyDetails;
