import type { Request, Response } from "express";
import {
  createClient as createClientInBd,
  getAllClients,
  getClientById,
} from "../models/clientModel.js";

export async function createClient(req: Request, res: Response) {
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
  try {
    const clients = await getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
}

export async function getClientId(req: Request, res: Response) {
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
