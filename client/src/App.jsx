import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobsList from './pages/JobsList';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/dashboard" className="font-bold text-blue-600">Dashboard</Link>
        <Link to="/jobs" className="text-gray-700">My Applications</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobsList /></ProtectedRoute>} />
        <Route path="/jobs/add" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
        <Route path="/jobs/edit/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;