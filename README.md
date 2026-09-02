# 🧠 MindMate

### AI-Powered Wellness Companion

MindMate is a web-based wellness application designed to help users pause, understand their mood, and take small positive steps toward feeling better.

It combines mood check-ins, AI-powered emotional insights, mood history, and simple reset activities in one easy-to-use interface.

---

## 🎯 Problem Statement

People often experience stress, low mood, anxiety, or emotional ups and downs but may not take a moment to understand what they are feeling or what might be affecting them.

MindMate provides a simple space where users can:

- Check in with their current mood
- Write about what's on their mind
- Receive AI-generated wellness insights
- Understand possible emotional triggers
- Get practical next-step suggestions
- Track mood patterns over time
- Use short calming/reset activities

The goal is to encourage self-awareness and small, positive wellness habits.

---

## 💡 Solution

MindMate turns a simple mood check-in into a personalized wellness experience.

### How it works

1. User selects their current mood.
2. User writes a short journal entry.
3. The entry is sent to the backend.
4. AI analyzes the user's input.
5. MindMate provides:
   - Emotion
   - Intensity
   - Possible trigger
   - Personalized insight
   - Suggested next steps
   - A simple reset activity
6. The check-in is saved locally.
7. The user can view their mood history and mood trend.

---

## ✨ Features

### 😊 Mood Check-ins

Users can choose from five moods:

- Great
- Good
- Okay
- Low
- Stressed

### 🤖 AI Wellness Insights

MindMate analyzes the user's journal entry and generates:

- Emotional insight
- Emotional intensity
- Possible trigger
- Personalized suggestions
- Mind + Body reset activity

### 📊 Mood History

Previous check-ins are stored and displayed in a history section.

Users can view:

- Mood
- Date
- Emotion
- Intensity
- Possible trigger

### 📈 Mood Trend

A visual chart displays the user's recent mood pattern, helping them notice changes over time.

### 🌿 Calm Mode

MindMate provides simple breathing and relaxation activities designed to help users take a short reset.

### 🔒 Privacy

Mood history is stored locally in the browser using LocalStorage.

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- Recharts

### Backend

- Node.js
- Express.js
- CORS
- dotenv

### AI

- Google Gemini API

### Storage

- Browser LocalStorage

---

## 🏗️ Project Structure

```text
MindMate/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── MoodCheckin.jsx
│   │   ├── MoodHistory.jsx
│   │   ├── CalmMode.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
└── README.md