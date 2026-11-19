
import type { Request, Response } from "express";

import {
    crearDetalleCompra,
    listarDetallesCompra,
    buscarDetalleCompraPorId,
    eliminarDetalleCompra
} from "../models/purchaseDetail.model.js";

export async function registrarDetalleCompra(req: Request, res: Response) {
    /*
        #swagger.tags = ['Detalles de compra']
        #swagger.summary = 'Registrar un detalle de compra'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                quantity: 5,
                unitPrice: 100,
                purchaseId: 1,
                productId: 2
            }
        }
    */
    try {
        const { quantity, unitPrice, purchaseId, productId } = req.body;

        if (
            !Number.isInteger(quantity) || quantity <= 0 ||
            typeof unitPrice !== "number" || unitPrice <= 0 ||
            !Number.isInteger(purchaseId) || purchaseId <= 0 ||
            !Number.isInteger(productId) || productId <= 0
        ) {
            return res.status(400).json({
                ok: false,
                mensaje: "Datos del detalle de compra inválidos"
            });
        }

        const detalle = await crearDetalleCompra({
            quantity,
            unitPrice,
            purchaseId,
            productId
        });

        return res.status(201).json({
            ok: true,
            mensaje: "Detalle de compra registrado correctamente",
            data: detalle
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al registrar el detalle de compra"
        });
    }
}

export async function obtenerDetallesCompra(req: Request, res: Response) {
    /*
        #swagger.tags = ['Detalles de compra']
        #swagger.summary = 'Listar todos los detalles de compra'
    */
    try {
        const detalles = await listarDetallesCompra();

        return res.status(200).json({
            ok: true,
            data: detalles
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener los detalles de compra"
        });
    }
}

export async function obtenerDetalleCompraPorId(req: Request, res: Response) {
    /*
        #swagger.tags = ['Detalles de compra']
        #swagger.summary = 'Obtener un detalle de compra por ID'
    */
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        const detalle = await buscarDetalleCompraPorId(id);

        if (!detalle) {
            return res.status(404).json({
                ok: false,
                mensaje: "Detalle de compra no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: detalle
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al buscar el detalle de compra"
        });
    }
}

export async function borrarDetalleCompra(req: Request, res: Response) {
    /*
        #swagger.tags = ['Detalles de compra']
        #swagger.summary = 'Eliminar un detalle de compra por ID'
    */
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        const detalle = await buscarDetalleCompraPorId(id);

        if (!detalle) {
            return res.status(404).json({
                ok: false,
                mensaje: "Detalle de compra no encontrado"
            });
        }

        await eliminarDetalleCompra(id);

        return res.status(200).json({
            ok: true,
            mensaje: "Detalle de compra eliminado correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al eliminar el detalle de compra"
        });
    }
}
