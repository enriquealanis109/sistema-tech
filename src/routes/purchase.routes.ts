import { Router } from "express";
import {
  getPurchaseController,
  getPurchaseByIdController,
  createPurchaseController,
  updatePurchaseController,
  deletePurchaseController,
} from "../controllers/purchase.controller.js";

const router = Router();

router.get("/", getPurchaseController);
router.get("/:id", getPurchaseByIdController);
router.post("/", createPurchaseController);
router.put("/:id", updatePurchaseController);
router.delete("/:id", deletePurchaseController);

export default router;
