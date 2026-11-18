import prisma from "../config/prisma.js";
import type { ClientInput } from "../middlewares/validate.schema.js";

export async function createClient(data: ClientInput) {
  return prisma.client.create({ data });
}

export async function getAllClients() {
  return prisma.client.findMany();
}

export async function getClientById(id: number) {
  return prisma.client.findUnique({
    where: { id },
    include: { sales: true },
  });
}
