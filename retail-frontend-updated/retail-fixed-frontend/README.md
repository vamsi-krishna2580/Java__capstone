# Smart Retail Management System — Frontend

React + Vite + Tailwind CSS frontend for the Smart Retail Management System, built per the SRS / System Design Document.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router v6 (route protection via `ProtectedRoute`)
- Axios (with JWT access/refresh token interceptors)
- Context API (`AuthContext`, `NotificationContext`)
- Chart.js (via `react-chartjs-2`)
- lucide-react icons

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. API calls under `/api/v1/*` are proxied to `http://localhost:8080` (see `vite.config.js`) for when the Java backend is running.

## Demo Login (Mock Mode)

The app ships with a **mock service layer** (`src/services/*.js` backed by `src/data/mockData.js`) so it runs fully standalone without a backend. Use these accounts on the Login page:

| Role    | Email              | Password    |
|---------|--------------------|-------------|
| Admin   | admin@retail.com   | admin123    |
| Manager | manager@retail.com | manager123  |
| Cashier | cashier@retail.com | cashier123  |

## Connecting to the Real Java Backend

Each file in `src/services/` mirrors the REST API contract defined in the SRS (`/auth/*`, `/customers`, `/products`, `/inventory/*`, `/billing/*`, `/analytics/*`, `/prediction/*`). To switch from mock data to the live backend:

1. Replace the body of each exported function in `src/services/*.js` with a call through `src/api/axiosInstance.js`, e.g.:
   ```js
   import api from '../api/axiosInstance';
   export const getCustomers = (params) => api.get('/customers', { params }).then(r => r.data);
   ```
2. Keep the same function names and return shapes — pages consume the service layer only, so no page-level changes are needed.
3. Ensure the backend issues JWTs matching the shape documented in the SRS (`accessToken`, `refreshToken`, `expiresIn`, `user: { userId, name, email, role }`).

## Folder Structure

```
src/
├── api/            # Axios instance + interceptors (JWT refresh)
├── components/
│   ├── common/      # Button, Card, DataTable, Modal, FormField, Badge, StatCard, PageHeader
│   ├── layout/       # Sidebar, MobileSidebar, Header, DashboardLayout
│   ├── charts/       # Chart.js wrappers (Line, Pie, Bar)
│   ├── customers/    # CustomerForm
│   └── products/     # ProductForm
├── context/         # AuthContext, NotificationContext
├── data/            # mockData.js (seed data for mock services)
├── pages/
│   ├── auth/          # Login, Register, ForgotPassword, ResetPassword
│   ├── customers/      # List, Add, Edit, View (with purchase history)
│   ├── products/       # List, Add, Update, Details
│   ├── inventory/       # Dashboard, Stock Monitoring, Low Stock, History
│   ├── billing/         # New Bill (POS), Invoice Preview, Transaction History
│   ├── analytics/        # Daily/Monthly Sales, Revenue, Top Products, Customer Trends
│   ├── predictions/      # Prediction Dashboard, Reorder Recommendations, Demand Forecast
│   ├── Dashboard.jsx
│   ├── Unauthorized.jsx
│   └── NotFound.jsx
├── routes/          # ProtectedRoute (JWT + RBAC)
├── services/        # API service layer (one file per module)
├── App.jsx
└── main.jsx
```

## Role-Based Access Control

| Module                | Admin | Manager | Cashier |
|-----------------------|:-----:|:-------:|:-------:|
| Dashboard             | ✅    | ✅      | ✅      |
| Customers             | ✅    | ✅      | ✅      |
| Billing               | ✅    | ✅      | ✅      |
| Products              | ✅    | ✅      | ❌      |
| Inventory             | ✅    | ✅      | ❌      |
| Analytics             | ✅    | ✅      | ❌      |
| Predictions           | ✅    | ✅      | ❌      |

Routes are wrapped in `<ProtectedRoute roles={[...]}>` (see `src/App.jsx`); unauthorized access redirects to `/unauthorized`.
