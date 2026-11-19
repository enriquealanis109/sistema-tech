import prisma from "../config/prisma.js";
import type { EmployeeInput } from "../middlewares/validate.employee.js";

export async function createEmployee(data: EmployeeInput) {
  return prisma.employee.create({ data });
}

export async function getAllEmployees() {
  return prisma.employee.findMany();
}

export async function getEmployeeById(id: number) {
  return prisma.employee.findUnique({
    where: { id },
    include: { sales: true },
  });
}

export async function updateEmployee(id: number, data: EmployeeInput) {
  return prisma.employee.update({ where: { id }, data });
}

export async function deleteEmployee(id: number) {
  return prisma.employee.delete({ where: { id } });
}
