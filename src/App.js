import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load remote components
const LoginPage = lazy(() => import('loginApp/login')); // Adjust to match exposed name
const DashboardPage = lazy(() => import('dashboardApp/dashboard')); // Adjust to match exposed name

function App() {
  return (
    <Router>
      <div>
        <h1>Shell Micro Frontend Application</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
