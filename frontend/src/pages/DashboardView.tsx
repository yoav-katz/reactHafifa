import { Container, Grid, Paper, styled, Typography } from "@mui/material";
import Chart from "@/components/Chart";
import DataTable from "@/components/DataTable";
import { getLastPurchases, getPriceOfPurchase } from "@/data/utils";
import { JoinedPurchase } from "@/entities/Purchase";
import Title from "@/components/Title";

const headers = [
  { name: "product", realName: "שם המוצר" },
  { name: "customer", realName: "שם הלקוח" },
  { name: "amount", realName: "כמות" },
  { name: "toPay", realName: "תשלום" },
  { name: "date", realName: "תאריך הזמנה" },
];

const rows = getLastPurchases().map((purchase: JoinedPurchase) => ({
  ...purchase,
  toPay: `${getPriceOfPurchase(purchase)}$`,
  product: purchase.product.productName,
  customer: purchase.customer.firstName + " " + purchase.customer.lastName,
  date: new Date(purchase.date).toLocaleDateString(),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
}));

const StyledPaperWithHeight = styled(StyledPaper)({
  height: 220,
});

const DashboardAppPage = () => {
  return (
    <>
      <Container sx={{ mt: 4, mb: 4, overflow: "hidden" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <StyledPaperWithHeight>
              <Title>הכנסות חודשיות</Title>
              <Chart />
            </StyledPaperWithHeight>
          </Grid>
          <Grid item xs={3}>
            <StyledPaperWithHeight>
              <Title>חודש אחרון</Title>
              <Typography component="p" variant="h4">
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
              <DataTable headers={headers} data={rows} />
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardAppPage;
