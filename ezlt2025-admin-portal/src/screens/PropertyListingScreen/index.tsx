"use client";
import {
  Backdrop,
  Box,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import { usePropertyListing } from "@/provider/Property";
import { Done, RemoveRedEyeOutlined } from "@mui/icons-material";
import SideDrawer from "@/components/Drawer";
import { toast } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import usePaginationState from "@/hooks/usePaginationState";

const PropertyListingScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copy, setCopy] = useState(false);
  const [copyIndex, setCopyIndex] = useState<null | number>(null);
  const [descriptionValue, setDescriptionValue] = useState<any>({});
     
  const {
    pagination,
    setPagination,
    queryParams,
  } = usePaginationState();

  const propertyListing = usePropertyListing({
    ...queryParams,
  });

  const {
    rowCount,
  } = usePaginationState(propertyListing?.data?.total);

  const handleDrawData = (row: any) => {
    setDescriptionValue(row);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleCopy = (value: string, index: number) => {
    toast.success("Text Copied Successfully", {
      position: "top-right",
    });
    setCopyIndex(index);
    setCopy(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopy(false);
      setCopyIndex(null);
    }, 1000);
  };
  const columns: GridColDef[] = [
    {
      field: "streetAddress",
      headerName: "Physical Address",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "apn",
      headerName: "APN",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.propertyDetail?.apn || "-",
    },
    {
      field: "countyName",
      headerName: "County Name",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.propertyDetail?.countyName || "-",
    },
    {
      field: "vesting",
      headerName: "Vesting",
      flex: 1,
      minWidth: 120,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.propertyDetail?.vesting || "-",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 70,
      renderCell: (params) => (
        <RemoveRedEyeOutlined
          sx={{ color: "#4b8ad1", cursor: "pointer" }}
          onClick={() => {
            handleDrawData(params?.row);
            setDrawerOpen(true);
          }}
        />
      ),
    },
  ];
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
        <Box>
          <Pageheader title="Property Listing" />
        </Box>
      </Box>
      <Box sx={{ height: "70vh", mt: 2 }}>
        <CustomCard>
          <DataGrid
            rowSelection={false}
            rows={(propertyListing?.data?.data as any) || []}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
            loading={propertyListing?.isFetching}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            density="compact"
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            rowCount={rowCount}
            paginationModel={pagination}
            paginationMode="server"
            onPaginationModelChange={setPagination}
          />
        </CustomCard>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={drawerOpen}
      >
        <SideDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          title="Property Detail"
        >
          <TableContainer>
            <Table
              sx={{ minWidth: "100%" }}
              size="small"
              aria-label="simple table"
            >
              <TableRow>
                <TableCell width={"20%"}>
                  <strong>Physical Address</strong>
                </TableCell>
                <TableCell>{descriptionValue?.streetAddress || "-"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Mailing Address</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.mailingAddress || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>APN</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.apn || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>County Name</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.countyName || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Vesting</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.vesting || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Vesting OwnerShip</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.vestingOwnershipRight ||
                    "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Owner 1</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.owner?.currentOwners
                    ?.ownerNames[0]?.fullName || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Owner 2</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.owner?.currentOwners
                    ?.ownerNames[1]?.fullName || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Owner 3</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.owner?.currentOwners
                    ?.ownerNames[2]?.fullName || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Owner 4</strong>
                </TableCell>
                <TableCell>
                  {descriptionValue?.propertyDetail?.owner?.currentOwners
                    ?.ownerNames[3]?.fullName || "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={150}>
                  <strong>Brief Description</strong>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box width={"95%"} borderRight={"1px solid #ccc"}>
                      {descriptionValue?.propertyDetail?.description || "-"}
                    </Box>
                    <Box width={"5%"} textAlign={"center"}>
                      {descriptionValue?.propertyDetail?.description ===
                        copyIndex && copy ? (
                        <IconButton aria-label="copy" size="medium">
                          <Done
                            sx={{
                              fontSize: "24px",
                              color: (theme: any) =>
                                theme.palette?.primary?.main,
                            }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label="copy"
                          size="medium"
                          onClick={() =>
                            handleCopy(
                              descriptionValue?.propertyDetail?.description,
                              1,
                            )
                          }
                        >
                          <ContentCopyIcon
                            sx={{
                              fontSize: "24px",
                              color: (theme: any) =>
                                theme.palette?.primary?.main,
                            }}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Detail Description</strong>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box width={"95%"} borderRight={"1px solid #ccc"}>
                      {descriptionValue?.propertyDetail?.longDescription || "-"}
                    </Box>
                    <Box width={"5%"} textAlign={"center"}>
                      {descriptionValue?.propertyDetail?.longDescription ===
                        copyIndex && copy ? (
                        <IconButton aria-label="copy" size="medium">
                          <Done
                            sx={{
                              fontSize: "24px",
                              color: (theme: any) =>
                                theme.palette?.primary?.main,
                            }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label="copy"
                          size="medium"
                          onClick={() =>
                            handleCopy(
                              descriptionValue?.propertyDetail?.longDescription,
                              2,
                            )
                          }
                        >
                          <ContentCopyIcon
                            sx={{
                              fontSize: "24px",
                              color: (theme: any) =>
                                theme.palette?.primary?.main,
                            }}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </SideDrawer>
      </Backdrop>
    </>
  );
};

export default PropertyListingScreen;
