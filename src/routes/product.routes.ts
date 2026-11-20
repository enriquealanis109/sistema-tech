
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
import { z } from "zod";

export const purchaseDetailSchema = z.object({
    quantity: z.number()
        .int("La cantidad debe ser un número entero")
        .positive("La cantidad debe ser mayor que cero"),

    unitPrice: z.number()
        .positive("El precio unitario debe ser mayor que cero"),

    purchaseId: z.number()
        .int("El ID de compra debe ser un número entero")
        .positive("Debes seleccionar una compra válida"),

    productId: z.number()
        .int("El ID del producto debe ser un número entero")
        .positive("Debes seleccionar un producto válido")
});