"use client";
import Link from "next/link";
import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import {
  filtersQuestionnaire,
  FilterUserChipEnum,
  FilterUserEnum,
  getKeyOfEnum,
  getMainStatus,
  MarriageStatusEnum,
} from "@/constant";
import { useUserCart } from "@/provider/Cart";
import { useStats } from "@/provider/stats";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React, { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { useClientRedirect } from "@/provider/ClientLogin";
import { toast } from "react-toastify";
import { CLIENT_PORTAL } from "@/constant";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SideDrawer from "@/components/Drawer";
import dynamic from "next/dynamic";
import StatusChip from "@/components/StatusChip";
import usePaginationState from "@/hooks/usePaginationState";
const Editor = dynamic(() => import("@/components/EmailComposer"), {
  ssr: false,
});

const QuestionareListing = () => {
  const stats: any = useStats({});
  const [filterId, setFilterId] = useState<string | undefined>("PRE");
  const { pagination, setPagination, queryParams } = usePaginationState();

  const questionareListing = useUserCart({
    ...queryParams,
    filterId,
  });

  const { rowCount } = usePaginationState(questionareListing?.data?.total);

  const clientRedirect = useClientRedirect();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = (_email: string) => {
    setUserEmail(_email);
    setDrawerOpen(true);
  };

  useEffect(() => {
    if (clientRedirect.data) {
      toast.success("Redirecting to Client Portal");
      setTimeout(() => {
        window.open(`${CLIENT_PORTAL}${clientRedirect?.data?.accessToken}`);
      }, 1000);
    }
  }, [clientRedirect.isSuccess]);

  useEffect(() => {
    if (clientRedirect.isError) {
      toast.error("Something went wrong");
    }
  }, [clientRedirect.isError]);

  const column: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      minWidth: 120,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={`/dashboard/clients/client-details/${params.row.id}`}>
            <RemoveRedEyeOutlined sx={{ color: "#4b8ad1" }} fontSize="small" />
          </Link>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => handleDrawerOpen(params.row.user?.email)}
          >
            <EmailOutlinedIcon sx={{ color: "#4b8ad1" }} fontSize="small" />
          </Box>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={async () => {
              clientRedirect.mutate({
                id: params.row.user?.id,
              });
            }}
          >
            <LaunchIcon sx={{ color: "#4b8ad1" }} fontSize="small" />
          </Box>
        </Box>
      ),
    },
    {
      field: "main_status",
      headerName: "Main Status",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <StatusChip
          status={
            params?.row?.filterUserStatus
              ? getMainStatus(
                  filtersQuestionnaire,
                  params?.row?.filterUserStatus,
                )
              : "-"
          }
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <StatusChip
          status={
            params?.row?.filterUserStatus
              ? FilterUserChipEnum[
                  getKeyOfEnum(
                    FilterUserEnum,
                    params?.row?.filterUserStatus,
                  ) as keyof typeof FilterUserChipEnum
                ]
              : "-"
          }
        />
      ),
    },
    {
      field: "fullName",
      headerName: "User",
      flex: 1,
      renderCell: (params) => (
        <Link
          style={{ color: "#333" }}
          href={`/dashboard/user-account/detail/${params.row.user.id}`}
        >
          {params?.row?.user?.firstName || ""}{" "}
          {params?.row?.user?.lastName || ""}
        </Link>
      ),
      minWidth: 150,
    },
    {
      field: "PackageName",
      headerName: "Package Name",
      valueGetter: (params: GridValueGetterParams) =>
        `LT-${
          params?.row?.clientDetail?.marriage_status ===
          MarriageStatusEnum.Couple
            ? "C"
            : "I"
        } `,
      flex: 1,
      minWidth: 130,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.clientDetail?.state || "-",
      minWidth: 100,
    },
    {
      field: "TrustName",
      headerName: "Trust Name",
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.clientDetail?.trust_name || "-"}`,
      flex: 1,
      minWidth: 350,
    },
    {
      field: "createdAt",
      headerName: "Date Opened",
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        moment(params?.row?.createdAt).format("MM-DD-YYYY") || "-",
    },
    {
      field: "Days",
      headerName: "Days",
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        moment.utc(params?.row?.createdAt).fromNow() || "-",
    },
    {
      field: "EndUser",
      headerName: "Owner",
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.clientDetail?.end_user || "-"}`,
      flex: 1,
      minWidth: 150,
    },

    {
      field: "primaryTrustee",
      headerName: "Primary Trustee",
      valueGetter: (params: GridValueGetterParams) => {
        return `${
          params?.row?.clientDetail?.PrimaryTrustee?.first_name || "-"
        } ${params?.row?.clientDetail?.PrimaryTrustee?.middle_name || ""} ${
          params?.row?.clientDetail?.PrimaryTrustee?.last_name || "-"
        }`;
      },
      flex: 1,
      minWidth: 200,
    },
    {
      field: "secondaryTrustee",
      headerName: "Secondary Trustee",
      valueGetter: (params: GridValueGetterParams) => {
        return `${
          params?.row?.clientDetail?.SecondaryTrustee?.first_name || "-"
        } ${params?.row?.clientDetail?.SecondaryTrustee?.middle_name || ""} ${
          params?.row?.clientDetail?.SecondaryTrustee?.last_name || "-"
        }`;
      },
      flex: 1,
      minWidth: 200,
    },

    {
      field: "reference_code",
      headerName: "Referral Code",
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.user?.referenceCode || "-"}`,
      flex: 1,
      minWidth: 150,
    },
    {
      field: "steps_compeleted_percentage",
      headerName: "Steps Completed %",
      flex: 1,
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) => {
        const progressPercent =
          params.row?.clientDetail?.steps_completed_percentage || "";
        const numericValue = parseFloat(progressPercent);
        if (!isNaN(numericValue)) {
          return `${numericValue}%`;
        } else {
          return "0%";
        }
      },
      sortComparator: (v1, v2) => {
        return parseFloat(v1) < parseFloat(v2)
          ? -1
          : parseFloat(v1) > parseFloat(v2)
          ? 1
          : 0;
      },
    },
    {
      field: "steps_compeleted",
      headerName: "Steps Completed",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.clientDetail?.steps_completed || "-"}`,
      flex: 1,
      minWidth: 150,
    },

    {
      field: "CreatedAt",
      headerName: "Questionnaire Updated",
      valueGetter: (params: GridValueGetterParams) =>
        `${
          moment(params.row?.clientDetail?.createdAt).format("MM-DD-YYYY") ||
          "-"
        }`,
      flex: 1,
      minWidth: 150,
    },
  ];
  const columnVisibilityModel = useMemo(() => {
    if (
      FilterUserEnum.PAID_PENDING == filterId ||
      FilterUserEnum.PAID_PROCESSING == filterId
    ) {
      return {
        steps_compeleted_percentage: false,
        steps_compeleted: false,
      };
    }
    return {
      steps_compeleted_percentage: true,
      steps_compeleted: true,
    };
  }, [filterId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0,
          mt: 1,
        }}
      >
        <Pageheader title="Questionnaire Listing" />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
        }}
      >
        {filtersQuestionnaire.map((section, i) => (
          <Box
            key={i}
            sx={{
              textAlign: "start",
              backgroundColor: "#ffffff",
              border: "1px solid #bacffa",
              borderRadius: "10px",
              width: "50%",
              padding: "0",
              marginBottom: "15px",
              boxShadow: "0px 2px 5px #bacffa63",
            }}
          >
            <Box
              sx={{ padding: "6px 15px", borderBottom: "1px solid #bacffa" }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ margin: "0", fontSize: "16px" }}
              >
                {section.headerName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                padding: "10px 15px",
                span: {
                  transform: "scale(1)",
                },
                "&:before": {
                  display: "none",
                },
              }}
            >
              {section.headerName === "Pre-Checkout" ? (
                stats?.isFetching ? (
                  <Skeleton
                    height={33}
                    width={150}
                    sx={{ borderRadius: "15px" }}
                  />
                ) : (
                  <Card
                    onClick={() => {
                      setFilterId("PRE");
                    }}
                    style={{
                      cursor: "pointer",
                      border:
                        filterId == "PRE"
                          ? "1px solid #073763"
                          : "1px solid #000000",
                      padding: "5px 15px",
                      borderRadius: "100px",
                      backgroundColor:
                        filterId == "PRE" ? "#073763" : "#ffffff",
                    }}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        padding: "0px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: filterId == "PRE" ? "#ffffff" : "#000000",
                          whiteSpace: "pre-line",
                        }}
                        fontWeight={400}
                        fontSize={14}
                        align="center"
                      >
                        All
                      </Typography>
                    </CardContent>
                  </Card>
                )
              ) : null}
              {section.filters.map((filter: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    {stats?.isFetching ? (
                      <Skeleton
                        height={33}
                        width={150}
                        sx={{ borderRadius: "15px" }}
                      />
                    ) : (
                      <Card
                        key={index}
                        onClick={() => {
                          setFilterId(filter.value);
                        }}
                        style={{
                          cursor: "pointer",
                          border:
                            filter.value === filterId
                              ? "1px solid #073763"
                              : "1px solid #000000",
                          // : "1px solid #838383",
                          backgroundColor:
                            filter.value === filterId ? "#073763" : "#ffffff",
                          padding: "5px 15px",
                          borderRadius: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "none",
                        }}
                      >
                        <CardContent
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            padding: "0px",
                          }}
                        >
                          <Typography
                            sx={{
                              color:
                                filter.value === filterId
                                  ? "#ffffff"
                                  : "#000000",
                              whiteSpace: "pre-line",
                            }}
                            fontWeight={400}
                            fontSize={14}
                            align="center"
                          >
                            {`${filter.name} (${
                              stats?.data
                                ? stats?.data[
                                    `${filter?.statskey}` as keyof typeof stats.data
                                  ]
                                : 0
                            })`}
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </React.Fragment>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ height: "70vh", mt: 2 }}>
        <CustomCard>
          <DataGrid
            rowSelection={false}
            rows={questionareListing?.data?.data || []}
            columns={column}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            density="compact"
            slots={{
              toolbar: GridToolbar,
            }}
            // columnVisibilityModel={columnVisibilityModel}
            getRowId={(row) => row?.id}
            loading={questionareListing.isFetching}
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
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={drawerOpen}
      >
        <SideDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          title="New Message"
        >
          {userEmail && (
            <Editor
              userEmail={userEmail}
              drawerOpen={drawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
        </SideDrawer>
      </Backdrop>
    </>
  );
};

export default QuestionareListing;
