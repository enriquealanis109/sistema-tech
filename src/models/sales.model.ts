import prisma from "../config/prisma.js";
import { ModelError } from "./model-error.js";
import { prepareSaleDetails } from "./detail-sales.model.js";
export interface SaleDetailInput {
  productId: number;
  quantity: number;
}
export interface CreateSaleInput {
  clientId: number;
  employeeId: number;
  sale_details: SaleDetailInput[];
}
export interface UpdateSaleInput {
  clientId?: number;
  employeeId?: number;
  sale_details?: SaleDetailInput[];
}
const saleInclude = {
  client: true,
  employee: true,
  saleDetails: { include: { product: true } },
};
function formatSale<T extends { saleDetails: unknown }>(sale: T) {
  const { saleDetails, ...rest } = sale;
  return { ...rest, sale_details: saleDetails };
}
export async function findSales() {
  const sales = await prisma.sale.findMany({
    where: { deletedAt: null },
    orderBy: { date: "desc" },
    include: saleInclude,
  });
  return sales.map(formatSale);
}
export async function findSaleById(id: number) {
  const sale = await prisma.sale.findUnique({
    where: { id, deletedAt: null },
    include: saleInclude,
  });
  return sale ? formatSale(sale) : null;
}
export function createSale(input: CreateSaleInput) {
  return prisma.$transaction(async (transaction) => {
    const [client, employee] = await Promise.all([
      transaction.client.findUnique({ where: { id: input.clientId } }),
      transaction.employee.findUnique({ where: { id: input.employeeId } }),
    ]);
    if (!client) {
      throw new ModelError(404, "No se encontró el cliente.");
    }
    if (!employee) {
      throw new ModelError(404, "No se encontró el empleado.");
    }
    const saleDetails = await prepareSaleDetails(transaction, input.sale_details);
    const sale = await transaction.sale.create({
      data: {
        clientId: input.clientId,
        employeeId: input.employeeId,
        saleDetails: { create: saleDetails },
      },
      include: saleInclude,
    });
    return formatSale(sale);
  });
}

export function updateSale(id: number, input: UpdateSaleInput) {
  return prisma.$transaction(async (transaction) => {
    const sale = await transaction.sale.findUnique({
      where: { id, deletedAt: null },
      include: { saleDetails: true },
    });
    if (!sale) {
      throw new ModelError(404, "No se encontró la venta.");
    }

    if (input.clientId !== undefined) {
      const client = await transaction.client.findUnique({
        where: { id: input.clientId },
      });
      if (!client) {
        throw new ModelError(404, "No se encontró el cliente.");
      }
    }

    if (input.employeeId !== undefined) {
      const employee = await transaction.employee.findUnique({
        where: { id: input.employeeId },
      });
      if (!employee) {
        throw new ModelError(404, "No se encontró el empleado.");
      }
    }

    let preparedDetails: Awaited<
      ReturnType<typeof prepareSaleDetails>
    > | undefined;

    if (input.sale_details !== undefined) {
      for (const detail of sale.saleDetails) {
        await transaction.product.update({
          where: { id: detail.productId },
          data: { stock: { increment: detail.quantity } },
        });
      }
      preparedDetails = await prepareSaleDetails(
        transaction,
        input.sale_details,
      );
    }

    const updated = await transaction.sale.update({
      where: { id },
      data: {
        ...(input.clientId !== undefined && { clientId: input.clientId }),
        ...(input.employeeId !== undefined && { employeeId: input.employeeId }),
        ...(preparedDetails !== undefined && {
          saleDetails: {
            deleteMany: {},
            create: preparedDetails,
          },
        }),
      },
      include: saleInclude,
    });
    return formatSale(updated);
  });
}

export function softDeleteSale(id: number) {
  return prisma.$transaction(async (transaction) => {
    const sale = await transaction.sale.findUnique({
      where: { id, deletedAt: null },
      include: { saleDetails: true },
    });
    if (!sale) {
      throw new ModelError(404, "No se encontró la venta.");
    }

    for (const detail of sale.saleDetails) {
      await transaction.product.update({
        where: { id: detail.productId },
        data: { stock: { increment: detail.quantity } },
      });
    }

    await transaction.sale.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  });
}
