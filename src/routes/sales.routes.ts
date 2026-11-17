import { Router } from "express";
import {
  createSale,
  getSaleById,
  getSales,
} from "../controllers/sales.controller.js";
import { validateCreateSale } from "../middlewares/validate-sale.middleware.js";

const salesRouter = Router();

salesRouter.get("/", getSales);
salesRouter.get("/:id", getSaleById);
salesRouter.post("/", validateCreateSale, createSale);

export default salesRouter;
