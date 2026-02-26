import pandas as pd

DATA_PATH = "data/processed/cleaned_data.csv"

def generate_ai_insights():
    try:
        df = pd.read_csv(DATA_PATH)
    except Exception:
        return {"summary": "Data not found.", "why": "", "recommendation": ""}

    if df.empty:
        return {"summary": "No data available.", "why": "", "recommendation": ""}

    # Finding best platform based on Total_Engagement
    best_platform = df.groupby("Platform")["Total_Engagement"].sum().idxmax()
    
    # Finding best hour
    best_hour = df.groupby("Hour")["Total_Engagement"].mean().idxmax()

    positive_ratio = (df["Sentiment"] == "Positive").mean()
    sentiment_text = "highly positive" if positive_ratio > 0.5 else "mixed/neutral"

    return {
        "summary": f"{best_platform} is your strongest channel.",
        "why": f"Engagement peaks at {best_hour}:00 with a {sentiment_text} audience response.",
        "recommendation": f"Schedule your next big post for {best_hour}:00 on {best_platform} to maximize reach."
    }