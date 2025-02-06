// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import bookingRoutes from "./routes/bookingRoutes";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", bookingRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
