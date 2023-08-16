import { Router } from "express";
import {
    getAllPurchases,
    yearlySalesPerMonth,
    getPurchasesPagination,
    getPurchasesLength
} from "../controllers/PurchasesController";


const router = Router();
router.route("/").get(getAllPurchases);
router.route("/:limit/:page").get(getPurchasesPagination);
router.route("/price/yearly/:startDate").get(yearlySalesPerMonth);
router.route("/amount").get(getPurchasesLength);
export default router;