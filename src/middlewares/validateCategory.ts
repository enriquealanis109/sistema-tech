
import type { Request, Response, NextFunction } from "express";
import { categorySchema } from "../schemas/category.schema.js";

export function validateCategory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const resultado = categorySchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            ok: false,
            mensaje: "Datos de categoría inválidos",
            errores: resultado.error.issues.map(error => error.message)
        });
    }

    req.body = resultado.data;

    next();
}
