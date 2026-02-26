import os
import asyncio
import logging
from groq import Groq

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OpenAIService:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")

        if not self.api_key:
            logger.error("❌ GROQ_API_KEY not found. AI disabled.")
            self.client = None
        else:
            try:
                self.client = Groq(api_key=self.api_key)
                logger.info("✅ Groq client initialized.")
            except Exception as e:
                logger.error(f"❌ Groq init failed: {e}")
                self.client = None

    async def answer_query(self, messages: list) -> str:
        if not self.client:
            return "AI Service unavailable. Missing API key."

        try:
            response = await asyncio.to_thread(
                lambda: self.client.chat.completions.create(
                    model="llama-3.1-8b-instant",
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "You are a personal insights AI assistant. "
                                "You analyze dashboards, user behavior, CSV data, "
                                "and provide clear, actionable insights."
                            )
                        },
                        *messages
                    ],
                    temperature=0.7,
                    max_tokens=700
                )
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            logger.exception("Groq API error")
            return f"Error: {str(e)}"
