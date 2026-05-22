import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Finance Tracker API is healthy",
  });
});

export default router;

