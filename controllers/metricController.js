import Booking from "../models/Booking.js";

export const getMetrics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    // const revenue = await Booking.aggregate([
    //   { $match: { status: "confirmed" } },
    //   { $group: { _id: null, total: { $sum: "$price" } } },
    // ]);

    const totalBookingPerMonth = await Booking.aggregate([
      {
        $project: {
          year: { $year: "$date" }, // Extract year from date
          month: { $month: "$date" }, // Extract month from date
          price: 1, // Include the price field
        },
      },
      {
        $addFields: {
          monthName: {
            $switch: {
              branches: [
                { case: { $eq: ["$month", 1] }, then: "JAN" },
                { case: { $eq: ["$month", 2] }, then: "FEB" },
                { case: { $eq: ["$month", 3] }, then: "MAR" },
                { case: { $eq: ["$month", 4] }, then: "APR" },
                { case: { $eq: ["$month", 5] }, then: "MAY" },
                { case: { $eq: ["$month", 6] }, then: "JUN" },
                { case: { $eq: ["$month", 7] }, then: "JUL" },
                { case: { $eq: ["$month", 8] }, then: "AUG" },
                { case: { $eq: ["$month", 9] }, then: "SEP" },
                { case: { $eq: ["$month", 10] }, then: "OCT" },
                { case: { $eq: ["$month", 11] }, then: "NOV" },
                { case: { $eq: ["$month", 12] }, then: "DEC" },
              ],
              default: "Unknown", // In case the month is not valid
            },
          },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$monthName" }, // Group by year and month
          totalBookings: { $sum: 1 }, // Count the number of bookings
          // totalPrice: { $sum: "$price" }, // Sum the prices for the month
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month in ascending order
      },
    ]);

    const revenue = await Booking.aggregate([
      {
        $match: { status: "confirmed" }, // Filter by "confirmed" status
      },
      {
        $project: {
          year: { $year: "$date" }, // Extract year from date
          month: { $month: "$date" }, // Extract month from date
          price: 1, // Include the price field
        },
      },
      {
        $addFields: {
          monthName: {
            $switch: {
              branches: [
                { case: { $eq: ["$month", 1] }, then: "Jan." },
                { case: { $eq: ["$month", 2] }, then: "Feb." },
                { case: { $eq: ["$month", 3] }, then: "Mar." },
                { case: { $eq: ["$month", 4] }, then: "Apr." },
                { case: { $eq: ["$month", 5] }, then: "May" },
                { case: { $eq: ["$month", 6] }, then: "Jun." },
                { case: { $eq: ["$month", 7] }, then: "Jul." },
                { case: { $eq: ["$month", 8] }, then: "Aug." },
                { case: { $eq: ["$month", 9] }, then: "Sep." },
                { case: { $eq: ["$month", 10] }, then: "Oct." },
                { case: { $eq: ["$month", 11] }, then: "Nov." },
                { case: { $eq: ["$month", 12] }, then: "Dec." },
              ],
              default: "Unknown", // In case the month is not valid
            },
          },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$monthName" }, // Group by year and month
          total: { $sum: "$price" }, // Sum the prices
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month in ascending order
      },
    ]);

    // console.log({totalBookingPerMonth});

    res.json({ totalBookingPerMonth, revenue: revenue || 0 });
    // res.json(totalBookingPerMonth);
  } catch (error) {
    res.status(500).json({ error: "Error fetching metrics" });
  }
};
