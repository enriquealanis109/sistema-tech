import { Router } from "express";
import {
  getSupplierController,
  getSupplierByIdController,
  createSupplierController,
  updateSupplierController,
  deleteSupplierController,
} from "../controllers/supplier.controller.js";

const router = Router();

router.get("/", getSupplierController);
router.get("/:id", getSupplierByIdController);
router.post("/", createSupplierController);
router.put("/:id", updateSupplierController);
router.delete("/:id", deleteSupplierController);

export default router;
