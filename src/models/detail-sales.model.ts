import type { Prisma } from "../generated/prisma/client.js";
import type { SaleDetailInput } from "./sales.model.js";
import { ModelError } from "./model-error.js";
export async function prepareSaleDetails(
  transaction: Prisma.TransactionClient,
  details: SaleDetailInput[],
) {
  const products = await transaction.product.findMany({
    where: { id: { in: details.map((detail) => detail.productId) } },
  });
  const productsById = new Map(products.map((product) => [product.id, product]));
  for (const detail of details) {
    if (!productsById.has(detail.productId)) {
      throw new ModelError(404, `No se encontró el producto ${detail.productId}.`);
    }
  }
  const saleDetails = [];
  for (const detail of details) {
    const product = productsById.get(detail.productId);
    if (!product) {
      throw new ModelError(404, `No se encontró el producto ${detail.productId}.`);
    }
    const updated = await transaction.product.updateMany({
      where: {
        id: detail.productId,
        stock: { gte: detail.quantity },
      },
      data: { stock: { decrement: detail.quantity } },
    });
    if (updated.count !== 1) {
      throw new ModelError(
        409,
        `Existencias insuficientes para el producto ${detail.productId}.`,
      );
    }
    saleDetails.push({
      productId: detail.productId,
      quantity: detail.quantity,
      unitPrice: product.price,
    });
  }
  return saleDetails;
}
