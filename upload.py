from fastapi import APIRouter, UploadFile, File
import os

# 1. This variable name MUST match what you import in app.py
upload_router = APIRouter() 

@upload_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Your upload logic here
    return {"message": "Success", "user_id": "session_123"}