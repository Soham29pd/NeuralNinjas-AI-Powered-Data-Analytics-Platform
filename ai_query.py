from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.openai_service import OpenAIService
import logging
import json

logger = logging.getLogger(__name__)

# ❗ IMPORTANT: NO PREFIX HERE
ai_router = APIRouter()
openai_service = OpenAIService()


class Message(BaseModel):
    role: str
    content: str


class AskRequest(BaseModel):
    context: Optional[List[Message]] = None
    dashboardData: Optional[dict] = None
    question: Optional[str] = None


@ai_router.post("/ask")
async def ask_question(request: AskRequest):
    try:
        messages = []

        # ✅ Inject dashboard analytics if provided (button clicked)
        if request.dashboardData:
            # Convert dict nicely to string
            dashboard_str = json.dumps(request.dashboardData, indent=2)
            messages.append({
                "role": "system",
                "content": f"Dashboard Analytics Data (for context only, do not assume user knows):\n{dashboard_str}"
            })

        # Include chat context
        if request.context:
            messages.extend([
                {"role": msg.role, "content": str(msg.content)}
                for msg in request.context
            ])

        # Include explicit question if provided
        if request.question:
            messages.append({
                "role": "user",
                "content": request.question
            })

        if not messages:
            raise HTTPException(status_code=400, detail="No input provided")

        # 🔥 Main AI call
        answer = await openai_service.answer_query(messages)

        return {
            "success": True,
            "answer": answer
        }

    except Exception as e:
        logger.exception("AI query failed")
        raise HTTPException(status_code=500, detail=str(e))
