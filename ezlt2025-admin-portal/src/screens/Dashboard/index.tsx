"use client";
import Image from "next/image";
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ReactECharts from "echarts-for-react";
import { orderIcon, interviewIcon, userIcon, salesIcon } from "@/assets/icons";
import CustomCard from "@/components/Card";
import Pageheader from "@/components/PageHeader";
import {
  useChartUsersQuestionnairesListing,
  useChartLeadSourceListing,
  useChartQuestionnairesOrdersListing,
  useChartReferralSkippedListing,
  useChartSelfOthersListing,
  useChartSingleCoupleListing,
  useStats,
} from "@/provider/stats";
import { usePaymentListing } from "@/provider/payment";
import moment from "moment";
import { useClientListing } from "@/provider/client";
import { useSupportListing, useSupportStatusUpdate } from "@/provider/support";
import { getKeyOfEnum, MarriageStatusEnum } from "@/constant";
import Link from "next/link";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { useClientDocument } from "@/provider/ClientDocument";
import { ChangeEvent, useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import CustomTextField from "@/components/CustomTextField/CustomTextField";
import CustomModal from "@/components/CustomModal";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import HorizontalBarChart from "@/components/Charts/BarCharts/HorizontalBarchart";
import VerticalBarChart from "@/components/Charts/BarCharts/VerticalBarChart";
import ReferralVsSkippedChart from "@/components/Charts/PieCharts/PercentagePieChart";
import ChartWrapper from "@/components/Charts/ChartWrapper";

const columns: GridColDef[] = [
  {
    field: "customer",
    headerName: "Customer",
    flex: 1,
  },
  { field: "description", headerName: "Product Description", flex: 1 },
  { field: "amount_captured", headerName: "Amount", flex: 1 },
  {
    field: "created",
    headerName: "Created At",
    flex: 1,
    valueGetter: (params) => moment(params.row.createdAt).format("MM-DD-YYYY"),
  },
  {
    field: "investment_property_count",
    headerName: "Investment Property",
    flex: 1,
  },
  { field: "promo_code", headerName: "Promotion Code", flex: 1 },
  { field: "discount", headerName: "Discount", flex: 1 },
];

interface SelectedRowDataProp {
  id: string | undefined;
  contactBy: number;
  name: string;
  email: string;
  mobile: string;
  topic: string;
  message: string;
  status: string;
}

enum ChartFilterEnum {
  "Current Month" = "CURRENT_MONTH",
  "Last Month" = "LAST_MONTH",
  "Last 3 Months" = "LAST_3_MONTHS",
  "Last 6 Months" = "LAST_6_MONTHS",
}

const DashboardScreen = () => {
  const router = useRouter();
  const [chartFilter, setChartFilter] = useState(
    ChartFilterEnum["Current Month"],
  );
  const stats = useStats({});
  const chartLeadSourceListing = useChartLeadSourceListing({
    range: chartFilter,
  });
  const chartQuestionnairesOrdersListing = useChartQuestionnairesOrdersListing({
    range: chartFilter,
  });
  const chartReferralSkippedListing = useChartReferralSkippedListing({
    range: chartFilter,
  });
  const chartSelfOthersListing = useChartSelfOthersListing({
    range: chartFilter,
  });
  const chartSingleCoupleListing = useChartSingleCoupleListing({
    range: chartFilter,
  });
  const chartUsersQuestionnairesListing = useChartUsersQuestionnairesListing({
    range: chartFilter,
  });

  return (
    <Box>
      <Pageheader title="Hi, Welcome Back" />
      <Grid
        container
        spacing={2}
        sx={{
          span: {
            transform: "scale(1)",
          },
          "&:before": {
            display: "none",
          },
        }}
      >
        <Grid item xs={12} md={6} lg={3}>
          {stats?.isFetching ? (
            <Skeleton height={105} />
          ) : (
            <CustomCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  ml: 2,
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push("/dashboard/orders");
                }}
              >
                <Image src={orderIcon} width={0} height={0} alt="user" />
                <Box sx={{ pl: 3 }}>
                  <Typography fontSize={26} fontWeight="600">
                    {stats?.data?.count_pending_order_with_paid_status}
                  </Typography>
                  <Typography fontSize={14} sx={{ color: "#919eab" }}>
                    Pending Orders
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {stats?.isFetching ? (
            <Skeleton height={105} />
          ) : (
            <CustomCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  ml: 2,
                }}
              >
                <Image src={interviewIcon} width={0} height={0} alt="user" />

                <Box sx={{ pl: 3 }}>
                  <Typography fontSize={26} fontWeight="600">
                    {stats?.data?.count_partner_statuses?.["Waiting Approval"]}
                  </Typography>
                  <Typography fontSize={14} sx={{ color: "#919eab" }}>
                    Partner Waiting Approval
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {stats?.isFetching ? (
            <Skeleton height={105} />
          ) : (
            <CustomCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  ml: 2,
                }}
              >
                <Image src={interviewIcon} width={0} height={0} alt="user" />
                <Box sx={{ pl: 3 }}>
                  <Typography fontSize={26} fontWeight="600">
                    {stats?.data?.count_open_ticket}
                  </Typography>
                  <Typography fontSize={14} sx={{ color: "#919eab" }}>
                    Total Open Tickets
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          {stats?.isFetching ? (
            <Skeleton height={105} />
          ) : (
            <CustomCard>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  ml: 2,
                }}
              >
                <Image src={salesIcon} width={0} height={0} alt="user" />
                <Box sx={{ pl: 3 }}>
                  <Typography fontSize={26} fontWeight="600">
                    $ {stats?.data?.count_earning_current_week}
                  </Typography>
                  <Typography fontSize={14} sx={{ color: "#919eab" }}>
                    Current Week Earning
                  </Typography>
                </Box>
              </Box>
            </CustomCard>
          )}
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
        }}
      >
        <Pageheader title="Stats" />
        <CustomTextField
          label={"Chart Duration"}
          value={chartFilter}
          onChange={(e: any) => setChartFilter(e.target.value)}
          size="small"
          select
          sx={{ maxWidth: "300px" }}
        >
          {Object.keys(ChartFilterEnum).map((key, i) => (
            <MenuItem
              key={i}
              value={ChartFilterEnum[key as keyof typeof ChartFilterEnum]}
            >
              {getKeyOfEnum(
                ChartFilterEnum,
                ChartFilterEnum[key as keyof typeof ChartFilterEnum],
              )}
            </MenuItem>
          ))}
        </CustomTextField>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <ChartWrapper
            chartType="VerticalBarChart"
            chartTitle="Users vs Questionnaire"
            activeFilter={getKeyOfEnum(ChartFilterEnum, chartFilter)}
            data={chartUsersQuestionnairesListing?.data}
            isLoading={chartUsersQuestionnairesListing?.isFetching}
            refetchChart={chartUsersQuestionnairesListing.refetch}
            xAxisDataKey="month"
            BarDataKey1="users"
            BarDataKey2="questionnaires"
            BarDataKey1Color="#1f3c57"
            BarDataKey2Color="#72a7c7"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ChartWrapper
            chartType="PercentagePieChart"
            chartTitle="Referral vs Skipped"
            activeFilter={getKeyOfEnum(ChartFilterEnum, chartFilter)}
            data={chartReferralSkippedListing?.data}
            isLoading={chartReferralSkippedListing?.isFetching}
            refetchChart={chartReferralSkippedListing?.refetch}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ChartWrapper
            chartType="HorizontalBarChart"
            chartTitle="Lead Source"
            activeFilter={getKeyOfEnum(ChartFilterEnum, chartFilter)}
            data={chartLeadSourceListing?.data}
            isLoading={chartLeadSourceListing?.isFetching}
            refetchChart={chartLeadSourceListing?.refetch}
            xAxisDataKey="value"
            yAxisDataKey="name"
            HorizontalBarChartsColors={[
              "#b58900",
              "#268bd2",
              "#cb4b16",
              "#586e75",
              "#859900",
              "#2aa198",
              "#d33682",
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ChartWrapper
            chartType="VerticalBarChart"
            chartTitle="Questionnaires vs Orders"
            activeFilter={getKeyOfEnum(ChartFilterEnum, chartFilter)}
            data={chartQuestionnairesOrdersListing?.data}
            isLoading={chartQuestionnairesOrdersListing?.isFetching}
            refetchChart={chartQuestionnairesOrdersListing.refetch}
            xAxisDataKey="month"
            BarDataKey1="orders"
            BarDataKey2="questionnaires"
            BarDataKey1Color="#5891ad"
            BarDataKey2Color="#93c47d"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ChartWrapper
            chartType="PercentagePieChart"
            chartTitle="Single vs Couple"
            activeFilter={getKeyOfEnum(ChartFilterEnum, chartFilter)}
            data={chartSingleCoupleListing?.data}
            isLoading={chartSingleCoupleListing?.isFetching}
            refetchChart={chartSingleCoupleListing?.refetch}
            pieChartsColors={["#45818e", "#e69138"]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ChartWrapper
            chartType="PercentagePieChart"
            chartTitle="Self vs Others"
            activeFilter={getKeyOfEnum(ChartFilterEnum, chartFilter)}
            data={chartSelfOthersListing?.data}
            isLoading={chartSelfOthersListing?.isFetching}
            refetchChart={chartSelfOthersListing?.refetch}
            pieChartsColors={["#b5d7a8", "#76a5b0"]}
          />
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default DashboardScreen;
