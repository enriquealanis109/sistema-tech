import type { Request, Response, NextFunction } from "express";
import { categoryUpdateSchema } from "../schemas/category.schema.js";

export function validateCategoryUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const resultado = categoryUpdateSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            ok: false,
            mensaje: "Datos de actualización de categoría inválidos",
            errores: resultado.error.issues.map(error => error.message)
        });
    }

    req.body = resultado.data;
    next();
}