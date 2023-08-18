import CustomerRepository from "../repositories/CustomerRepository";
import { Customer } from "../types/Customer";

const getCustomersPagination = (page: number, limit: number): Customer[] => {
  const customers = CustomerRepository.getAllCustomers();
  const startIndex = page * limit;
  return customers.slice(startIndex, startIndex + limit);
};

export default {
  getCustomersPagination,
};
