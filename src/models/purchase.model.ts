import prisma from "../config/prisma.js";

export async function getPurchase() {
  return await prisma.purchase.findMany({
    where: {
      deletedAt: null,
    },
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

export async function getPurchaseById(id: number) {
  return await prisma.purchase.findFirst({
    where: { id, deletedAt: null },
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

export async function updatePurchase(
  id: number,
  date: Date,
  supplierId: number,
  details: {
    productId: number;
    quantity: number;
    unitPrice: number;
  }[],
) {
  const compraExistente = await prisma.purchase.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!compraExistente) {
    throw new Error("Compra no encontrada o anulada");
  }
  return await prisma.purchase.update({
    where: { id },
    data: {
      date,
      supplierId,
      details: {
        deleteMany: {},
        create: details,
      },
    },
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

export async function deletePurchase(id: number) {
  return await prisma.purchase.update({
    where: { id, deletedAt: null },
    data: {
      deletedAt: new Date(),
    },
  });
}
