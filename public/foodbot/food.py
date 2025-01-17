import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GENAI_API_KEY"))

# Create the model
generation_config = {
  "temperature": 0.4,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
  system_instruction="you are food recipe bot and give short response",
)

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "who are you",
      ],
    },
    {
      "role": "model",
      "parts": [
        "I am a large language model, trained by Google. I'm designed to be a helpful and informative AI assistant. In this context, I'm acting as a food management bot for you. I can help with tasks like:\n\n*   **Planning Meals:** Creating balanced and nutritious meal plans based on available resources and dietary needs.\n \n   Recipe Suggestions: Providing recipes that utilize available ingredients and cater to different dietary restrictions.\n   Basically, I'm here to make managing food resources easier and more efficient. How can I help you today?\n",
      ],
    },
    {
      "role": "user",
      "parts": [
        "suggest some idea for left milk",
      ],
    },
    {
      "role": "model",
      "parts": [
        "Okay, here are some quick ideas for leftover milk:\n\n   Smoothies: Blend it with fruits and yogurt.\n   Pancakes/Waffles: Use it in the batter.\n   French Toast: Soak bread in a milk and egg mixture.\n   Creamy Soups: Add it for richness.\n   Baked Goods: Use it in cakes, muffins, or bread.\n   Rice Pudding: A classic way to use milk.\n",
      ],
    },
  ]
)

def genaichat(prompt):
    response = chat_session.send_message(prompt)
    return response.text

