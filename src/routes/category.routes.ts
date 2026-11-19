
import { Router } from "express";

import {
    registrarCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    borrarCategoria
} from "../controllers/category.controller.js";
import { validateCategory } from "../middlewares/validateCategory.js";

const router: Router = Router();

router.post("/", validateCategory, registrarCategoria);

router.get("/", obtenerCategorias);

router.get("/:id", obtenerCategoriaPorId);

router.delete("/:id", borrarCategoria);

export default router;
