import express, { Express } from "express";
import cors from "cors";
import PurchasesRoute from "./routes/PurchasesRoute";
import CustomersRoute from "./routes/CustomersRoute";
const app: Express = express();
const port = 8000;

app.use(cors());

app.use("/purchases", PurchasesRoute);
app.use("/customers", CustomersRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
