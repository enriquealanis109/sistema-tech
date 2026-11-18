import { Router } from "express";
import {
  getSupplierController,
  createSupplierController,
} from "../controllers/supplier.controller.js";

const router = Router();

router.get("/", getSupplierController);
router.post("/", createSupplierController);

export default router;
