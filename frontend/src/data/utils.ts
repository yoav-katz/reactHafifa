import purchases from "./purchases.json";
import customers from "./customers.json";
import products from "./products.json";
import type { Customer } from "../entities/Customer";
import type { Product } from "../entities/Product";
import type { JoinedPurchase, Purchase } from "../entities/Purchase";

interface SalesPerMonth {
  month: string;
  sales: number;
}

const getPriceOfPurchase = (purchase: Purchase | JoinedPurchase): number => {
  if ("product" in purchase) {
    return purchase.amount * purchase.product.price;
  }

  return getProductById(purchase.productId).price * purchase.amount;
};

const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1;

  return [
    (month > 9 ? "" : "0") + month,
    date.getFullYear().toString().substring(2, 4),
  ].join("/");
};

const salesPerMonth = (): SalesPerMonth[] => {
  const today = new Date();
  const months: { month: number; purchases: Purchase[] }[] = [];

  for (let i = 1; i <= 12; i++) {
    const currMonth = (today.getMonth() + i) % 12;
    months.push({
      month: currMonth,
      purchases: purchases.filter(({ date: purchaseDate }) => {
        const date = new Date(purchaseDate);

        return date.getMonth() === currMonth;
      }),
    });
  }

  const purchasesPerMonth: SalesPerMonth[] = [];

  months.forEach(({ month: currMonthNumber, purchases }) => {
    const currMonth = new Date();
    currMonth.setMonth(currMonthNumber);
    currMonth.setFullYear(
      today.getMonth() >= currMonthNumber
        ? today.getFullYear()
        : today.getFullYear() - 1
    );
    purchasesPerMonth.push({
      month: formatDate(currMonth),
      sales: purchases.filter(({ date: purchaseDate }) => {
        const date = new Date(purchaseDate);

        if (date.getMonth()!==6 && purchaseDate.includes("2023-07")) {
          console.log(date);
          console.log(purchaseDate);
        }
        return today.getMonth() >= date.getMonth()
          ? today.getFullYear() === date.getFullYear()
          : today.getFullYear() - 1 === date.getFullYear();
      }).length,
    });
  });

  return purchasesPerMonth;
};

const getCustomerById = (id: number): Customer => {
  const customer = customers.find((customer) => customer.id === id);

  if (customer === undefined) {
    throw new Error(`customer with id ${id} does not exists`);
  } else {
    return customer;
  }
};

const getProductById = (id: number): Product => {
  const product = products.find((product) => product.productId === id);

  if (product === undefined) {
    throw new Error(`product with id ${id} does not exists`);
  } else {
    return product;
  }
};

const getLastPurchases = (): JoinedPurchase[] => {
  const joinedPurchases = purchases.map(
    (currPurchase: Purchase): JoinedPurchase => {
      const customer = getCustomerById(currPurchase.customerId);
      const product = getProductById(currPurchase.productId);

      return {
        id: currPurchase.purchaseId,
        product,
        customer,
        amount: currPurchase.amount,
        date: currPurchase.date,
      };
    }
  );

  return joinedPurchases.slice(10);
};

export { salesPerMonth, getLastPurchases, getPriceOfPurchase };
