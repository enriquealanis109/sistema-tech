import type { Request, Response, NextFunction } from "express";
import { productSchema } from "../schemas/product.schema.js";

export function validateProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const resultado = productSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            ok: false,
            mensaje: "Datos del producto inválidos",
            errores: resultado.error.issues.map(error => error.message)
        });
    }

    req.body = resultado.data;

    next();
}