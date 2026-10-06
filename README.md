# Knot Social Media App

A full-stack social media application built with React, Kotlin, and Spring Boot.

## Live Preview

View the app live at:
**https://ajni393.github.io/social-media-app/**

## Features

✅ Stories carousel  
✅ Social feed with posts  
✅ Chat & messaging  
✅ Audio/video calls  
✅ Reels page  
✅ User profiles  
✅ AI assistant  
✅ Login & signup  
✅ Dark/light theme  
✅ Mobile responsive  

## Local Setup

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

### Backend (Kotlin + Spring Boot)

```bash
cd backend
./gradlew bootRun
```

API runs on: `http://localhost:8080`

### Database (PostgreSQL)

```bash
docker-compose up -d
```

Database: `knot_db` (postgres/password)

## Project Structure

```
├── frontend/           # React + Vite app
├── backend/            # Kotlin + Spring Boot API
├── index.html          # Live preview page
├── docker-compose.yml  # PostgreSQL container
└── README.md
```

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript
- **Backend:** Kotlin, Spring Boot 3, Spring Security
- **Database:** PostgreSQL
- **Auth:** JWT tokens
- **Deployment:** GitHub Pages

## API Endpoints

- `POST /api/auth/signup` — Create account
- `POST /api/auth/login` — Login
- `GET /api/posts` — Get feed
- `POST /api/posts` — Create post
- `GET /api/auth/me` — Get current user

---

**Made with ❤️ by Knot Team**
