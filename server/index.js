import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log(`db connected`)
})

app.use("/api", vehicleRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));