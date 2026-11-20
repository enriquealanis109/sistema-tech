import type { Request, Response } from "express";
import {
  getSupplier,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../models/supplier.model.js";

export async function getSupplierController(req: Request, res: Response) {
  /* #swagger.tags = ['Suppliers']
     #swagger.summary = 'Lista todos los proveedores'
  */
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

export async function getSupplierByIdController(req: Request, res: Response) {
  /* #swagger.tags = ['Suppliers']
     #swagger.summary = 'Obtiene un proveedor por ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID del proveedor',
       required: true,
       type: 'integer'
     }
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID del proveedor no es válido",
      });
      return;
    }

    const supplier = await getSupplierById(id);

    if (!supplier) {
      res.status(404).json({
        message: "Proveedor no encontrado",
      });
      return;
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error("Error al consultar el proveedor", error);

    res.status(500).json({
      message: "Error al consultar el proveedor",
    });
  }
}

export async function createSupplierController(req: Request, res: Response) {
  /* #swagger.tags = ['Suppliers']
     #swagger.summary = 'Registra un proveedor nuevo'
     #swagger.parameters['body'] = {
       in: 'body',
       schema: {
         name: {
           type: "string",
           example: "Distribuidora Central",
         },
         phone: {
           type: "string",
           example: "3001234567",
         },
         required: ["name"],
       }
     }
  */
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

export async function updateSupplierController(req: Request, res: Response) {
  /* #swagger.tags = ['Suppliers']
     #swagger.summary = 'Actualiza los datos de un proveedor'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID del proveedor',
       required: true,
       type: 'integer'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       schema: {
         name: 'Distribuidora Central',
         phone: '3001234567'
       }
     }
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID del proveedor no es válido",
      });
      return;
    }

    const { name, phone } = req.body;

    const proveedorExistente = await getSupplierById(id);

    if (!proveedorExistente) {
      res.status(404).json({
        message: "Proveedor no encontrado",
      });
      return;
    }

    const proveedorActualizado = await updateSupplier(id, name, phone);

    res.status(200).json(proveedorActualizado);
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);

    res.status(500).json({
      message: "Error al actualizar el proveedor",
    });
  }
}

export async function deleteSupplierController(req: Request, res: Response) {
  /* #swagger.tags = ['Suppliers']
     #swagger.summary = 'Elimina un proveedor'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'ID del proveedor',
       required: true,
       type: 'integer'
     }
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID del proveedor no es válido",
      });
      return;
    }

    const proveedorExistente = await getSupplierById(id);

    if (!proveedorExistente) {
      res.status(404).json({
        message: "Proveedor no encontrado",
      });
      return;
    }

    await deleteSupplier(id);

    res.status(200).json({
      message: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);

    res.status(500).json({
      message: "Error al eliminar el proveedor",
    });
  }
}
