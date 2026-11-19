import type { Request, Response } from "express";
import { getSupplier, createSupplier } from "../models/supplier.model.js";

export async function getSupplierController(req: Request, res: Response) {
  try {
    const suppliers = await getSupplier();

    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error al consultar los proveedores", error);

    res.status(500).json({
      message: "Error al consultar los proveedores",
    });
  }
}

export async function createSupplierController(req: Request, res: Response) {
  try {
    const { name, phone } = req.body;

    const nuevoProveedor = await createSupplier(name, phone);

    res.status(201).json(nuevoProveedor);
  } catch (error) {
    console.error("Error al registrar proveedor:", error);

    res.status(500).json({
      message: "Error al registrar el proveedor",
    });
  }
}
