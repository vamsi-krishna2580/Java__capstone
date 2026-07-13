// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { inventory } from '../data/mockData';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const lowStock = inventory.filter((i) => i.availableStock <= i.threshold);

  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ lowStock, pushToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg ${
              t.type === 'error' ? 'bg-danger' : 'bg-success'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}
