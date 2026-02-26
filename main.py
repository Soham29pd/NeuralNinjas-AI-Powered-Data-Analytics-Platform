import os
from pathlib import Path
from dotenv import load_dotenv

# =====================================================
# 1. Load environment variables FIRST
# =====================================================
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Optional debug check (safe to keep)
print(f"--- Environment Check ---")
print(f"GROQ_API_KEY found: {'Yes' if os.getenv('GROQ_API_KEY') else 'No'}")
print(f"--------------")

# =====================================================
# 2. Imports AFTER env is loaded
# =====================================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.analytics import analytics_router
from routes.ai_query import ai_router
from routes.sentiment import sentiment_router
from routes.upload import upload_router

# =====================================================
# 3. App initialization
# =====================================================
app = FastAPI(title="NeuralNinjas Backend API")

# =====================================================
# 4. Middleware
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Frontend access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# 5. Router registration (CRITICAL FIX)
# =====================================================
app.include_router(analytics_router, prefix="/api/analytics", tags=["analytics"])
app.include_router(ai_router, prefix="/api/ai", tags=["ai"])
app.include_router(sentiment_router, prefix="/api/sentiment", tags=["sentiment"])
app.include_router(upload_router, prefix="/api/upload", tags=["upload"])

# =====================================================
# 6. Health check
# =====================================================
@app.get("/")
def root():
    return {"status": "Backend running successfully"}

# =====================================================
# 7. Existing data preview route (UNCHANGED)
# =====================================================
@app.get("/data-preview")
def preview():
    import pandas as pd
    df = pd.read_csv("data/processed/cleaned_data.csv")
    return df.head(5).to_dict(orient="records")
