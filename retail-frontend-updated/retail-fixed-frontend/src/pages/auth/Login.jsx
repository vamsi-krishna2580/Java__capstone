// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { TextField } from '../../components/common/FormField';
import Button from '../../components/common/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card border border-slate-100">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Store size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Sign in to Retail Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Smart Retail Management System</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" checked={remember} onChange={() => setRemember((r) => !r)} />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-medium text-brand-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:underline">
            Register
          </Link>
        </p>

        <div className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          <p className="font-medium text-slate-600 mb-1">Demo accounts</p>
          <p>admin@retail.com / admin123 (Admin)</p>
          <p>manager@retail.com / manager123 (Manager)</p>
          <p>cashier@retail.com / cashier123 (Cashier)</p>
        </div>
      </div>
    </div>
  );
}
