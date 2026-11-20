import type { Request, Response } from "express";
import {
  getPurchase,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../models/purchase.model.js";

export async function getPurchaseController(req: Request, res: Response) {
  /* #swagger.tags = ['Purchases']
     #swagger.summary = 'Lista todas las compras activas'
  */
  try {
    const purchases = await getPurchase();

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error al consultar las compras", error);

    res.status(500).json({
      message: "Error al consultar las compras",
    });
  }
}

export async function getPurchaseByIdController(req: Request, res: Response) {
  /* #swagger.tags = ['Purchases']
     #swagger.summary = 'Obtiene una compra por ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID de la compra',
       required: true,
       type: 'integer'
     }
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID de la compra no es válido",
      });
      return;
    }

    const purchase = await getPurchaseById(id);

    if (!purchase) {
      res.status(404).json({
        message: "Compra no encontrada",
      });
      return;
    }

    res.status(200).json(purchase);
  } catch (error) {
    console.error("Error al consultar la compra", error);

    res.status(500).json({
      message: "Error al consultar la compra",
    });
  }
}

export async function createPurchaseController(req: Request, res: Response) {
  /* #swagger.tags = ['Purchases']
     #swagger.summary = 'Registra una compra nueva'
     #swagger.parameters['body'] = {
       in: 'body',
       schema: {
         supplierId: 1,
         details: [
           {
             productId: 1,
             quantity: 5,
             unitPrice: 25000
           }
         ],
         required: ['supplierId', 'details']
       }
     }
  */
  try {
    const { supplierId, details } = req.body;

    const nuevaCompra = await createPurchase(supplierId, details);

    res.status(201).json(nuevaCompra);
  } catch (error) {
    console.error("Error al registrar compra:", error);

    res.status(500).json({
      message: "Error al registrar la compra",
    });
  }
}

export async function updatePurchaseController(req: Request, res: Response) {
  /* #swagger.tags = ['Purchases']
     #swagger.summary = 'Actualiza una compra existente'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID de la compra',
       required: true,
       type: 'integer'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       schema: {
         date: '2026-11-19T10:00:00.000Z',
         supplierId: 1,
         details: [
           {
             productId: 1,
             quantity: 5,
             unitPrice: 25000
           }
         ],
         required: ['date', 'supplierId', 'details']
       }
     }
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID de la compra no es válido",
      });
      return;
    }

    const { date, supplierId, details } = req.body;

    const compraExistente = await getPurchaseById(id);

    if (!compraExistente) {
      res.status(404).json({
        message: "Compra no encontrada",
      });
      return;
    }

    const compraActualizada = await updatePurchase(
      id,
      date,
      supplierId,
      details,
    );

    res.status(200).json(compraActualizada);
  } catch (error) {
    console.error("Error al actualizar la compra:", error);

    res.status(500).json({
      message: "Error al actualizar la compra",
    });
  }
}

export async function deletePurchaseController(req: Request, res: Response) {
  /* #swagger.tags = ['Purchases']
     #swagger.summary = 'Anula una compra mediante Soft Delete'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID de la compra',
       required: true,
       type: 'integer'
     }
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID de la compra no es válido",
      });
      return;
    }

    const compraExistente = await getPurchaseById(id);

    if (!compraExistente) {
      res.status(404).json({
        message: "Compra no encontrada",
      });
      return;
    }

    await deletePurchase(id);

    res.status(200).json({
      message: "Compra anulada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar la compra:", error);

    res.status(500).json({
      message: "Error al eliminar la compra",
    });
  }
}
