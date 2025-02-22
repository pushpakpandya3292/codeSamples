"use client";
import CustomCard from "@/components/Card";
import dayjs from "dayjs";
import Pageheader from "@/components/PageHeader";
import { usePaymentListing } from "@/provider/payment";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { PaymentMethodEnum } from "@/constant";
import usePaginationState from "@/hooks/usePaginationState";

const columns: GridColDef[] = [
  {
    field: "orderId",
    headerName: "Order Id",
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href={`/dashboard/orders/details/${params.row.orderId}`}>
          <Typography
            variant="caption"
            color="black"
            sx={{ textDecorationLine: "underline", fontWeight: "bold" }}
          >
            {params.row.orderNumber}
          </Typography>
        </Link>
      </Box>
    ),
  },
  {
    field: "documentName",
    headerName: "Doc Name",
    flex: 3.5,
  },
  {
    field: "clientName",
    headerName: "Client Name",
    flex: 1.5,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href={`/dashboard/user-account/detail/${params.row?.userId}`}>
          <Typography
            variant="caption"
            color="black"
            sx={{ textDecorationLine: "underline", fontWeight: "bold" }}
          >
            {params.row.clientName}
          </Typography>
        </Link>
      </Box>
    ),
  },
  {
    field: "created",
    headerName: "Checkout",
    flex: 1,
    valueFormatter: (params) => dayjs(params.value).format("MM/DD/YYYY"),
  },
  {
    field: "amount_captured",
    headerName: "Amount",
    flex: 1,
    valueFormatter: (params) => `$ ${params.value}`,
  },
  {
    field: "paymentMethod",
    headerName: "Method",
    flex: 1.2,
    valueFormatter: (params) =>
      PaymentMethodEnum[params.value as keyof typeof PaymentMethodEnum] || "-",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Typography
        variant="caption"
        color="black"
        sx={{
          background: params?.row?.status !== "PAID" ? "#FFBFBF" : "#b1f3aa",
          borderRadius: 1,
          p: 0.5,
          width: "100px",
          maxWidth: "fit-content",
          fontSize: "12px",
          fontWeight: "bold",
          color: params?.row?.status !== "PAID" ? "#C54646" : "#519000",
        }}
      >
        {params.row.status}
      </Typography>
    ),
  },
  {
    field: "dateReceivedManually",
    headerName: "Date Rcvd manually",
    flex: 1,
    valueFormatter: (params) => params.value || "-",
  },
  {
    field: "receivedAmount",
    headerName: "Recieved",
    flex: 1,
    valueFormatter: (params) => params.value || "-",
  },
  {
    field: "deposited",
    headerName: "Deposited",
    flex: 1,
    valueFormatter: (params) => params.value || "-",
  },
  {
    field: "stripeId",
    headerName: "Stripe ID",
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          target="_blank"
          href={`https://dashboard.stripe.com/test/payments/${params.row.stripeId}`}
        >
          <Typography
            variant="caption"
            color="black"
            sx={{ textDecorationLine: "underline", fontWeight: "bold" }}
          >
            {params.row.stripeId?.slice(0, 10)}...
          </Typography>
        </Link>
      </Box>
    ),
  },
  {
    field: "questionnaireId",
    headerName: "Questionnaire ID",
    flex: 1.3,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/dashboard/clients/client-details/${params.row.questionnaireId}`}
        >
          <Typography
            variant="caption"
            color="black"
            sx={{ textDecorationLine: "underline", fontWeight: "bold" }}
          >
            {params.row.questionnaireId?.slice(0, 10)}...
          </Typography>
        </Link>
      </Box>
    ),
  },
  {
    field: "otherCharges",
    headerName: "Other ID Check",
    flex: 1.5,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Link
          href={`/dashboard/clients/client-details/${params.row.questionnaireId}`}
        > */}
        <Typography
          variant="caption"
          color="black"
          // sx={{ textDecorationLine: "underline", fontWeight: "bold" }}
        >
          -
        </Typography>
        {/* </Link> */}
      </Box>
    ),
  },
];

const PaymentListingScreen = () => {
  const {
    pagination,
    setPagination,
    queryParams,
  } = usePaginationState();

  const paymentListing = usePaymentListing({ ...queryParams, });

  const { rowCount } = usePaginationState(paymentListing?.data?.total);
  
  return (
    <>
      <Pageheader title="Payment Listing" />
      <Box sx={{ height: "85vh" }}>
        <CustomCard>
          <DataGrid
            rowSelection={false}
            rows={paymentListing?.data?.data || []}
            columns={columns}
            getRowId={(row) => row?.orderId}
            slots={{
              toolbar: GridToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "Mui-even"
                : "Mui-odd"
            }
            density="compact"
            loading={paymentListing.isFetching}
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
    </>
  );
};

export default PaymentListingScreen;
