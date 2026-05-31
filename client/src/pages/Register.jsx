import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', role: 'buyer' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError('Please fill in all fields.'); return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.'); return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }

    try {
      setLoading(true);
      await registerUser({ username: form.username, email: form.email, password: form.password, role: form.role });
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">🛍️ <span>ShopEZ</span></div>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">Join thousands of happy shoppers</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="role-selector">
            <label className="role-label">I want to</label>
            <div className="role-options">
              <button
                type="button"
                className={`role-card ${form.role === 'buyer' ? 'role-card--active' : ''}`}
                onClick={() => setForm({ ...form, role: 'buyer' })}
              >
                <span className="role-icon">🛒</span>
                <span className="role-name">Shop / Buy</span>
                <span className="role-desc">Browse and purchase products</span>
              </button>
              <button
                type="button"
                className={`role-card ${form.role === 'admin' ? 'role-card--active' : ''}`}
                onClick={() => {
                  setForm({ ...form, role: 'admin' });
                }}
              >
                <span className="role-icon">🏪</span>
                <span className="role-name">Sell / Admin</span>
                <span className="role-desc">List products and manage orders</span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              className="input-field"
              name="username"
              placeholder="Your name"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              className="input-field"
              type="password"
              name="confirm"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error-msg">⚠️ {error}</p>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : '🚀 Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}