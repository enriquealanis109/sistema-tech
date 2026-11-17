import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js"
import purchaseDetailRoutes from "./routes/purchaseDetail.routes.js"; const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchase-details", purchaseDetailRoutes);


export default app;
