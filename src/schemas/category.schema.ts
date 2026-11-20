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