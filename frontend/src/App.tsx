import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={token ? <FeedPage /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
