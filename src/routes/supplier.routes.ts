import { Router } from "express";
import {
  getSupplierController,
  getSupplierByIdController,
  createSupplierController,
  updateSupplierController,
  deleteSupplierController,
} from "../controllers/supplier.controller.js";
import { validateSupplier } from "../middlewares/validateSupplier.js";
import { validateSupplierUpdate } from "../middlewares/validateSupplierUpdate.js";

const router = Router();

router.get("/", getSupplierController);
router.get("/:id", getSupplierByIdController);
router.post("/", validateSupplier, createSupplierController);
router.put("/:id", validateSupplierUpdate, updateSupplierController);
router.delete("/:id", deleteSupplierController);

export default router;
