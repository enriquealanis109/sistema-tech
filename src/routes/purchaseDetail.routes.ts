
import { Router } from "express";

import {
    registrarDetalleCompra,
    obtenerDetallesCompra,
    obtenerDetalleCompraPorId,
    borrarDetalleCompra
} from "../controllers/purchaseDetail.controller.js";

const router: Router = Router();

router.post("/", registrarDetalleCompra);

router.get("/", obtenerDetallesCompra);

router.get("/:id", obtenerDetalleCompraPorId);

router.delete("/:id", borrarDetalleCompra);

export default router;
