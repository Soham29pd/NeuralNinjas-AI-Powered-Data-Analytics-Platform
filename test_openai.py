import asyncio
from Backend.services.openai_service import OpenAIService

async def test_ai():
    service = OpenAIService()
    question = "Who is Virat Kohli?"
    answer = await service.answer_query(question)
    print("AI answer:", answer)

if __name__ == "__main__":
    asyncio.run(test_ai())
