# Jobify AI 🚀

Jobify AI is an advanced, AI-powered job application tracker built with the MERN stack. Designed for modern job seekers, it offers an intuitive KanBan-style dashboard to track job applications, seamlessly integrating artificial intelligence to provide insights and streamline your career growth.

## ✨ Features

- **AI-Powered Insights**: Get AI-assisted recommendations and insights using the OpenAI integration.
- **Interactive Dashboard**: Track your applications using a dynamic, drag-and-drop KanBan board powered by `@dnd-kit`.
- **Beautiful UI/UX**: Designed with React 19, Tailwind CSS v4, and minimal Framer Motion animations.
- **Dark Mode Compatibility**: Native dark mode styling out of the box.
- **Robust Authentication**: Secure user login and state management utilizing HTTP-only cookies and Zustand.

## 🛠️ Technology Stack

**Frontend:**
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Zustand (State Management)
- Recharts (Data Visualization)
- Lucide React (Icons)
- Framer Motion

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- OpenAI API

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and MongoDB installed on your system. You will also need an OpenAI API key to utilize the AI features.

### 1. Environment Variables

Navigate to the `backend` directory and ensure your `.env` file looks something like this:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=http://localhost:5173
```

### 2. Installation & Running Locally

You'll need to run both the frontend and the backend concurrently.

**Backend Setup:**
```bash
cd backend
npm install
npm run dev
```
*The API will start running on `http://localhost:5000`*

**Frontend Setup:**
```bash
cd jobify-ai
npm install
npm run dev
```
*The React app will launch on `http://localhost:5173` or the next available port.*

## 🤝 Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any new features, bug fixes, or optimizations.
