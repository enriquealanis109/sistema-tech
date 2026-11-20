
import { Router } from "express";

import {
    registrarDetalleCompra,
    obtenerDetallesCompra,
    obtenerDetalleCompraPorId,
    borrarDetalleCompra,
    editarDetalleCompra
} from "../controllers/purchaseDetail.controller.js";

import { validatePurchaseDetailUpdate } from "../middlewares/validatePurchaseDetailUpdate.js";
import { validatePurchaseDetail } from "../middlewares/validatePurchaseDetail.js";
const router: Router = Router();

router.post("/", validatePurchaseDetail, registrarDetalleCompra);
router.get("/", obtenerDetallesCompra);

router.get("/:id", obtenerDetalleCompraPorId);

router.put("/:id", validatePurchaseDetailUpdate, editarDetalleCompra);
router.delete("/:id", borrarDetalleCompra);

export default router;
