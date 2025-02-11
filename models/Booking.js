import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["confirmed", "canceled"],
      default: "confirmed",
    },
    price: { type: Number, default: 10000 },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
