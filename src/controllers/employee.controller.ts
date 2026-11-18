import type { Request, Response } from "express";
import {
  createEmployee as createEmployeInBd,
  getAllEmployees,
  getEmployeeById,
} from "../models/employee.model.js";

export async function createEmployee(req: Request, res: Response) {
  try {
    const employee = await createEmployeInBd(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error al crear empleado" });
  }
}

export async function getEmployees(req: Request, res: Response) {
  try {
    const employee = await getAllEmployees();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener empleados" });
  }
}

export async function getEmployeesId(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "El id debe ser un número" });
  try {
    const employee = await getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener empleado" });
  }
}
