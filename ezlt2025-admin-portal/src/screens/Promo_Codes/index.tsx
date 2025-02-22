"use client";
import Pageheader from "@/components/PageHeader";
import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import promoData from "./data.json";
import { Check, Done, DoneOutline } from "@mui/icons-material";
import { toast } from "react-toastify";
import CustomCard from "@/components/Card";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import DangerousIcon from "@mui/icons-material/Dangerous";
import SideDrawer from "@/components/Drawer";
import {
  useBulkDeletePromoCode,
  usePromoCodeListing,
} from "@/provider/PromoCode";
import moment from "moment";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import ProCodeForm from "./ProCodeForm";
import CustomCheckBox from "@/components/CustomCheckBox";
import usePaginationState from "@/hooks/usePaginationState";
import { useStats } from "@/provider/stats";

const PromoCodeScreen = () => {
  const [copy, setCopy] = useState(false);
  const [tabValue, setTabValue] = useState("ACTIVE");
  const [copyIndex, setCopyIndex] = useState<null | number>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [promoCodeData, setPromoCodeData] = useState(null);
  const [isPromoCodeUpdate, setIsPromoCodeUpdate] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const stats = useStats({});

  const {
    pagination,
    setPagination,
    queryParams,
  } = usePaginationState();

  const promocodes = usePromoCodeListing({
    ...queryParams,
    status:tabValue
  });

  const {
    rowCount,
  } = usePaginationState(promocodes?.data?.total);

  const bulkDeletePromoCodes = useBulkDeletePromoCode();
  const handleCopy = (value: string, index: number) => {
    toast.success("Promo code copied successfully", {
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
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setIsPromoCodeUpdate(false);
    // setPromoCodeData(promoCodeData);
  };
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
    setIsPromoCodeUpdate(false);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Promo Code",
      flex: 1,
    },
    {
      field: "discountInPercentage",
      headerName: "Discount",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.discountInPercentage} %` || "-",
    },
    {
      field: "totalUsesAllowed",
      headerName: "Total User Allowed",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.totalUsesAllowed != 0
          ? params?.row?.totalUsesAllowed
          : "N/A",
    },
    {
      field: "limitPerUser",
      headerName: "Limit Per User",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.limitPerUser != 0 ? params?.row?.limitPerUser : "N/A",
    },
    {
      field: "CreatedAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.createdAt != null
          ? moment(params?.row?.createdAt).utc().format("DD-MM-YYYY")
          : "-",
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.expiryDate != null
          ? moment(params?.row?.expiryDate).utc().format("DD-MM-YYYY")
          : "-",
    },
    {
      field: "description",
      headerName: "Message/Description",
      flex: 2,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.description != null ? params?.row?.description : "-",
    },
    {
      field: "Actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              {params?.row?.id === copyIndex && copy ? (
                <IconButton aria-label="copy" size="medium">
                  <Done
                    sx={{
                      fontSize: "24px",
                      color: (theme: any) => theme.palette?.primary?.main,
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="copy"
                  size="medium"
                  onClick={() => handleCopy(params?.row?.code, params?.row?.id)}
                >
                  <ContentCopyIcon
                    sx={{
                      fontSize: "24px",
                      color: (theme: any) => theme.palette?.primary?.main,
                    }}
                  />
                </IconButton>
              )}
            </Box>
            <Box>
              <BorderColorTwoToneIcon
                color="primary"
                onClick={() => {
                  setPromoCodeData({
                    ...params?.row,
                    expiryDate: moment(params?.row?.expiryDate).utc().format(),
                    isUnlimitedTotalUses: !params?.row?.isUnlimitedTotalUses,
                    isUnlimitedTotalUsesPerUser:
                      !params?.row?.isUnlimitedTotalUsesPerUser,
                  });
                  setIsPromoCodeUpdate(true);
                  setDrawerOpen(true);
                }}
                sx={{
                  cursor: "pointer",

                  fontSize: "26px",
                  p: "2px",
                }}
              />
            </Box>
          </Box>
        </>
      ),
    },
  ];

  const handleDeletePromoCode = async () => {
    // selectionModel;
    const deleteCodes = await bulkDeletePromoCodes.mutateAsync({
      ids: selectionModel,
    });
    if (deleteCodes) {
      toast.success("Promo Codes deleted successfully", {
        position: "top-right",
      });
      setSelectionModel([]);
    }
  };
  // const filterPromoCodes = () => {
  //   if (!promocodes?.data?.data) return [];
  //   return promocodes.data.data.filter((promo) => {
  //     if (tabValue === "ACTIVE") {
  //       return !promo.isExpired;
  //     } else {
  //       return promo.isExpired;
  //     }
  //   });
  // };

  // const getPromoCodeCount = (isExpired: boolean) => {
  //   if (!promocodes?.data?.data) return 0;
  //   return promocodes.data.data.filter((promo) => promo.isExpired === isExpired)
  //     .length;
  // };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pageheader title="Promo Code" />
        <Button
          sx={{
            background: (theme) => theme.palette.primary.main,
            ":disabled": {
              background: (theme) => theme.palette.primary.main,
            },
            height: "40px",
            mt: 2,
            maxWidth: "fit-content",
          }}
          // disabled={loading}
          onClick={handleOpenDrawer}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          <LocalOfferRoundedIcon sx={{ mr: 1 }} fontSize="medium" /> Generate
          Code
        </Button>
      </Box>
      <Box sx={{ height: "70vh", mt: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="promo code tabs"
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          sx={{
            mb: 4,
            "& .MuiTab-root": {
              color: "#000",
              textTransform: "capitalize",
              width: "200px",
              textAlign: "left",
              marginRight: "15px",
              background: "rgb(255, 255, 255)",
              boxShadow:
                "rgba(145, 158, 171, 0.08) 0px 0px 2px 0px,rgba(145, 158, 171, 0.08) 0px 12px 24px -4px",
              borderRadius: "16px",
              p: 2,
            },
            "& .Mui-selected": {
              color: (theme) => `${theme.palette.primary.dark}!important`,
              fontWeight: "bold",
              border: "3px solid #fba440",
              borderRadius: "16px",
              // background: (theme) => theme.palette.primary.main,
            },
            "& .MuiButtonBase-root": {
              display: "block",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#000",
            },
          }}
        >
          <Tab
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0",
                  width: "140px",
                }}
              >
                <DoneOutline sx={{ fontSize: "40px", color: "green" }} />
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "26px",
                      color: "green",
                    }}
                  >
                    {stats?.data?.total_active_promo_codes || 0}
                  </Typography>
                  <Typography
                    sx={{ color: "grey" }}
                    fontWeight={600}
                    fontSize={16}
                  >
                    Active
                  </Typography>
                </Box>
              </Box>
            }
            value={"ACTIVE"}
          />
          <Tab
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0",
                  width: "140px",
                }}
              >
                <DangerousIcon sx={{ fontSize: "40px", color: "red" }} />
                <Box>
                  <Typography sx={{ fontWeight: "bold", fontSize: "26px" }}>
                    {stats?.data?.total_expired_promo_codes || 0}
                  </Typography>
                  <Typography
                    sx={{ color: "grey" }}
                    fontWeight={600}
                    fontSize={16}
                  >
                    Expired
                  </Typography>
                </Box>
              </Box>
            }
            value={"EXPIRED"}
          />
        </Tabs>
        <>
          {selectionModel?.length ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                sx={{ background: "red", color: "white", mb: 1 }}
                onClick={() => handleDeletePromoCode()}
                disabled={bulkDeletePromoCodes.isLoading}
              >
                {bulkDeletePromoCodes.isLoading ? (
                  <CircularProgress size={20} sx={{ color: "#ffff" }} />
                ) : (
                  "Delete selected"
                )}
              </Button>
            </Box>
          ) : null}
        </>
        <CustomCard>
          <DataGrid
            sx={{
              "span.MuiButtonBase-root.MuiCheckbox-root": {
                color: (theme) => theme.palette.text.disabled,
              },
              "span.MuiButtonBase-root.MuiCheckbox-root.Mui-checked": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
            getRowId={(row) => row.id}
            rows={promocodes?.data?.data || []}
            // rows={filterPromoCodes()}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            density="compact"
            loading={promocodes?.isFetching}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            onRowSelectionModelChange={(newSelectionModel: any) => {
              setSelectionModel(newSelectionModel);
            }}
            rowSelectionModel={selectionModel}
            checkboxSelection={true}
            pageSizeOptions={[25, 50, 100]}
            rowCount={rowCount}
            paginationModel={pagination}
            paginationMode="server"
            onPaginationModelChange={setPagination}
          />
        </CustomCard>
      </Box>

      <Backdrop
        sx={{
          color: "#fff",
        }}
        open={drawerOpen}
      >
        <SideDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          title={isPromoCodeUpdate ? "Update Promo Code" : " Promo Code"}
        >
          <ProCodeForm
            handleDrawerClose={handleDrawerClose}
            promoCodeData={isPromoCodeUpdate ? promoCodeData : null}
            isPromoCodeUpdate={isPromoCodeUpdate}
          />
        </SideDrawer>
      </Backdrop>
    </>
  );
};

export default PromoCodeScreen;
