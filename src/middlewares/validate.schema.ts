import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("El email no tiene formato valido")
    .optional(),
});

export const validateClient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = clientSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Datos invalidos" });
    return;
  }
  req.body = result.data;
  next();
};

export type ClientInput = z.infer<typeof clientSchema>;
