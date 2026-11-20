
import type { Request, Response } from "express";

import {
    crearCategoria,
    listarCategorias,
    buscarCategoriaPorId,
    elimininarCategoria,
    actualizarCategoria
} from "../models/category.model.js";

export async function registrarCategoria(req: Request, res: Response) {
    /*
    #swagger.tags = ['Categorías']
    #swagger.summary = 'Registrar una nueva categoría'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            name: 'Electrónica'
        }
    }
    */
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({
                ok: false,
                mensaje: "El nombre de la categoría es obligatorio"
            });
        }

        const categoria = await crearCategoria(name);

        return res.status(201).json({
            ok: true,
            mensaje: "Categoría registrada correctamente",
            data: categoria
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al registrar la categoría"
        });
    }
}

export async function obtenerCategorias(req: Request, res: Response) {
    /*
    #swagger.tags = ['Categorías']
    #swagger.summary = 'Listar todas las categorías'
    */
    try {
        const categorias = await listarCategorias();

        return res.status(200).json({
            ok: true,
            data: categorias
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al obtener las categorías"
        });
    }
}

export async function obtenerCategoriaPorId(req: Request, res: Response) {
    /*
    #swagger.tags = ['Categorías']
    #swagger.summary = 'Obtener una categoría por ID'
    */
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        const categoria = await buscarCategoriaPorId(id);

        if (!categoria) {
            return res.status(404).json({
                ok: false,
                mensaje: "Categoría no encontrada"
            });
        }

        return res.status(200).json({
            ok: true,
            data: categoria
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al buscar la categoría"
        });
    }
}

export async function borrarCategoria(req: Request, res: Response) {
    /*
    #swagger.tags = ['Categorías']
    #swagger.summary = 'Eliminar una categoría por ID'
    */
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        const categoria = await buscarCategoriaPorId(id);

        if (!categoria) {
            return res.status(404).json({
                ok: false,
                mensaje: "Categoría no encontrada"
            });
        }

        await elimininarCategoria(id);

        return res.status(200).json({
            ok: true,
            mensaje: "Categoría eliminada correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al eliminar la categoría"
        });
    }
}

export async function editarCategoria(req: Request, res: Response) {
    /*
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Actualizar una categoría por ID'
        #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                name: 'Tecnología'
            }
        }
    */
    try {
        const id = Number(req.params.id);
        const { name } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                mensaje: "ID inválido"
            });
        }

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                ok: false,
                mensaje: "El nombre de la categoría es obligatorio"
            });
        }

        const categoriaExistente = await buscarCategoriaPorId(id);

        if (!categoriaExistente) {
            return res.status(404).json({
                ok: false,
                mensaje: "Categoría no encontrada"
            });
        }

        const categoria = await actualizarCategoria(id, name.trim());

        return res.status(200).json({
            ok: true,
            mensaje: "Categoría actualizada correctamente",
            data: categoria
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: "Error al actualizar la categoría"
        });
    }
}
