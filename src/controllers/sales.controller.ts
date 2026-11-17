import type { Request, Response } from "express";
import {
  createSale as createSaleRecord,
  findSaleById,
  findSales,
  type CreateSaleInput,
} from "../models/sales.model.js";
export async function getSales(_req: Request, res: Response): Promise<void> {
  res.json(await findSales());
}
export async function getSaleById(
  req: Request,
  res: Response,
): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "El id de la venta debe ser un entero positivo." });
    return;
  }
  const sale = await findSaleById(id);
  if (!sale) {
    res.status(404).json({ error: "No se encontró la venta." });
    return;
  }
  res.json(sale);
}
export async function createSale(
  req: Request<{}, unknown, CreateSaleInput>,
  res: Response,
): Promise<void> {
  const sale = await createSaleRecord(req.body);
  res.status(201).json(sale);
}