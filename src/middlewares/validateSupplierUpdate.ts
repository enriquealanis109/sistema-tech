import type { Request, Response, NextFunction } from "express";
import { supplierUpdateSchema } from "../schemas/supplier.schema";

export function validateSupplierUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = supplierUpdateSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      ok: false,
      mensaje: "Datos del proveedor inválidos",
      errores: resultado.error.issues.map((error) => error.message),
    });
  }
  req.body = resultado.data;

  next();
}
