import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Login failed');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)' }}>
        <h2 style={{ marginTop: 0 }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" style={{ padding: '12px 16px', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', border: 'none', borderRadius: 12 }}>
            Login
          </button>
        </form>
        <p style={{ marginBottom: 0 }}>
          Need an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
