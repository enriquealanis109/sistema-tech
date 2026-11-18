
import { Router } from "express";

import {
    registrarProducto,
    obtenerProductos,
    obtenerProductoPorId,
    editarProducto,
    borrarProducto
} from "../controllers/product.controller.js";

const router: Router = Router();

router.post("/", registrarProducto);

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoPorId);

router.put("/:id", editarProducto);

router.delete("/:id", borrarProducto);

export default router;
