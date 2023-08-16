import { ChartData } from "@/types/ChartData";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
const formatter = (value: string) => `${value}$`;

interface ChartProps {
  data: ChartData;
}

const Chart = ({ data }: ChartProps) => {
  return (
    <>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip formatter={formatter} separator="" />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
