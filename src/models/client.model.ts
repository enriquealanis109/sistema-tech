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

export async function updateClient(id: number, data: ClientInput) {
  return prisma.client.update({
    where: { id },
    data,
  });
}

export async function deleteClient(id: number) {
  return prisma.client.delete({ where: { id } });
}
