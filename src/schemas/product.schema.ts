import { z } from "zod";

export const productSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "El nombre del producto es obligatorio")
        .max(100, "El nombre no puede superar los 100 caracteres"),

    description: z.string()
        .trim()
        .max(500, "La descripción no puede superar los 500 caracteres")
        .optional(),

    price: z.number()
        .positive("El precio debe ser mayor que cero"),

    stock: z.number()
        .int("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo"),

    categoryId: z.number()
        .int("El ID de categoría debe ser un número entero")
        .positive("Debes seleccionar una categoría válida")
});

export const productUpdateSchema = productSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "Debes enviar al menos un campo para actualizar"
    );