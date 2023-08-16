import purchasesRepository from "../repositories/PurchasesRepository";
import productRepository from "../repositories/ProductsRepository";
import customerRepository from "../repositories/CustomerRepository";
import { Purchase } from "../types/Purchase";

const getAllPurchases = () => {
    const purchases = purchasesRepository.getAllPurchases();

    return purchases.map((purchase) => {
        const customer = customerRepository.getCustomerById(purchase.customerId);
        const product = productRepository.getProductById(purchase.productId);

        return {
            id: purchase.purchaseId,
            product: product.productName,
            customer: customer.firstName + " " + customer.lastName,
            amount: purchase.amount,
            date: purchase.date,
            price: purchase.amount * product.price
        };
    });
};

const getPurchasesPagination = (page: number, limit: number) => {
    const purchases = getAllPurchases();

    return purchases.slice(page * limit, page * limit + limit);
}

interface SalesPerMonth {
    month: string;
    sales: number;
}

const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;

    return [
        (month > 9 ? "" : "0") + month,
        date.getFullYear().toString().substring(2, 4),
    ].join("/");
};

const yearlySalesPerMonth = (today: Date): SalesPerMonth[] => {
    const months: { month: number; purchases: Purchase[] }[] = [];

    console.log(today);

    for (let i = 1; i <= 12; i++) {
        const currMonth = (today.getMonth() + i) % 12;
        months.push({
            month: currMonth,
            purchases: purchasesRepository.getAllPurchases().filter(({ date: purchaseDate }) => {
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

                return today.getMonth() >= date.getMonth()
                    ? today.getFullYear() === date.getFullYear()
                    : today.getFullYear() - 1 === date.getFullYear();
            }).reduce((sum, purchase) => sum + purchase.amount * productRepository.getProductById(purchase.productId).price, 0),
        });
    });

    return purchasesPerMonth;
};

export default {
    getAllPurchases,
    yearlySalesPerMonth,
    getPurchasesPagination
};