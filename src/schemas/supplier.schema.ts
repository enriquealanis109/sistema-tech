import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().trim().min(1, "El nombre del proveedor es obligatorio"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "El teléfono debe contener exactamente 10 dígitos"),
});

export const supplierUpdateSchema = supplierSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Debes enviar al menos un campo para actualizar",
  );
