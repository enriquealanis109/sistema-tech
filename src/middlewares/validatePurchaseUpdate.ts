import type { Request, Response, NextFunction } from "express";
import { purchaseUpdateSchema } from "../schemas/purchase.schema.js";

export function validatePurchaseUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = purchaseUpdateSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      ok: false,
      mensaje: "Datos de la compra inválidos",
      errores: resultado.error.issues.map((error) => error.message),
    });
  }

  req.body = resultado.data;

  next();
}
