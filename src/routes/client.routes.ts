import { Router } from "express";
import {
  createClient,
  getClients,
  getClientId,
  updateClient,
  deleteClient,
} from "../controllers/client.controller.js";
import { validateClient } from "../middlewares/validate.schema.js";

const router: Router = Router();

router.post("/clients", validateClient, createClient);
router.get("/clients", getClients);
router.get("/clients/:id", getClientId);
router.put("/clients/:id", validateClient, updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
