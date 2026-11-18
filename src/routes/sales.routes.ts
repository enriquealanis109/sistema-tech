import { Router } from "express";
import {
  createSale,
  getSaleById,
  getSales,
  updateSale,
  deleteSale,
} from "../controllers/sales.controller.js";
import {
  validateCreateSale,
  validateUpdateSale,
} from "../middlewares/validate-sale.middleware.js";

const salesRouter = Router();

salesRouter.get("/", getSales);
salesRouter.get("/:id", getSaleById);
salesRouter.post("/", validateCreateSale, createSale);
salesRouter.patch("/:id", validateUpdateSale, updateSale);
salesRouter.delete("/:id", deleteSale);

export default salesRouter;
