import purchasesRepository from "../repositories/PurchasesRepository";
import productRepository from "../repositories/ProductsRepository";
import customerRepository from "../repositories/CustomerRepository";
import { Purchase } from "../types/Purchase";
interface PurchasesWithDetails {
  id: number;
  product: string;
  customer: string;
  amount: number;
  date: string;
  price: number;
}

const getPurchaseDetails = (purchase: Purchase): PurchasesWithDetails => {
  const customer = customerRepository.getCustomerById(purchase.customerId);
  const product = productRepository.getProductById(purchase.productId);

  return {
    id: purchase.purchaseId,
    product: product.productName,
    customer: `${customer.firstName} ${customer.lastName}`,
    amount: purchase.amount,
    date: purchase.date,
    price: purchase.amount * product.price,
  };
};

const getAllPurchases = (): PurchasesWithDetails[] => {
  const purchases = purchasesRepository.getAllPurchases();
  return purchases.map(getPurchaseDetails);
};

const getPurchasesPagination = (
  page: number,
  limit: number
): PurchasesWithDetails[] => {
  const purchases = getAllPurchases();
  const startIndex = page * limit;
  return purchases.slice(startIndex, startIndex + limit);
};

interface SalesPerMonth {
  month: string;
  sales: number;
}

const formatDate = (date: Date): string => {
  return [
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getFullYear().toString().substring(2, 4),
  ].join("/");
};

const salesPerMonth = (month: Date): SalesPerMonth => {
  const purchases = purchasesRepository.getAllPurchases();
  const salesForMonth = purchases
    .filter(({ date: purchaseDate }) => {
      const date = new Date(purchaseDate);
      return (
        date.getMonth() === month.getMonth() &&
        date.getFullYear() === month.getFullYear()
      );
    })
    .reduce(
      (sum, purchase) =>
        sum +
        purchase.amount *
          productRepository.getProductById(purchase.productId).price,
      0
    );

  return {
    month: formatDate(month),
    sales: salesForMonth,
  };
};

const yearlySalesPerMonth = (today: Date): SalesPerMonth[] => {
  const purchasesPerMonth: SalesPerMonth[] = [];

  for (let i = 1; i <= 12; i++) {
    const currMonthNumber = (today.getMonth() + i) % 12;
    const currMonth = new Date();
    currMonth.setMonth(currMonthNumber);
    currMonth.setFullYear(
      today.getMonth() >= currMonthNumber
        ? today.getFullYear()
        : today.getFullYear() - 1
    );

    purchasesPerMonth.push(salesPerMonth(currMonth));
  }

  return purchasesPerMonth;
};

export default {
  getAllPurchases,
  yearlySalesPerMonth,
  getPurchasesPagination,
  salesPerMonth,
};
