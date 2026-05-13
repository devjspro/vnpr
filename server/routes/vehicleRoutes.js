import express from "express";
import multer from "multer";
import { processImage, getLogs } from "../controllers/vehicleController.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("image"), processImage);
router.get("/logs", getLogs);

export default router;