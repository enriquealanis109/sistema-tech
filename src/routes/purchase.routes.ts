import { Router } from "express";
import {
  getPurchaseController,
  getPurchaseByIdController,
  createPurchaseController,
  updatePurchaseController,
  deletePurchaseController,
} from "../controllers/purchase.controller.js";

import { validatePurchase } from "../middlewares/validatePurchase.js";
import { validatePurchaseUpdate } from "../middlewares/validatePurchaseUpdate.js";

const router = Router();

router.get("/", getPurchaseController);
router.get("/:id", getPurchaseByIdController);
router.post("/", validatePurchase, createPurchaseController);
router.put("/:id", validatePurchaseUpdate, updatePurchaseController);
router.delete("/:id", deletePurchaseController);

export default router;
