import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { salesPerMonth } from "../data/utils";

const data = salesPerMonth();
const formatter = (value: string) => `${value}$`;

const Chart = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" interval="preserveStartEnd" />
          <Tooltip formatter={formatter} separator="" />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" name=" " />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
