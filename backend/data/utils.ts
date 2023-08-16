// import purchases from "./purchases.json";
// import type { JoinedPurchase, Purchase } from "../types/Purchase";

// const getPriceOfPurchase = (purchase: Purchase | JoinedPurchase): number => {
//   if ("product" in purchase) {
//     return purchase.amount * purchase.product.price;
//   }

//   return getProductById(purchase.productId).price * purchase.amount;
// };


// const getLastPurchases = (): JoinedPurchase[] => {
//   const joinedPurchases = purchases.map(
//     (currPurchase: Purchase): JoinedPurchase => {
//       const customer = getCustomerById(currPurchase.customerId);
//       const product = getProductById(currPurchase.productId);

//       return {
//         id: currPurchase.purchaseId,
//         product,
//         customer,
//         amount: currPurchase.amount,
//         date: currPurchase.date,
//       };
//     }
//   );

//   return joinedPurchases.slice(10);
// };

// export { getLastPurchases, getPriceOfPurchase };
