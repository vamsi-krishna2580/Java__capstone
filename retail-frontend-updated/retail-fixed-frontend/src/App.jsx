// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Core
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

// Customers
import CustomerList from './pages/customers/CustomerList';
import AddCustomer from './pages/customers/AddCustomer';
import EditCustomer from './pages/customers/EditCustomer';
import ViewCustomer from './pages/customers/ViewCustomer';

// Products
import ProductList from './pages/products/ProductList';
import AddProduct from './pages/products/AddProduct';
import UpdateProduct from './pages/products/UpdateProduct';
import ProductDetails from './pages/products/ProductDetails';

// Inventory
import InventoryDashboard from './pages/inventory/InventoryDashboard';
import StockMonitoring from './pages/inventory/StockMonitoring';
import LowStockProducts from './pages/inventory/LowStockProducts';
import InventoryHistory from './pages/inventory/InventoryHistory';

// Billing
import NewBill from './pages/billing/NewBill';
import InvoicePreview from './pages/billing/InvoicePreview';
import TransactionHistory from './pages/billing/TransactionHistory';

// Analytics
import DailySales from './pages/analytics/DailySales';
import MonthlySales from './pages/analytics/MonthlySales';
import RevenueAnalysis from './pages/analytics/RevenueAnalysis';
import TopProducts from './pages/analytics/TopProducts';
import CustomerTrends from './pages/analytics/CustomerTrends';

// Predictions
import PredictionDashboard from './pages/predictions/PredictionDashboard';
import ReorderRecommendations from './pages/predictions/ReorderRecommendations';
import DemandForecast from './pages/predictions/DemandForecast';

const ALL_ROLES = ['ADMIN', 'MANAGER', 'CASHIER'];
const ADMIN_MANAGER = ['ADMIN', 'MANAGER'];

export default function App() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected app routes */}
      <Route element={<ProtectedRoute roles={ALL_ROLES} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Customers - all roles */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/customers/:id" element={<ViewCustomer />} />
          <Route path="/customers/:id/edit" element={<EditCustomer />} />

          {/* Billing - all roles */}
          <Route path="/billing" element={<TransactionHistory />} />
          <Route path="/billing/new" element={<NewBill />} />
          <Route path="/billing/:id" element={<InvoicePreview />} />
        </Route>
      </Route>

      {/* Admin + Manager only routes */}
      <Route element={<ProtectedRoute roles={ADMIN_MANAGER} />}>
        <Route element={<DashboardLayout />}>
          {/* Products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<UpdateProduct />} />

          {/* Inventory */}
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/inventory/stock" element={<StockMonitoring />} />
          <Route path="/inventory/low-stock" element={<LowStockProducts />} />
          <Route path="/inventory/history" element={<InventoryHistory />} />

          {/* Analytics */}
          <Route path="/analytics" element={<DailySales />} />
          <Route path="/analytics/daily" element={<DailySales />} />
          <Route path="/analytics/monthly" element={<MonthlySales />} />
          <Route path="/analytics/revenue" element={<RevenueAnalysis />} />
          <Route path="/analytics/top-products" element={<TopProducts />} />
          <Route path="/analytics/customer-trends" element={<CustomerTrends />} />

          {/* Predictions */}
          <Route path="/predictions" element={<PredictionDashboard />} />
          <Route path="/predictions/reorder" element={<ReorderRecommendations />} />
          <Route path="/predictions/forecast" element={<DemandForecast />} />
        </Route>
      </Route>

      {/* Defaults */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
