
import { Router } from "express";

import {
    registrarProducto,
    obtenerProductos,
    obtenerProductoPorId,
    editarProducto,
    borrarProducto
} from "../controllers/product.controller.js";

import { validateProduct } from "../middlewares/validateProduct.js";
import { validateProductUpdate } from "../middlewares/validateProductUpdate.js";

const router: Router = Router();

router.post("/", validateProduct, registrarProducto);

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoPorId);

router.put("/:id", validateProductUpdate, editarProducto);

router.delete("/:id", borrarProducto);

export default router;
