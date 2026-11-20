import prisma from "../config/prisma.js";

export async function getSupplier() {
  return await prisma.supplier.findMany();
}

export async function getSupplierById(id: number) {
  return await prisma.supplier.findUnique({
    where: { id },
    include: {
      purchases: {
        orderBy: {
          date: "desc",
        },
        include: {
          details: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
}

export async function createSupplier(name: string, phone: string) {
  return await prisma.supplier.create({
    data: {
      name,
      phone,
    },
  });
}

export async function updateSupplier(id: number, name: string, phone?: string) {
  return await prisma.supplier.update({
    where: { id },
    data: {
      name,
      phone,
    },
  });
}

export async function deleteSupplier(id: number) {
  return await prisma.supplier.delete({
    where: { id },
  });
}
