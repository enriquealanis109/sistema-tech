import type { Request, Response, NextFunction } from "express";
import { purchaseSchema } from "../schemas/purchase.schema.js";

export function validatePurchase(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = purchaseSchema.safeParse(req.body);

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
