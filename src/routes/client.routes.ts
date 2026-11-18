import { Router } from "express";
import {
  createClient,
  getClients,
  getClientId,
} from "../controllers/client.controller.js";
import { validateClient } from "../middlewares/validate.schema.js";

const router: Router = Router();

router.post("/clients", validateClient, createClient);
router.get("/clients", getClients);
router.get("/clients/:id", getClientId);

export default router;
