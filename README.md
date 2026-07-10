# Shiva Luxury Events — Full-Stack Refactored Project

This repository contains the refactored full-stack application for **Shiva Group Events**, organized into a clean, modern, and production-ready `/client` and `/server` separation.

---

## Project Structure

```
shiva-luxury-events/
├── client/                  # Frontend: React, Vite, Tailwind CSS, TypeScript
│   ├── src/                 # React components, pages, layouts, and hooks
│   │   ├── lib/api/         # API hooks and types (fully typed React Query client)
│   │   └── index.css        # Core styling and Tailwind setup
│   └── package.json         # Frontend dependencies and build configurations
│
├── server/                  # Backend: Node.js, Express, TypeScript, Drizzle ORM
│   ├── src/                 # MVC structure
│   │   ├── config/          # DB connection configurations
│   │   ├── controllers/     # Route handlers/controllers
│   │   ├── models/          # Drizzle schema database models
│   │   ├── routes/          # Express route setups
│   │   ├── services/        # Third-party integrations (Nodemailer, OpenAI chatbot)
│   │   └── validations/     # Zod request-body validation schemas
│   ├── drizzle.config.ts    # Drizzle migrations configuration
│   └── package.json         # Backend dependencies and scripts
│
└── README.md                # This setup and guidance file
```

---

## Setup & Local Development

To run this application locally, you will need **Node.js (v18+)** and a **PostgreSQL database**.

### 1. Database Setup
Ensure you have a PostgreSQL database running and retrieve its connection string (e.g. `postgresql://user:password@localhost:5432/shiva_events`).

### 2. Backend Config & Run
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
3. Fill in the environment variables in `.env` (refer to the **Environment Variables** section below).
4. Install backend dependencies:
   ```bash
   npm install
   ```
5. Apply database schemas / migrations:
   ```bash
   npm run db:push
   ```
6. Start the backend server in development mode:
   ```bash
   npm run dev
   ```
   The backend will start on `http://localhost:3001` (by default).

### 3. Frontend Config & Run
1. Navigate to the client folder (from the project root):
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend dev server will launch at `http://localhost:5173`. Any requests matching `/api/*` will automatically proxy to `http://localhost:3001`.

---

## Environment Variables

### Backend (`server/.env`)

Configure the following variables in `server/.env`:

* **`DATABASE_URL`**: PostgreSQL connection string. (Required)
* **`SESSION_SECRET`**: Random secure string used to sign Express session cookies. (Required)
* **`ADMIN_PASSWORD`**: Password used to log in to the Admin Dashboard (default is `shivaevents2024` if unset).
* **`OPENAI_API_KEY`**: Key used for the AI chat assistant. (Optional — if unset, fallback mock response will be used).
* **`SMTP_USER` / `SMTP_PASS`**: Credentials for sending email notifications on new leads. (Optional)
* **`NOTIFY_EMAIL`**: Recipient email for lead notifications. (Optional)

---

## Build & Production

To compile both halves for production deployment:

### Backend Build
```bash
cd server
npm run build
```
This generates optimized standalone files inside `server/dist/`. To run the built server:
```bash
npm start
```

### Frontend Build
```bash
cd client
npm run build
```
This compiles and minifies the React files into `client/dist/`, ready to be served statically.
