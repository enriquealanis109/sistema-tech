import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import purchaseDetailRoutes from "./routes/purchaseDetail.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import clientRoutes from "./routes/client.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api", clientRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchase-details", purchaseDetailRoutes);
app.use("/api", employeeRoutes);

export default app;
