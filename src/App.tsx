import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const HomePage  = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#0B0C0F]" />}>
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/admin/login"  element={<LoginPage />} />
          <Route path="/admin"        element={<AdminPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
