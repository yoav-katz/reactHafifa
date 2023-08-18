import axios from "axios";
import { Purchase } from "./types/Purchase";
import { SalesPerMonth } from "./types/SalesPerMonth";

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
      yearlySalesPerMonth: async (startDate: Date): Promise<SalesPerMonth[]> =>
        (
          await axiosInstance.get(
            `/purchases/price/yearly/${startDate.valueOf()}`
          )
        ).data,
      salesPerMonth: async (startDate: Date): Promise<SalesPerMonth> =>
        (
          await axiosInstance.get(
            `/purchases/price/month/${startDate.valueOf()}`
          )
        ).data,
    };
  },
  customers() {
    return {
      getWithPagination: async (
        page: number,
        limit: number
      ): Promise<Purchase[]> =>
        (await axiosInstance.get(`/customers/${limit}/${page}`)).data,
    };
  },
};
