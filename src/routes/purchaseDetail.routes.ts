
import { Router } from "express";

import {
    registrarDetalleCompra,
    obtenerDetallesCompra,
    obtenerDetalleCompraPorId,
    borrarDetalleCompra
} from "../controllers/purchaseDetail.controller.js";

import { validatePurchaseDetail } from "../middlewares/validatePurchaseDetail.js";
const router: Router = Router();

router.post("/", validatePurchaseDetail, registrarDetalleCompra);
router.get("/", obtenerDetallesCompra);

router.get("/:id", obtenerDetalleCompraPorId);

router.delete("/:id", borrarDetalleCompra);

export default router;
