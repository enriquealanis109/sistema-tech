import { z } from "zod";

export const purchaseDetailSchema = z.object({
    quantity: z.number()
        .int("La cantidad debe ser un número entero")
        .positive("La cantidad debe ser mayor que cero"),

    unitPrice: z.number()
        .positive("El precio unitario debe ser mayor que cero"),

    purchaseId: z.number()
        .int("El ID de compra debe ser un número entero")
        .positive("Debes seleccionar una compra válida"),

    productId: z.number()
        .int("El ID del producto debe ser un número entero")
        .positive("Debes seleccionar un producto válido")
});

export const purchaseDetailUpdateSchema = purchaseDetailSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "Debes enviar al menos un campo para actualizar"
    );