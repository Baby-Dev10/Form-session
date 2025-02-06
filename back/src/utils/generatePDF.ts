// src/utils/generatePDF.ts
import PDFDocument from "pdfkit";
import { Response } from "express";
import { IBooking } from "../models/Booking";

const generatePDF = (booking: IBooking, res: Response): void => {
  const doc = new PDFDocument();

  // Pipe the PDF into the response
  doc.pipe(res);

  doc.fontSize(20).text("Session Booking Receipt", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Full Name: ${booking.name}`);
  doc.text(`Age: ${booking.age}`);
  doc.text(`Number of Sessions: ${booking.sessions}`);
  doc.text(`Payment Method: ${booking.paymentMethod}`);
  doc.moveDown();
  doc.text("Thank you for your booking!", { align: "center" });

  doc.end();
};

export default generatePDF;
