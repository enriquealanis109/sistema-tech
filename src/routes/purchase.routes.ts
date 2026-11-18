import { Router } from "express";
import {
  getPurchaseController,
  createPurchaseController,
} from "../controllers/purchase.controller.js";

const router = Router();

router.get("/", getPurchaseController);
router.post("/", createPurchaseController);

export default router;
