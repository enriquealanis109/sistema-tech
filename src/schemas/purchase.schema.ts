import { z } from "zod";
import { purchaseDetailSchema } from "./purchaseDetail.schema.js";

const detalleCompraSchema = purchaseDetailSchema.omit({
  purchaseId: true,
});

export const purchaseSchema = z.object({
  supplierId: z
    .number()
    .int("El ID del proveedor debe ser un número entero")
    .positive("Debes seleccionar un proveedor válido"),

  details: z
    .array(detalleCompraSchema)
    .min(1, "La compra debe contener al menos un detalle"),
});

export const purchaseUpdateSchema = purchaseSchema.extend({
  date: z.coerce.date({
    error: "La fecha de la compra no es válida",
  }),
});
