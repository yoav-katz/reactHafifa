import { NextFunction, Request, Response } from "express";
import customerService from "../services/CustomerService";
import CustomerService from "../services/CustomerService";

const getCustomersPagination = async (
  { params: { page, limit } }: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(CustomerService.getCustomersPagination(Number(page), Number(limit)));
};

export { getCustomersPagination };
