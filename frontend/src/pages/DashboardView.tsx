import {
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import Chart from "@/components/Chart";
import Title from "@/components/Title";
import PurchasesTable from "@/components/PurchasesTable";
import { ChartData } from "@/types/ChartData";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useQuery } from "react-query";
import api from "@/api";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
}));

const StyledPaperWithHeight = styled(StyledPaper)({
  height: 220,
});

const DashboardAppPage = () => {
  const {
    isLoading: isLoadingChartData,
    isError: isErrorChartData,
    error: chartDataError,
    data: chartData,
  } = useQuery<ChartData, ErrorResponse>("chart data", () =>
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
              <Typography color="text.primary" component="p" variant="h4">
                $3,024.00
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                07.2023-08.2023
              </Typography>
            </StyledPaperWithHeight>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Title>הזמנות</Title>
              <PurchasesTable></PurchasesTable>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardAppPage;
