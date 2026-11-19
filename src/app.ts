import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import salesRouter from "./routes/sales.routes.js";
import swaggerRouter from "./routes/swagger.router.js";
import supplierRoutes from "./routes/supplier.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import clientRoutes from "./routes/client.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import purchaseDetailRoutes from "./routes/purchaseDetail.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/sales", salesRouter);
app.use(errorHandler);

app.use("/api/docs", swaggerRouter);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api", clientRoutes);
app.use("/api", employeeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchase-details", purchaseDetailRoutes);

export default app;
