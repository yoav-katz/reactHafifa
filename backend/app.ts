import express, { Express, Request, Response } from "express";
import cors from "cors";
import PurchasesRoute from "./routes/PurchasesRoute"
const app: Express = express();
const port = 8000;

app.use(cors());

app.use("/purchases", PurchasesRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
