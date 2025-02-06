// src/routes/bookingRoutes.ts
import express from "express";
import { submitForm, getReceipt } from "../controllers/bookingControllers";

const router = express.Router();

// Endpoint to submit the form
router.post("/submit", submitForm);

// Endpoint to download PDF receipt
router.get("/receipt/:id", getReceipt);

export default router;
