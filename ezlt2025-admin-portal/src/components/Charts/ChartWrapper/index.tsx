import React from "react";
import HorizontalBarChart from "../BarCharts/HorizontalBarchart";
import VerticalBarChart from "../BarCharts/VerticalBarChart";
import PercentagePieChart from "../PieCharts/PercentagePieChart";
import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

interface ChartWrapperProps {
  chartType: "HorizontalBarChart" | "VerticalBarChart" | "PercentagePieChart";
  chartTitle: string;
  activeFilter: string;
  isLoading?: boolean;
  refetchChart?: () => void;
  data?: any;
  xKey?: string;
  yKey?: string;
  dataKey?: string;
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  BarDataKey1?: string;
  BarDataKey2?: string;
  BarDataKey1Color?: string;
  BarDataKey2Color?: string;
  pieChartsColors?: string[];
  HorizontalBarChartsColors?: string[];
}

const ChartWrapper = ({
  chartType,
  chartTitle,
  activeFilter,
  isLoading,
  refetchChart,
  data,
  xAxisDataKey,
  yAxisDataKey,
  BarDataKey1,
  BarDataKey2,
  BarDataKey1Color,
  BarDataKey2Color,
  pieChartsColors,
  HorizontalBarChartsColors,
}: ChartWrapperProps) => {
  return (
    <Box sx={{ p: 1, background: "white" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ color: "#7A7A7A" }}>
            {chartTitle}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#7A7A7A", fontWeight: 400, fontSize: "14px" }}
          >
            {activeFilter}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={refetchChart}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <RefreshRoundedIcon />
            )}
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <Skeleton variant="rounded" width="100%" height={400} />
      ) : (
        <>
          {chartType === "HorizontalBarChart" && (
            <HorizontalBarChart
              data={data || []}
              xAxisDataKey={xAxisDataKey}
              yAxisDataKey={yAxisDataKey}
              colors={HorizontalBarChartsColors}
            />
          )}
          {chartType === "VerticalBarChart" && (
            <VerticalBarChart
              data={data || []}
              xAxisDataKey={xAxisDataKey}
              BarDataKey1={BarDataKey1}
              BarDataKey2={BarDataKey2}
              BarDataKey1Color={BarDataKey1Color}
              BarDataKey2Color={BarDataKey2Color}
            />
          )}
          {chartType === "PercentagePieChart" && (
            <PercentagePieChart data={data || []} colors={pieChartsColors} />
          )}
        </>
      )}
    </Box>
  );
};

export default ChartWrapper;
