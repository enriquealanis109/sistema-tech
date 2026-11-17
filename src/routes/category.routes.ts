
import { Router } from "express";

import {
    registrarCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    borrarCategoria
} from "../controllers/category.controller.js";

const router: Router = Router();

router.post("/", registrarCategoria);

router.get("/", obtenerCategorias);

router.get("/:id", obtenerCategoriaPorId);

router.delete("/:id", borrarCategoria);

export default router;
