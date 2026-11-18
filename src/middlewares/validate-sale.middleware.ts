import type { RequestHandler } from "express";
import { z } from "zod";
const createSaleSchema = z
  .object({
    clientId: z.number().int().positive(),
    employeeId: z.number().int().positive(),
    sale_details: z
      .array(
        z.object({
          productId: z.number().int().positive(),
          quantity: z.number().int().positive(),
        }),
      )
      .min(1),
  })
  .superRefine(({ sale_details }, context) => {
    const productIds = sale_details.map((detail) => detail.productId);
    if (new Set(productIds).size !== productIds.length) {
      context.addIssue({
        code: "custom",
        message: "No se puede repetir un producto en el detalle de la venta.",
        path: ["sale_details"],
      });
    }
  });
export const validateCreateSale: RequestHandler = (req, res, next) => {
  const parsed = createSaleSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Los datos de la venta no son válidos.",
      sale_details: parsed.error.issues,
    });
    return;
  }
  req.body = parsed.data;
  next();
};
