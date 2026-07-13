// src/components/layout/MobileSidebar.jsx
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Users, Package, Boxes, Receipt, BarChart3, TrendingUp, Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  { to: '/customers', label: 'Customers', icon: Users, roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  { to: '/products', label: 'Products', icon: Package, roles: ['ADMIN', 'MANAGER'] },
  { to: '/inventory', label: 'Inventory', icon: Boxes, roles: ['ADMIN', 'MANAGER'] },
  { to: '/billing', label: 'Billing', icon: Receipt, roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['ADMIN', 'MANAGER'] },
  { to: '/predictions', label: 'Predictions', icon: TrendingUp, roles: ['ADMIN', 'MANAGER'] },
];

export default function MobileSidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Store size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">Smart Retail</p>
              <p className="text-xs text-slate-400 leading-tight">Management System</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-3 overflow-y-auto">
          {navItems
            .filter((item) => item.roles.includes(user?.role))
            .map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
        </nav>
      </div>
    </div>
  );
}
