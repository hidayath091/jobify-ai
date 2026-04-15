import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import AIResume from './pages/AIResume';
import AIMatch from './pages/AIMatch';

// Placeholders for minor pages
const Settings = () => <div className="p-6 card"><h1 className="text-2xl font-bold mb-4">Settings</h1><p className="text-slate-500">Account settings and preferences.</p></div>;

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Layout><Navigate to="/" replace /></Layout>} /> {/* Temporary redirect */}
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/board" element={<Layout><Board /></Layout>} />
          <Route path="/ai-feedback" element={<Layout><AIResume /></Layout>} />
          <Route path="/ai-match" element={<Layout><AIMatch /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
