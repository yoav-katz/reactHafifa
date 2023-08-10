import purchases from './purchases.json';

type chartData = {
    name: string,
    value: number
};

const purchasesPerMonth = () => {
    const months: number[] = Array.from(Array(12).keys())
    const currYear = new Date().getFullYear().toString();
    const purchasesPerMonth: chartData[] = [];
    months.forEach((month: number) => {
        const date: Date = new Date();
        date.setMonth(month);
        
        const hebMonth = date.toLocaleDateString("he-IL", { month: 'long' });
        purchasesPerMonth.push({
            name: hebMonth,
            value: purchases.filter(purchase => {
                const date = purchase.date.split('/');
                return Number(date[0]) === month + 1 && date[2] === currYear;
            }).length
        });
    });

    return purchasesPerMonth.reverse();
};

const getLastOrders = () => {
    // const lastOrders = Array(10);
    // const sortedPurchases = purchases.sort((a, b) => )
    // return lastOrders.map(() => {

    // })
}

export { purchasesPerMonth, getLastOrders };