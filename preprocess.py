import pandas as pd
import os
from pathlib import Path

# Project root = Backend/
BASE_DIR = Path(__file__).resolve().parent.parent

RAW_PATH = BASE_DIR / "data" / "raw" / "socialbuzz.csv"
PROCESSED_PATH = BASE_DIR / "data" / "processed" / "cleaned_data.csv"

def preprocess_data():
    if not RAW_PATH.exists():
        return f"Error: {RAW_PATH} not found."

    df = pd.read_csv(RAW_PATH)

    # 1. Drop the index artifact
    if "Unnamed: 0" in df.columns:
        df.drop(columns=["Unnamed: 0"], inplace=True)

    # 2. Cleanup Text & Platform
    for col in ["Platform", "Sentiment", "Country"]:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip().str.title()

    # 3. Handle Hashtags
    if "Hashtags" in df.columns:
        df["Hashtags"] = df["Hashtags"].fillna("#general").astype(str)

    # 4. Total Engagement
    df["Total_Engagement"] = df["Likes"] + df["Retweets"]

    # 5. Sentiment Scoring
    sentiment_map = {
        "Positive": 1,
        "Neutral": 0,
        "Negative": -1
    }
    df["Sentiment_Score"] = df["Sentiment"].map(sentiment_map).fillna(0)

    # 6. Numeric cleanup
    numeric_cols = ["Likes", "Retweets", "Year", "Month", "Day", "Hour"]
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0).astype(int)

    # 7. Date column
    try:
        df["Date"] = pd.to_datetime(df[["Year", "Month", "Day"]])
    except Exception:
        df["Date"] = pd.to_datetime(df["Timestamp"]).dt.date

    # Save output
    PROCESSED_PATH.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(PROCESSED_PATH, index=False)

    return f"Preprocessing Complete! {len(df)} rows processed."

if __name__ == "__main__":
    print(preprocess_data())
