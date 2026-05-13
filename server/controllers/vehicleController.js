import axios from "axios";
import Vehicle from "../models/VehicleLog.js";
import FormData from "form-data";

export const processImage = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      "http://localhost:8000/recognize",
      formData,
      { headers: formData.getHeaders() }
    );

    const plate = response.data.plate_number;

    const log = await Vehicle.create({
      plateNumber: plate,
      imageUrl: "uploaded-image-placeholder"
    });

    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Processing failed" });
  }
};

export const getLogs = async (req, res) => {
  const logs = await Vehicle.find().sort({ timestamp: -1 });
  res.json(logs);
};