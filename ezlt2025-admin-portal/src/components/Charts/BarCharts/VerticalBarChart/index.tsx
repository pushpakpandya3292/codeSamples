import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "July", Users: 80, Questionnaire: 25 },
  { name: "August", Users: 35, Questionnaire: 20 },
  { name: "September", Users: 30, Questionnaire: 10 },
];

interface VerticalBarChartProps {
  data: any;
  xAxisDataKey: string | undefined;
  BarDataKey1: string | undefined;
  BarDataKey1Color: string | undefined;
  BarDataKey2: string | undefined;
  BarDataKey2Color: string | undefined;
}

const VerticalBarChart = ({
  data,
  xAxisDataKey,
  BarDataKey1,
  BarDataKey1Color,
  BarDataKey2,
  BarDataKey2Color,
}: VerticalBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={BarDataKey1 || "name"}
          fill={BarDataKey1Color || "#1f3c57"}
          barSize={50}
        />
        <Bar
          dataKey={BarDataKey2 || "name"}
          fill={BarDataKey2Color || "#72a7c7"}
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChart;
