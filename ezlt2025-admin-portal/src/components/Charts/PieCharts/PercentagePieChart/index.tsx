import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#a55ca1", "#5ca0d1"];

interface PercentagePieChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
}

const PercentagePieChart = ({ data, colors }: PercentagePieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(1)}%`
          }
        >
          {data.map((_, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={
                colors
                  ? colors[index % COLORS.length]
                  : COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PercentagePieChart;
