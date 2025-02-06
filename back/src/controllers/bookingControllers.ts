// src/controllers/bookingController.ts
import { Request, Response } from "express";
import Booking, { IBooking } from "../models/Booking";
import generatePDF from "../utils/generatePDF";

export const submitForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const booking: IBooking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking successful!", id: booking._id });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form", error });
  }
};

export const getReceipt = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    // Set headers to force download of PDF
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt-${booking._id}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    generatePDF(booking, res);
  } catch (error) {
    res.status(500).json({ message: "Error generating receipt", error });
  }
};
