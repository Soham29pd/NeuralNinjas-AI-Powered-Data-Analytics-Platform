

# 🧠 NeuralNinjas – Personalized Analytics Dashboard with AI Assistant

NeuralNinjas is a **full-stack web application** that allows users to upload their data (as a ZIP file) and instantly receive a **personalized analytics dashboard** along with an **AI-powered chatbot** that can answer questions based on their uploaded data.

The platform supports **user authentication**, **secure file upload**, **data processing**, **visual analytics**, and **context-aware AI interaction** — all in one seamless workflow.

---

## 🚀 Key Features

### 🔐 Authentication

* User **Login & Signup** (already implemented)
* Secure access to personalized dashboards

### 📤 ZIP File Upload

* Users upload a **ZIP file** containing their data
* Backend extracts and validates the uploaded data
* Data is processed and stored per user

### 📊 Personalized Dashboard

* Dashboard is generated **only after data upload**
* Displays analytics such as:

  * Engagement metrics
  * Heatmaps
  * Performance charts
  * Top content insights
* Each user sees **only their own dashboard**

### 💬 AI Chatbot Assistant

* Users can chat with an AI assistant
* The chatbot answers **based on the user’s uploaded data**
* Provides insights, summaries, and explanations
* Context-aware responses using processed analytics

### 🔁 Persistent User Experience

* Once data is uploaded, users can revisit their dashboard
* No need to re-upload unless they want to update data

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* JavaScript
* Firebase (Authentication)
* Chart-based visualization components

### Backend

* Python
* FastAPI
* OpenAI API
* Data processing & analytics services

### Other Tools

* REST APIs
* ZIP file handling
* JSON-based analytics storage

---

## 📁 Project Structure

```
NEURALNINJAS-MAIN
│
├── Backend
│   ├── api
│   │   └── ai
│   │       └── ask.py
│   │
│   ├── data
│   │   ├── uploads/        # User ZIP files
│   │   └── processed/      # User-specific analytics
│   │
│   ├── models
│   │   └── schemas.py
│   │
│   ├── routes
│   │   ├── upload.py       # ZIP upload APIs
│   │   ├── dashboard.py    # Personalized dashboard APIs
│   │   ├── chatbot.py      # Chatbot APIs
│   │   └── analytics.py
│   │
│   ├── services
│   │   ├── zip_handler.py
│   │   ├── data_processor.py
│   │   ├── analytics_engine.py
│   │   ├── insight_generator.py
│   │   └── openai_service.py
│   │
│   └── main.py
│
├── Frontend
│   └── my-app
│       └── src
│           ├── components
│           │   ├── upload
│           │   ├── dashboard
│           │   ├── chatbot
│           │   └── ui
│           │
│           ├── context
│           │   └── UserDataContext.jsx
│           │
│           ├── hooks
│           │   ├── useZipUpload.jsx
│           │   └── useChat.jsx
│           │
│           ├── pages
│           │   ├── Dashboard.jsx
│           │   ├── Assistant.jsx
│           │   └── Auth.jsx
│           │
│           └── App.jsx
│
└── README.md
```

---

## 🔄 Application Flow

1. User signs up / logs in
2. Redirected to **Dashboard**
3. If no data uploaded:

   * ZIP upload screen is shown
4. User uploads ZIP file
5. Backend:

   * Extracts ZIP
   * Processes data
   * Generates analytics
6. Personalized dashboard is displayed
7. User interacts with AI chatbot for insights

---

## 🧠 AI Chatbot Intelligence

The chatbot:

* Uses **processed user data as context**
* Can answer:

  * “What are my top performing posts?”
  * “Show anomalies in engagement”
  * “Summarize my data”
* Enhances decision-making using natural language

---

## ⚙️ Setup Instructions

### Backend

```bash
cd Backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd Frontend/my-app
npm install
npm run dev
```

---

## 🌟 Use Cases

* Social media analytics
* Marketing campaign analysis
* Business intelligence dashboards
* Data-driven decision support
* AI-assisted analytics exploration

---

## 🔮 Future Enhancements

* Multiple dataset uploads per user
* Downloadable analytics reports
* Dashboard customization
* Chat history persistence
* Role-based dashboards

---

## 👨‍💻 Team NeuralNinjas

Built with passion for **AI, data, and user-centric design** 💙
This project demonstrates real-world full-stack development with AI integration.

👥 Team Members – NeuralNinjas

Isha Samant

Shraddha Desai

Parth Banayet

Soham Prabhudesai
