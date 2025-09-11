import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { PoliceDashboard } from './pages/PoliceDashboard';
import { TourismDashboard } from './pages/TourismDashboard';
import { EvidenceViewer } from './pages/EvidenceViewer';

interface User {
  id: string;
  name: string;
  role: 'police' | 'tourism' | 'admin';
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
}

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route 
            path="/police-dashboard" 
            element={
              <ProtectedRoute role="police">
                <PoliceDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tourism-dashboard" 
            element={
              <ProtectedRoute role="tourism">
                <TourismDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/evidence-viewer" 
            element={
              <ProtectedRoute role="police">
                <EvidenceViewer />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}