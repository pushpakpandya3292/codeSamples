"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Pageheader from "@/components/PageHeader";
import { useUserCart } from "@/provider/Cart";
// import {
//   MarriageStatusEnum,
//   SubMarriageStatusEnum,
//   SubMarriageStatusForProfileEnum,
// } from "../Onboarding/constant";
import Link from "next/link";
import CartStatusChip from "@/components/CartStatusChip";
import { MarriageStatusEnum, StatusEnum } from "@/constant";
import { useClientListing } from "@/provider/client";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import moment from "moment";

interface IClientDetailsProps {
  id: string;
}
const UserAccountDetail = ({ id }: IClientDetailsProps) => {
  const { data, isLoading } = useUserCart({ userId: id, limit: 1000 });
  const {
    data: userData,
    isFetching,
    isLoading: userLoading,
  } = useClientListing({ userId: id });

  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      // flex: 1,
      width: 80,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href={`/dashboard/clients/client-details/${params?.row?.id}`}>
            <RemoveRedEyeOutlined sx={{ color: "#4b8ad1" }} />
          </Link>
        </Box>
      ),
    },
    {
      field: "TrustName",
      headerName: "Trust Name",
      renderCell: (params) => (
        <>{params?.row?.clientDetail?.trust_name || "-"}</>
      ),
      flex: 1,
      minWidth: 400,
    },
    {
      field: "PackageName",
      headerName: "Pkg Name",
      valueGetter: (params: GridValueGetterParams) =>
        `LT-${
          params?.row?.clientDetail?.marriage_status ===
          MarriageStatusEnum.Couple
            ? "C"
            : "I"
        }`,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "State",
      headerName: "State",
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.clientDetail?.state || "-",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "CompletedSteps",
      headerName: "Steps Done",
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.clientDetail?.steps_completed || "-",
      flex: 1,
      minWidth: 100,
    },

    {
      field: "StepsPercentage",
      headerName: "Steps %",
      renderCell: (params) => (
        <>
          {params?.row?.clientDetail?.steps_completed_percentage
            ? `${params?.row?.clientDetail?.steps_completed_percentage?.toFixed(
                2,
              )}%`
            : "0.00%"}
        </>
      ),
      flex: 1,
      minWidth: 100,
    },
    {
      field: "Created At",
      headerName: "Questionnarie Created",
      renderCell: (params) => (
        <>
          {params?.row?.clientDetail?.createdAt
            ? moment(params?.row?.clientDetail?.createdAt).format("MM-DD-YYYY")
            : "-"}
        </>
      ),
      flex: 1,
      minWidth: 170,
    },
    {
      field: "OrderCreatedAt",
      headerName: "Order Created",
      renderCell: (params) => (
        <>
          {params?.row?.orderCreatedAt
            ? moment(params?.row?.orderCreatedAt).format("MM-DD-YYYY")
            : "-"}
        </>
      ),
      flex: 1,
      minWidth: 110,
    },
    {
      field: "InterviewStatus",
      headerName: "Interview status",
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.clientDetail?.steps_completed_percentage <= 99
          ? "Inprocess"
          : params?.row?.clientDetail?.steps_completed_percentage === 100
          ? "Completed"
          : "Pending",
      renderCell: (params) => (
        <>
          {params?.row?.clientDetail?.steps_completed_percentage <= 99 ? (
            <Typography
              variant="h5"
              sx={{
                color: "#f1c40f",
                fontSize: "16px",
                fontWeight: "700",
                width: "fit-content",
              }}
            >
              In process
            </Typography>
          ) : params?.row?.clientDetail?.steps_completed_percentage === 100 ? (
            <Typography
              variant="h5"
              sx={{
                color: "#f1c40f",
                fontSize: "16px",
                fontWeight: "700",
                width: "fit-content",
              }}
            >
              Completed
            </Typography>
          ) : (
            <Typography
              variant="h5"
              sx={{
                color: "#f1c40f",
                fontSize: "16px",
                fontWeight: "700",
                width: "fit-content",
              }}
            >
              Pending
            </Typography>
          )}
        </>
      ),
    },
    {
      field: "OrderStatus",
      headerName: "Order Status",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.status || "-",
      renderCell: (params) => (
        <>
          {params?.row?.paymentStatus === 1 ? (
            <CartStatusChip cartStatus={params?.row?.status} />
          ) : (
            "-"
          )}
        </>
      ),
      minWidth: 150,
    },
  ];

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center">
          <Pageheader
            isBack
            title="User Profile"
            active={`${userData?.data[0]?.firstName || ""} ${
              userData?.data[0]?.lastName || ""
            }`}
          />
        </Stack>
        <Card
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "12px",
            px: 3,
            py: 2,
            boxShadow: (theme) =>
              `0px 4px 20px 0px ${theme.additionalColors?.lightGrey}`,
            my: 2,
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* <Box
            sx={{
              width: "20%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRight: "1px solid #e3e3e3",
            }}
          >
            <Image
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "2px solid #fda440",
                objectFit: "cover",
                position: "relative",
              }}
              alt=""
              width={150}
              height={150}
              //@ts-ignore
              src={userData?.data?.[0]?.photo?.path || Avatar}
            />
          </Box> */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              pl: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={6} xl={4}>
                <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={100} />
                  ) : (
                    "User Name"
                  )}
                </Typography>
                <Typography sx={{ fontWeight: "600" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={200} />
                  ) : (
                    <>
                      {userData?.data[0]?.firstName} {""}
                      {userData?.data[0]?.lastName}
                    </>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={4}>
                <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={100} />
                  ) : (
                    "Email"
                  )}
                </Typography>
                <Typography sx={{ fontWeight: "600" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={200} />
                  ) : (
                    userData?.data[0]?.email
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={4}>
                <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={100} />
                  ) : (
                    "Date Joined"
                  )}
                </Typography>
                <Typography sx={{ fontWeight: "600" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={200} />
                  ) : (
                    userData?.data[0]?.createdAt &&
                    new Date(userData?.data[0]?.createdAt).toLocaleDateString()
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={4}>
                <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={100} />
                  ) : (
                    "User Source"
                  )}
                </Typography>
                <Typography sx={{ fontWeight: "600" }}>
                  {isLoading || userLoading || isFetching ? (
                    <Skeleton width={200} />
                  ) : (
                    userData?.data[0]?.heardBy || "-"
                  )}
                </Typography>
              </Grid>

              {userData?.data[0]?.reference_code && (
                <Grid item xs={12} md={6} lg={6} xl={4}>
                  <Typography sx={{ mb: 1, color: "#8f8f8f" }}>
                    {isLoading || userLoading || isFetching ? (
                      <Skeleton width={100} />
                    ) : (
                      "Refernce Partner Name"
                    )}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {isLoading || userLoading || isFetching ? (
                      <Skeleton width={200} />
                    ) : (
                      userData?.data[0]?.reference_code
                    )}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Card>
        {data?.data && data?.data?.length > 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  marginBottom: "20px",
                  position: "relative",
                  minHeight: "243px",
                }}
              >
                <Typography
                  className="star-burst"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "15px",
                  }}
                >
                  Questionnarie
                </Typography>
                <Box>
                  <DataGrid
                    rowSelection={false}
                    rows={data?.data || []}
                    columns={columns}
                    getRowId={(row) => row.id}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "Mui-even"
                        : "Mui-odd"
                    }
                    density="compact"
                    // columnVisibilityModel={columnVisibilityModel}
                    slots={{
                      toolbar: GridToolbar,
                    }}
                    loading={isLoading}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                      },
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default UserAccountDetail;
