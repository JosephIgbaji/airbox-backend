import Booking from "../models/Booking.js";

export const getMetrics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const revenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    res.json({ totalBookings, revenue: revenue[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: "Error fetching metrics" });
  }
};
