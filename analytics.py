from fastapi import APIRouter, HTTPException
import pandas as pd
from fastapi import APIRouter, Query

analytics_router = APIRouter()
DATA_PATH = "data/processed/cleaned_data.csv"


def load_data():
    try:
        return pd.read_csv(DATA_PATH)
    except Exception:
        raise HTTPException(status_code=500, detail="Analytics data not available")
from services.insight import generate_ai_insights # Import your logic

@analytics_router.get("/ai-insights")
def get_ai_insights():
    try:
        return generate_ai_insights()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@analytics_router.get("/overview")
def overview():
    df = load_data()
    return {
        "total_posts": len(df),
        "platforms": df["Platform"].unique().tolist(),
        "avg_likes": int(df["Likes"].mean()),
        "avg_retweets": int(df["Retweets"].mean()),
        "total_engagement": int(df["Total_Engagement"].sum())
    }


@analytics_router.get("/platform-comparison")
def platform_comparison():
    df = load_data()
    return df.groupby("Platform")["Total_Engagement"].sum().to_dict()


@analytics_router.get("/hourly-trends")
def hourly_trends():
    df = load_data()
    return df.groupby("Hour")["Total_Engagement"].mean().to_dict()


@analytics_router.get("/format-performance")
def format_performance():
    df = load_data()
    return df.groupby("Type")["Total_Engagement"].mean().to_dict()


@analytics_router.get("/category-sentiment")
def category_sentiment():
    df = load_data()
    return (
        df.groupby(["Category", "Sentiment"])
        .size()
        .unstack(fill_value=0)
        .reset_index()
        .to_dict(orient="records")
    )


@analytics_router.get("/deep-dive")
def deep_dive():
    df = load_data()
    return {
        "type_efficiency": df.groupby("Type")["Total_Engagement"].mean().to_dict(),
        "best_hour": int(df.groupby("Hour")["Total_Engagement"].mean().idxmax())
    }

