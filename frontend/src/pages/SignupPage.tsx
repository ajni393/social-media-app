import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    displayName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Signup failed');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)' }}>
        <h2 style={{ marginTop: 0 }}>Create Account</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <input
            value={form.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="Username"
          />
          <input
            value={form.displayName}
            onChange={(e) => handleChange('displayName', e.target.value)}
            placeholder="Display name"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Password"
          />
          <button type="submit" style={{ padding: '12px 16px', background: 'linear-gradient(135deg, #ec4899, #0066ff)', color: '#fff', border: 'none', borderRadius: 12 }}>
            Sign Up
          </button>
        </form>
        <p style={{ marginBottom: 0 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
