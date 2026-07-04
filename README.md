# 📝 Quick Note Application

![React](https://img.shields.io/badge/React-19-blue)
![Flask](https://img.shields.io/badge/Flask-Python-black)
![SQLite](https://img.shields.io/badge/Database-SQLite-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)

## Overview

Quick Note is a simple note-taking application that allows users to create, save, and view notes in one place. The application is designed to provide a seamless way to capture ideas, reminders, and important information while keeping them organized and easily accessible.

## Core Features

- Create and save notes instantly
- View all saved notes on the same page
- Store notes securely in a database
- Simple and user-friendly interface
- Real-time note display after submission

### Additional Features Implemented

- Edit existing notes
- Delete notes
- Mark notes as favorites
- Organize notes using folders
- Color-coded notes
- Responsive user interface
- RESTful API integration
- Persistent data storage using SQLite

## Objective

The goal of this project is to demonstrate the basic workflow of a full-stack application, including:

- User input handling
- Request-response communication between frontend and backend
- Data storage and retrieval
- Dynamic content display

## How It Works

1. Users enter a note in the application.
2. The note is sent to the backend server.
3. The backend stores the note in the database.
4. Saved notes are retrieved and displayed on the page.

## Use Cases

- Personal note-taking
- Task reminders
- Idea collection
- Quick information storage

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- CSS

## Backend

- Python
- Flask
- Flask-CORS

## Database

- SQLite

---

# 📁 Project Structure

```text
Quick-Note-Application/
│
├── backend/
│   ├── app.py
│   ├── database.db
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── postcss.config.mjs
│   ├── default_shadcn_theme.css
│   └── ATTRIBUTIONS.md
│
├── guidelines/
│
├── screenshots/
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <repository-url>
cd Quick-Note-Application
```

---

## 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask server:

```bash
python app.py
```

The backend runs at:

```
http://127.0.0.1:5000
```

## Keep the backend running in one terminal while starting the frontend in another terminal.

## 3. Frontend Setup

Open another terminal.

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs at:

```
http://localhost:5173
```

---

# 🗄 Database

The application uses **SQLite** for persistent storage.

Database file:

```
backend/database.db
```

Each note stores:

- Title
- Content
- Color
- Folder
- Favorite status
- Created timestamp

## Future Improvements

- Search notes
- User authentication
- Dark mode
- Archive and restore notes
- Rich text editing
- File attachments
- Cloud database integration

# 🎯 Learning Outcomes

- Built a full-stack single-page application using React, Flask, and SQLite.
- Connected a React frontend with a Python backend using REST APIs.
- Implemented CRUD operations with persistent database storage.
- Understood the complete request-response lifecycle between frontend, backend, and database.
- Implemented note organization using folders, colors, and favorites.
- Managed application state and asynchronous API communication.

# 👩‍💻 Author

**Barsha Priyadarshini Das**
