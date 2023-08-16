import products from '../data/products.json';
import { Product } from '../types/Product';

const getAllProducts = (): Product[] => {
    return products;
};

const getProductById = (id: number): Product => {
    const product = products.find((product) => product.productId === id);

    if (product === undefined) {
        throw new Error(`product with id ${id} does not exists`);
    } else {
        return product;
    }
};

export default {
    getAllProducts,
    getProductById
}