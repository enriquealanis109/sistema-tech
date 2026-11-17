
import type { Request, Response } from "express";

import {
    crearProducto,
    listarProductos,
    buscarProductoPorId,
    actualizarProducto,
    eliminarProducto
} from "../models/product.model.js";

export async function registrarProducto(req: Request, res: Response) {
    try {
        const { name, description, price, stock, categoryId } = req.body;

        if (!name || typeof name !== "string" ||
            typeof price !== "number" || price <= 0 ||
            typeof stock !== "number" || stock < 0 ||
            !Number.isInteger(categoryId) || categoryId <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "Datos del producto inválidos"
            });
        }

        const producto = await crearProducto({
            name,
            description,
            price,
            stock,
            categoryId
        });

        return res.status(201).json({
            ok: true,
            mensaje: "Producto registrado correctamente",
            data: producto
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al registrar el producto"
        });
    }
}

export async function obtenerProductos(req: Request, res: Response) {
    try {
        const productos = await listarProductos();

        return res.status(200).json({
            ok: true,
            data: productos
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener los productos"
        });
    }
}

export async function obtenerProductoPorId(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        const producto = await buscarProductoPorId(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: producto
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al buscar el producto"
        });
    }
}

export async function editarProducto(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        const existe = await buscarProductoPorId(id);

        if (!existe) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            });
        }

        const producto = await actualizarProducto(id, req.body);

        return res.status(200).json({
            ok: true,
            mensaje: "Producto actualizado correctamente",
            data: producto
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al actualizar el producto"
        });
    }
}

export async function borrarProducto(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        const existe = await buscarProductoPorId(id);

        if (!existe) {
            return res.status(404).json({
                ok: false,
                mensaje: "Producto no encontrado"
            });
        }

        await eliminarProducto(id);

        return res.status(200).json({
            ok: true,
            mensaje: "Producto eliminado correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al eliminar el producto"
        });
    }
}
