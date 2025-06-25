import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
dotenv.config();
import { initDB } from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    // origin: "https://aboss-backend.onrender.com", // Removed trailing slash
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();

app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

app.use(express.static(path.join(__dirname, "public")));

// Handle SPA routing - serve index.html for all non-API GET requests
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

initDB().then(() => {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
});