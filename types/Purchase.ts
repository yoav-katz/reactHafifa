import { Customer } from "./Customer";
import { Product } from "./Product";

export type Purchase = {
  purchaseId: number;
  productId: number;
  customerId: number;
  amount: number;
  date: string;
};

export type JoinedPurchase = {
  id: number;
  product: Product;
  customer: Customer;
  amount: number;
  date: string;
};
