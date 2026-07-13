// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <p className="text-5xl font-bold text-brand-600">404</p>
      <h1 className="mt-2 text-xl font-bold text-slate-800">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/dashboard" className="mt-6">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
}
