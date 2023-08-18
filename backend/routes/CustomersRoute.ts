import { Router } from "express";
import { getCustomersPagination } from "../controllers/CustomersController";

const router = Router();

router.route("/:limit/:page").get(getCustomersPagination);

export default router;
