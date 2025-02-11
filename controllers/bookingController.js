import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { date, time, price } = req.body;
    const booking = new Booking({ userId: req.user.userId, date, time, price });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error creating booking" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error updating booking" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting booking" });
  }
};
