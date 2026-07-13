// src/components/layout/Sidebar.jsx
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, Boxes, Receipt, BarChart3, TrendingUp, Store,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  { to: '/customers', label: 'Customers', icon: Users, roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  { to: '/products', label: 'Products', icon: Package, roles: ['ADMIN', 'MANAGER'] },
  {
    to: '/inventory',
    label: 'Inventory',
    icon: Boxes,
    roles: ['ADMIN', 'MANAGER'],
    children: [
      { to: '/inventory', label: 'Dashboard' },
      { to: '/inventory/stock', label: 'Stock Monitoring' },
      { to: '/inventory/low-stock', label: 'Low Stock' },
      { to: '/inventory/history', label: 'History' },
    ],
  },
  { to: '/billing', label: 'Billing', icon: Receipt, roles: ['ADMIN', 'MANAGER', 'CASHIER'] },
  {
    to: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    roles: ['ADMIN', 'MANAGER'],
    children: [
      { to: '/analytics/daily', label: 'Daily Sales' },
      { to: '/analytics/monthly', label: 'Monthly Sales' },
      { to: '/analytics/revenue', label: 'Revenue Analysis' },
      { to: '/analytics/top-products', label: 'Top Products' },
      { to: '/analytics/customer-trends', label: 'Customer Trends' },
    ],
  },
  {
    to: '/predictions',
    label: 'Predictions',
    icon: TrendingUp,
    roles: ['ADMIN', 'MANAGER'],
    children: [
      { to: '/predictions', label: 'Dashboard' },
      { to: '/predictions/reorder', label: 'Reorder Recommendations' },
      { to: '/predictions/forecast', label: 'Demand Forecast' },
    ],
  },
];

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col border-r border-slate-100 bg-white">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
          <Store size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 leading-tight">Smart Retail</p>
          <p className="text-xs text-slate-400 leading-tight">Management System</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        {navItems
          .filter((item) => item.roles.includes(user?.role))
          .map(({ to, label, icon: Icon, children }) => {
            const isActiveGroup = location.pathname.startsWith(to);
            return (
              <div key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive || (children && isActiveGroup) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
                {children && isActiveGroup && (
                  <div className="ml-9 mt-1 space-y-1 border-l border-slate-100 pl-3">
                    {children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        end
                        className={({ isActive }) =>
                          `block rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                            isActive ? 'text-brand-700' : 'text-slate-400 hover:text-slate-600'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </nav>
      <div className="px-6 py-4 text-xs text-slate-400 border-t border-slate-100">
        v1.0.0 &middot; © 2026 Smart Retail
      </div>
    </aside>
  );
}
