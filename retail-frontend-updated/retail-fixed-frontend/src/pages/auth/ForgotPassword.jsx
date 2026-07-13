// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';
import { forgotPasswordRequest } from '../../services/authService';
import { TextField } from '../../components/common/FormField';
import Button from '../../components/common/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPasswordRequest(email);
      setMessage(res.message);
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
          <h1 className="text-xl font-bold text-slate-800">Forgot password</h1>
          <p className="mt-1 text-sm text-slate-500">Enter your registered email to receive a reset link</p>
        </div>

        {message ? (
          <div className="rounded-lg bg-green-50 px-3 py-3 text-sm text-success">{message}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
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
