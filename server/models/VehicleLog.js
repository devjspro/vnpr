import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  plateNumber: String,
  imageUrl: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("VehicleLog", vehicleSchema);