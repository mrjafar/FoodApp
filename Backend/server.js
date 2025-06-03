import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";

import path from "path";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// This line is required to make uploaded images publicly accessible
app.use("/upload", express.static(path.resolve("upload")));

// app config

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// DB connection----
connectDB();

// api endpoints----
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

// express server---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
