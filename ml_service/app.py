from fastapi import FastAPI, UploadFile, File
import cv2
import numpy as np
import pytesseract
from PIL import Image
import io

app = FastAPI()

def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    blur = cv2.bilateralFilter(gray, 11, 17, 17)

    thresh = cv2.threshold(
        blur,
        150,
        255,
        cv2.THRESH_BINARY
    )[1]

    return thresh

@app.get("/")
def home():
    return {"message": "ALPR API Running"}

@app.post("/recognize")
async def recognize_plate(file: UploadFile = File(...)):
    contents = await file.read()

    image = Image.open(io.BytesIO(contents))

    image_np = np.array(image)

    processed = preprocess_image(image_np)

    text = pytesseract.image_to_string(
        processed,
        config='--psm 8'
    )

    return {
        "plate_number": text.strip()
    }