import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

// Sample data similar to the chart
const data = [
  { user_heardBy: "Skipped", user_count: 20 },
  { user_heardBy: "Facebook Ads", user_count: 35 },
  { user_heardBy: "Google Ads", user_count: 15 },
  { user_heardBy: "TikTok Ads", user_count: 30 },
];

const COLORS = [
  "#b58900",
  "#268bd2",
  "#cb4b16",
  "#586e75",
  "#859900",
  "#2aa198",
  "#d33682",
];

interface HorizontalBarChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  xAxisDataKey?: string;
  yAxisDataKey?: string;
}

const HorizontalBarChart = ({
  data,
  colors,
  xAxisDataKey,
  yAxisDataKey,
}: HorizontalBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 0, right: 25, left: 20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey={xAxisDataKey || "name"} />
        <YAxis
          type="category"
          dataKey={yAxisDataKey || "name"}
          tick={{
            fill: "black",
            fontSize: "10px",
            fontWeight: "600",
          }}
        />
        <Tooltip />
        <Bar dataKey={xAxisDataKey || "name"} barSize={40}>
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                colors
                  ? colors[index % COLORS.length]
                  : COLORS[index % COLORS.length]
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
