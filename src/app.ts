import express from "express";
import cors from "cors";
import supplierRoutes from "./routes/supplier.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import clientRoutes from "./routes/client.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api", clientRoutes);

export default app;
