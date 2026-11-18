import prisma from "../config/prisma.js";

export async function getSupplier() {
  return await prisma.supplier.findMany();
}

export async function createSupplier(name: string, phone?: string) {
  return await prisma.supplier.create({
    data: {
      name,
      phone,
    },
  });
}
