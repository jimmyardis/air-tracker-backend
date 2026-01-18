# MedConcierge

AI Chatbot for Elective Healthcare Practices.

## Project Structure
- **/frontend**: React + Vite application.
- **/backend**: Node.js + Express API.

## getting Started

### Prerequisites
- Node.js installed.
- PostgreSQL (optional for Phase 1, required later).

### Setup

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

2. **Environment Variables**:
   Create `backend/.env`:
   ```env
   PORT=3000
   OPENAI_API_KEY=your_key_here
   DB_PASSWORD=your_db_password
   ```

### Running the App

1. **Start Backend**:
   ```bash
   cd backend
   npm start
   # or for dev:
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Open http://localhost:5173

## Phase 1 MVP
- Chat functionality is live.
- If no OpenAI key is provided, the bot will respond with mock data for testing.
