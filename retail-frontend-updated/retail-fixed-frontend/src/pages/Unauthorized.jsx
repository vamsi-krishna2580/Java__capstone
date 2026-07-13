// src/pages/Unauthorized.jsx
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Button from '../components/common/Button';

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-danger">
        <ShieldAlert size={28} />
      </div>
      <h1 className="text-xl font-bold text-slate-800">Access Denied</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        You don&apos;t have permission to view this page. Contact your administrator if you believe this is a mistake.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
}
