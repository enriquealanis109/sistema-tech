import type { Request, Response, NextFunction } from "express";
import { purchaseDetailUpdateSchema } from "../schemas/purchaseDetail.schema.js";

export function validatePurchaseDetailUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const resultado = purchaseDetailUpdateSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            ok: false,
            mensaje: "Datos de actualización del detalle de compra inválidos",
            errores: resultado.error.issues.map(error => error.message)
        });
    }

    req.body = resultado.data;

    next();
}