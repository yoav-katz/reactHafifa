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

const compareDates = (firstDate: string | Date, secondDate: string | Date) => {
  const date1 = new Date(firstDate).getTime();
  const date2 = new Date(secondDate).getTime();

  if (date1 < date2) {
      return -1;
  } else if (date1 > date2) {
      return 1;
  } else {
      return 0;
  }
};

const getLastOrders = () => {
    // const lastOrders = Array(10);
    const sortedPurchases = purchases.slice().sort((a, b) => compareDates(a.date, b.date));
    console.log(sortedPurchases)
}


export { purchasesPerMonth, getLastOrders };