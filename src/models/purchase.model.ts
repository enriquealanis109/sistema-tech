import prisma from "../config/prisma.js";

export async function getPurchase() {
  return await prisma.purchase.findMany({
    include: {
      supplier: true,
      details: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function createPurchase(
  supplierId: number,
  details: {
    productId: number;
    quantity: number;
    unitPrice: number;
  }[],
) {
  return await prisma.purchase.create({
    data: {
      supplierId,
      details: {
        create: details,
      },
    },
  });
}
