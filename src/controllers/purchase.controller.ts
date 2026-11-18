import type { Request, Response } from "express";
import { getPurchase, createPurchase } from "../models/purchase.model.js";

export async function getPurchaseController(req: Request, res: Response) {
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

export async function createPurchaseController(req: Request, res: Response) {
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
