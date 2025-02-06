// src/models/Booking.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  name: string;
  age: number;
  sessions: number;
  paymentMethod: "card" | "bank";
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sessions: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["card", "bank"], required: true },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
