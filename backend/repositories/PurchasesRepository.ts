import purchases from '../data/purchases.json';
import { Purchase } from '../types/Purchase';

const getAllPurchases = (): Purchase[] => {
    return purchases;
};

export default {
    getAllPurchases
};