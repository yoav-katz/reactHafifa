import { NextFunction, Request, Response } from "express";
import purchasesService from "../services/PurchasesService";

const getAllPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const purchases = purchasesService.getAllPurchases();

  res.send(purchases);
};

const getPurchasesPagination = async (
  { params: { page, limit } }: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(
    purchasesService.getPurchasesPagination(Number(page), Number(limit))
  );
};

const yearlySalesPerMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(
    purchasesService.yearlySalesPerMonth(new Date(Number(req.params.startDate)))
  );
};

const getPurchasesLength = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(String(purchasesService.getAllPurchases().length));
};

const salesPerMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(
    purchasesService.salesPerMonth(new Date(Number(req.params.startDate)))
  );
};

export {
  getAllPurchases,
  yearlySalesPerMonth,
  getPurchasesPagination,
  getPurchasesLength,
  salesPerMonth,
};
