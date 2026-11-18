import { Router } from "express";
import {
  createClient,
  getClients,
  getClientId,
} from "../controllers/clientController.js";
import { validateClient } from "../middlewares/validateSchema.js";

const router: Router = Router();

router.post("/clients", validateClient, createClient);
router.get("/clients", getClients);
router.get("/clients/:id", getClientId);

export default router;
