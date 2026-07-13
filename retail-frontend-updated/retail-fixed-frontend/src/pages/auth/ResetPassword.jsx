// src/pages/auth/ResetPassword.jsx
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Store } from 'lucide-react';
import { resetPasswordRequest } from '../../services/authService';
import { TextField } from '../../components/common/FormField';
import Button from '../../components/common/Button';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'demo-token';
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await resetPasswordRequest(token, form.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message || 'Reset failed');
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
          <h1 className="text-xl font-bold text-slate-800">Reset password</h1>
          <p className="mt-1 text-sm text-slate-500">Enter your new password below</p>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{error}</div>}
        {success ? (
          <div className="rounded-lg bg-green-50 px-3 py-3 text-sm text-success">
            Password updated successfully! Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="New Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Reset Password'}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
