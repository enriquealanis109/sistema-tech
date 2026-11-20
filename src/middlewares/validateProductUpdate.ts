import type { Request, Response, NextFunction } from "express";
import { productUpdateSchema } from "../schemas/product.schema.js";

export function validateProductUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const resultado = productUpdateSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            ok: false,
            mensaje: "Datos de actualización inválidos",
            errores: resultado.error.issues.map(error => error.message)
        });
    }

    req.body = resultado.data;

    next();
}