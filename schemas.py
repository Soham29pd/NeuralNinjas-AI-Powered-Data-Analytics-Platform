from pydantic import BaseModel

class EngagementInput(BaseModel):
    likes: int
    comments: int
    shares: int
    followers: int

class EngagementOutput(BaseModel):
    engagement_rate: float
