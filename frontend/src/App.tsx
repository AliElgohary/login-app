import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingSpinner } from './components/common/LoadingSpinner';



const SignUp = React.lazy(() => import('./components/SignUp'));
const SignIn = React.lazy(() => import('./components/SignIn'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />;
};


const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signup" element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      } />
      <Route path="/signin" element={
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="App">
            <Suspense fallback={<LoadingSpinner />}>
              <AppRoutes />
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
