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
    orderBy: { date: "desc" },
    include: saleInclude,
  });
  return sales.map(formatSale);
}
export async function findSaleById(id: number) {
  const sale = await prisma.sale.findUnique({
    where: { id },
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
