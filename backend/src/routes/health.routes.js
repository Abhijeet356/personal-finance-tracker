import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  res.status(isDatabaseConnected ? 200 : 503).json({
    success: isDatabaseConnected,
    message: "Personal Finance Tracker API is healthy",
    database: isDatabaseConnected ? "connected" : "disconnected",
  });
});

export default router;

