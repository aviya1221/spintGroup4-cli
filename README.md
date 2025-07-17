# 4Community – Smart Community Management Platform

**4Community** is a social-tech solution designed to help community managers organize, onboard, and empower their communities — using automation, AI, and intuitive tools.

---

## 📝 Overview

This project was created as part of a social initiative aimed at helping community leaders manage their members efficiently. The system allows managers to:

- Onboard new members via:
  - Manual form entry
  - Uploading a resume (PDF/DOCX)
  - Submitting a LinkedIn profile URL

- Use AI to automatically extract and format user data into structured profiles
- Manage community data (events, categories, notes, etc.)
- Assign users to relevant groups, categories, and activities
- Track experience, skills, and community involvement

Private users can easily register and join communities using smart entry methods powered by AI.

---

## ✨ Key Features

### 👤 Smart Member Registration
Users can register through three intuitive options:
- **LinkedIn URL** — sent to the server and parsed using AI
- **CV Upload** — PDF or DOCX parsed using OpenAI and converted into a structured profile
- **Manual Form** — users fill out personal and professional details directly

### 🧠 AI Integration
- OpenAI GPT-3.5-turbo is used to process and understand resumes and LinkedIn profiles
- Returned data is in strict JSON format, mapping all essential fields such as name, phone, email, city, company, role, skills, etc.

### 🛠 Admin Dashboard
- Manage and view community members in an elegant DataGrid
- Filter, search, and view detailed profiles
- Import bulk members using Excel
- Assign categories to users
- Track and associate events and contributions
- Add admin notes and update preferences

### 📁 Excel Import
- Admins can upload Excel files with base64 encoding
- The system parses and stores multiple members from a template

---

## 🛠 Technologies Used

### Frontend
- React (with Vite)
- React Router
- Bootstrap 5
- Zustand (state management)
- MUI DataGrid

### Backend
- Node.js with Express
- Sequelize ORM
- MySQL Database
- Swagger (API documentation)

### AI & File Parsing
- OpenAI GPT-3.5-turbo
- `pdfjs-dist` for PDF parsing
- `mammoth` for DOCX parsing

---

## 📦 Project Structure

```
.
├── src/
│   ├── adminComp/         # Admin screens (tables, profile viewer, import)
│   ├── userComp/          # User onboarding and form steps
│   ├── assets/            # Zustand state stores and dummy data
│   └── App.jsx, Layout.jsx
├── Model/                 # Sequelize models (Group, Member, Event, etc.)
├── Routes/Controllers/    # Backend logic and API routes
└── server.js              # Express server entry
```

---

## 🧪 Getting Started

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set your `.env` for OpenAI:
```
VITE_API_KEY=your_openai_key
```

---

## 📈 Database Overview

The system uses Sequelize with MySQL and includes:

- `CommunityMember` — the main member model
- `Group`, `GroupMembers` — for managing group memberships
- `Event`, `MemberEvent` — for linking members to events
- `HistoryJob` — member job history records

Relationships are handled via `belongsToMany` and `hasMany` associations.

---

## 💡 Vision

This platform aims to reduce friction in managing communities and empower leaders with tools that save time, improve engagement, and harness AI to its fullest.

From event tracking to onboarding automation — 4Community bridges the gap between people and purpose.

---

## 👤 Authors

This project was developed by a team of frontend and backend developers as part of a social impact initiative.

---

## 📃 License

MIT License.