import type { Request, Response, NextFunction } from "express";
import { purchaseDetailSchema } from "../schemas/purchaseDetail.schema.js";

export function validatePurchaseDetail(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const resultado = purchaseDetailSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            ok: false,
            mensaje: "Datos del detalle de compra inválidos",
            errores: resultado.error.issues.map(error => error.message)
        });
    }

    req.body = resultado.data;

    next();
}