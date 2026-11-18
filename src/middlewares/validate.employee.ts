import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  position: z.string().trim().optional(),
});

export const validateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = employeeSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Datos invalidos" });
    return;
  }
  req.body = result.data;
  next();
};

export type EmployeeInput = z.infer<typeof employeeSchema>;
