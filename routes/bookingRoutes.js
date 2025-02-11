import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getBookings);
router.put("/:id", authMiddleware, updateBooking);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;
