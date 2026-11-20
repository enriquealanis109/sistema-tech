import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string({
            error: "El nombre deber ser un texto"
        })
        .trim()
        .min(1, "El nombre de la categoria es obligatorio")
        .max(80, "El nombre no puede superar los 80 caracteres")
});

export const categoryUpdateSchema = categorySchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "Debes enviar al menos un campo para actualizar"
    );