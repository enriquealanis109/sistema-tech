
import { Router } from "express";

import {
    registrarCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    borrarCategoria,
    editarCategoria
} from "../controllers/category.controller.js";
import { validateCategory } from "../middlewares/validateCategory.js";
import { validateCategoryUpdate } from "../middlewares/validateCategoryUpdate.js";
const router: Router = Router();

router.post("/", validateCategory, registrarCategoria);

router.get("/", obtenerCategorias);

router.get("/:id", obtenerCategoriaPorId);

router.put("/:id", validateCategoryUpdate, editarCategoria);
router.delete("/:id", borrarCategoria);

export default router;
