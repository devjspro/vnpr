import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../features/vehicle/vehicleSlice.js";
import Loader from "./Loader";

export default function Upload() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, detectedPlate } = useSelector((s) => s.vehicle);

  const handleUpload = () => {
    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadImage(formData));
  };

  return (
    <div className="card">
      <h3>Upload Vehicle Image</h3>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload}>Upload</button>

      {loading && <Loader />}

      {detectedPlate && (
        <p className="result">Detected: {detectedPlate}</p>
      )}
    </div>
  );
}