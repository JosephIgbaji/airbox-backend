import express from "express";
import { getMetrics } from "../controllers/metricController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getMetrics);

export default router;
