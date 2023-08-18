import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import Chart from "@/components/Chart";
import Title from "@/components/Title";
import TableWithPagination from "@/components/TableWithPagination";
import { SalesPerMonth } from "@/types/SalesPerMonth";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useQuery } from "react-query";
import api from "@/api";
import StyledPaper from "@/components/StyledPaper";
import { formatter } from "@/utils/formatter";

const StyledPaperWithHeight = styled(StyledPaper)({
  height: 220,
});

const headers = [
  { name: "product", realName: "שם המוצר" },
  { name: "customer", realName: "שם הלקוח" },
  { name: "amount", realName: "כמות" },
  { name: "price", realName: "תשלום" },
  { name: "date", realName: "תאריך הזמנה" },
];

const DashboardAppPage = () => {
  const {
    isLoading: isLoadingChartData,
    isError: isErrorChartData,
    error: chartDataError,
    data: chartData,
  } = useQuery<SalesPerMonth[], ErrorResponse>("chart data", () =>
    api.purchases().yearlySalesPerMonth(new Date())
  );

  return (
    <>
      <Container sx={{ mt: 4, mb: 4, height: "calc(100vh - 8rem)" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <StyledPaperWithHeight>
              <Title>הכנסות חודשיות</Title>
              {isLoadingChartData || chartData === undefined ? (
                <CircularProgress />
              ) : isErrorChartData ? (
                <Typography color="error" variant="h4">
                  {chartDataError?.message || "Cannot load chart data"}
                </Typography>
              ) : (
                <Chart data={chartData} />
              )}
            </StyledPaperWithHeight>
          </Grid>
          <Grid item xs={3}>
            <StyledPaperWithHeight>
              <Title>חודש אחרון</Title>
              {isLoadingChartData || chartData === undefined ? (
                <CircularProgress />
              ) : isErrorChartData ? (
                <Typography color="error" variant="h4">
                  {chartDataError?.message || "Cannot load chart data"}
                </Typography>
              ) : (
                <>
                  <Typography color="text.primary" component="p" variant="h4">
                    {formatter(chartData[chartData.length - 2].sales)}
                  </Typography>
                  <Typography color="text.secondary">
                    {chartData[chartData.length - 2].month}
                  </Typography>
                </>
              )}
            </StyledPaperWithHeight>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Title>הזמנות</Title>
              <TableWithPagination
                headers={headers}
                apiFunction={api.purchases().getWithPagination}
              ></TableWithPagination>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardAppPage;
