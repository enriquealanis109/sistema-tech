import type { Request, Response } from "express";
import {
  createClient as createClientInBd,
  getAllClients,
  getClientById,
} from "../models/client.model.js";

export async function createClient(req: Request, res: Response) {
  /* #swagger.tags = ['Clients']
     #swagger.summary = 'Registra un cliente nuevo'
     #swagger.parameters['body'] = {
       in: 'body',
       schema: { name: 'Ana López', email: 'ana@gmail.com' }
     } */
  try {
    const client = await createClientInBd(req.body);
    res.status(201).json(client);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "El correo ya esta registrado" });
    }
    res.status(500).json({ error: "Error al crear el cliente" });
  }
}

export async function getClients(req: Request, res: Response) {
  /* #swagger.tags = ['Clients']
     #swagger.summary = 'Lista todos los clientes' */
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
}

export async function getClientId(req: Request, res: Response) {
  /* #swagger.tags = ['Clients']
     #swagger.summary = 'Obtiene un cliente por su id' */
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "El id debe ser un numero" });
  try {
    const client = await getClientById(id);
    if (!client) {
      return res.status(404).json({ error: "cliente no encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cliente" });
  }
}
