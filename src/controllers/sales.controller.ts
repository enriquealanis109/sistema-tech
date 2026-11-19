import type { Request, Response } from "express";
import {
  createSale as createSaleRecord,
  findSaleById,
  findSales,
  type CreateSaleInput,
  updateSale as updateSaleRecord,
  softDeleteSale,
  type UpdateSaleInput,
} from "../models/sales.model.js";

type CreateSaleRequest = Request<{}, unknown, CreateSaleInput>;
type UpdateSaleRequest = Request<{ id: string }, unknown, UpdateSaleInput>;

function parseSaleId(req: Request, res: Response): number | null {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "El id de la venta debe ser un entero positivo." });
    return null;
  }
  return id;
}
export async function getSales(_req: Request, res: Response): Promise<void> {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Lista las ventas activas'
     #swagger.responses[200] = { description: 'Lista de ventas con sus detalles' } */
  res.json(await findSales());
}
export async function getSaleById(
  req: Request,
  res: Response,
): Promise<void> {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Obtiene una venta por id'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'Identificador de la venta'
     }
     #swagger.responses[200] = { description: 'Venta encontrada con sus detalles' }
     #swagger.responses[404] = { description: 'No se encontró la venta' } */
  const id = parseSaleId(req, res);
  if (id === null) {
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
  req: CreateSaleRequest,
  res: Response,
): Promise<void> {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Registra una venta con sus detalles'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         clientId: 1,
         employeeId: 1,
         sale_details: [
           { productId: 1, quantity: 2 }
         ]
       }
     }
     #swagger.responses[201] = { description: 'Venta creada' }
     #swagger.responses[400] = { description: 'Datos de la venta no válidos' }
     #swagger.responses[404] = { description: 'No se encontró el cliente, empleado o producto' }
     #swagger.responses[409] = { description: 'Existencias insuficientes' } */
  const sale = await createSaleRecord(req.body);
  res.status(201).json(sale);
}

export async function updateSale(
  req: UpdateSaleRequest,
  res: Response,
): Promise<void> {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Actualiza una venta o reemplaza sus detalles'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'Identificador de la venta'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         clientId: 1,
         employeeId: 1,
         sale_details: [
           { productId: 1, quantity: 2 }
         ]
       }
     }
     #swagger.responses[200] = { description: 'Venta actualizada' }
     #swagger.responses[400] = { description: 'Datos de la venta no válidos' }
     #swagger.responses[404] = { description: 'No se encontró la venta, cliente, empleado o producto' }
     #swagger.responses[409] = { description: 'Existencias insuficientes' } */
  const id = parseSaleId(req, res);
  if (id === null) {
    return;
  }
  const sale = await updateSaleRecord(id, req.body);
  res.json(sale);
}

export async function deleteSale(
  req: Request,
  res: Response,
): Promise<void> {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Elimina una venta de forma lógica'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'Identificador de la venta'
     }
     #swagger.responses[200] = { description: 'Venta eliminada' }
     #swagger.responses[404] = { description: 'No se encontró la venta' } */
  const id = parseSaleId(req, res);
  if (id === null) {
    return;
  }
  await softDeleteSale(id);
  res.status(200).json({ message: "La venta fue eliminada correctamente." });
}