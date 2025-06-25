import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
dotenv.config();
import { initDB } from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: "https://aboss-frontend.vercel.app", // Must match exactly
  credentials: true, // Allows sending cookies from frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

initDB().then(() => {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  });
});
