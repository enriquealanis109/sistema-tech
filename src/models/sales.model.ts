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
  details: SaleDetailInput[];
}
const saleInclude = {
  client: true,
  employee: true,
  details: { include: { product: true } },
};
export function findSales() {
  return prisma.sale.findMany({
    orderBy: { date: "desc" },
    include: saleInclude,
  });
}
export function findSaleById(id: number) {
  return prisma.sale.findUnique({
    where: { id },
    include: saleInclude,
  });
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
    const details = await prepareSaleDetails(transaction, input.details);
    return transaction.sale.create({
      data: {
        clientId: input.clientId,
        employeeId: input.employeeId,
        details: { create: details },
      },
      include: saleInclude,
    });
  });
}
