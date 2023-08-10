import { Container, Grid, Paper, Toolbar, styled, PaperProps } from "@mui/material";
import { FC } from "react"
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import DataTable from "../components/DataTable";

const StyledPaper: FC<PaperProps> = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

const StyledPaperWithHeight: FC<PaperProps> = styled(StyledPaper)({
  height: 240
});

interface Data {
  id: number;
  date: string;
  name: string;
  shipTo: string;
  paymentMethod: string;
  amount: number;
}

const createData = (
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
): Data => {
  return { id, date, name, shipTo, paymentMethod, amount };
}
const headers = [{ name: "date", realName: "תאריך" }, { name: "name", realName: "שם" }, { name: "shipTo", realName: "כתובת יעד" }, { name: "paymentMethod", realName: "תשלום" }, { name: "amount", realName: "כמות"}];

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];


const DashboardAppPage: FC = () => {
  return (
      <>
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <StyledPaperWithHeight>
                <Chart />
              </StyledPaperWithHeight>
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledPaperWithHeight>
                <Deposits />
              </StyledPaperWithHeight>
            </Grid>
            <Grid item xs={12}>
              <StyledPaper>
              <DataTable title="הזמנות אחרונות" headers={headers.reverse()} data={rows } />
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
    </>
  );
}

export default DashboardAppPage;

