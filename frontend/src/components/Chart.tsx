import { SalesPerMonth } from "@/types/SalesPerMonth";
import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  DefaultTooltipContent,
  TooltipProps,
} from "recharts";
import { formatter } from "@/utils/formatter";

interface ChartProps {
  data: SalesPerMonth[];
}

const CustomTooltipContent = (props: TooltipProps<number, string>) => {
  if (props.payload != null && props.payload[0] != null) {
    const newPayload = props.payload.map((item) => {
      item.name = "";
      return item;
    });
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }

  return <DefaultTooltipContent {...props} />;
};

const Chart = ({ data }: ChartProps) => {
  return (
    <>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" interval="preserveStartEnd" />
          <Tooltip
            formatter={formatter}
            separator=""
            contentStyle={{ color: "rgba(0, 0, 0, 0.87)" }}
            content={CustomTooltipContent}
          />
          <Line type="monotone" dataKey="sales" stroke="#1976d2" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
