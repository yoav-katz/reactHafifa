import axios from "axios";
import { Purchase } from "./types/Purchase";
import { ChartData } from "./types/ChartData";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export default {
  purchases() {
    return {
      getWithPagination: async (
        page: number,
        limit: number
      ): Promise<Purchase[]> =>
        (await axiosInstance.get(`/purchases/${limit}/${page}`)).data,
      amountOfPurchases: async (): Promise<number> =>
        (await axiosInstance.get("/purchases/amount")).data,
      yearlySalesPerMonth: async (startDate: Date): Promise<ChartData> =>
        (
          await axiosInstance.get(
            `/purchases/price/yearly/${startDate.valueOf()}`
          )
        ).data,
    };
  },
};
