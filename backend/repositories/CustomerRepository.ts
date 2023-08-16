import customers from "../data/customers.json";
import { Customer } from "../types/Customer";

const getAllCustomers = (): Customer[] => {
    return customers;
};

const getCustomerById = (id: number): Customer => {
    const customer = customers.find((customer) => customer.id === id);

    if (customer === undefined) {
        throw new Error(`customer with id ${id} does not exists`);
    } else {
        return customer;
    }
};

export default {
    getAllCustomers,
    getCustomerById
};