import type { ErrorRequestHandler } from "express";
import { ModelError } from "../models/model-error.js";
export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }
  if (error instanceof ModelError) {
    res.status(error.status).json({ error: error.message });
    return;
  }
  console.error("Error en la solicitud:", error);
  res.status(500).json({ error: "Ocurrió un error interno." });
};
/* tuve que crear esto para que no me llore el el vs code */