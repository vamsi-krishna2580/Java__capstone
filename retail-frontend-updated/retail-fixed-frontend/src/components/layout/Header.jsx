// src/components/layout/Header.jsx
import { useState } from 'react';
import { Bell, Search, ChevronDown, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const { user, logout } = useAuth();
  const { lowStock } = useNotification();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6 py-3">
      <button onClick={() => setShowMobileNav(true)} className="mr-2 rounded-lg p-2 text-slate-500 hover:bg-slate-50 lg:hidden">
        <Menu size={20} />
      </button>
      <MobileSidebar isOpen={showMobileNav} onClose={() => setShowMobileNav(false)} />

      <div className="relative w-full max-w-md hidden sm:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search customers, products, bills..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowNotif((s) => !s)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50"
          >
            <Bell size={20} />
            {lowStock.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] text-white">
                {lowStock.length}
              </span>
            )}
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-100 bg-white p-3 shadow-card z-20">
              <p className="mb-2 text-sm font-semibold text-slate-700">Low Stock Alerts</p>
              {lowStock.length === 0 ? (
                <p className="text-sm text-slate-400">No alerts right now.</p>
              ) : (
                <ul className="space-y-2">
                  {lowStock.map((i) => (
                    <li key={i.inventoryId} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{i.productName}</span>
                      <span className="font-semibold text-danger">{i.availableStock} left</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setShowProfile((s) => !s)} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-700 leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-400 leading-tight">{user?.role}</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-card z-20">
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <User size={16} /> My Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-red-50"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
