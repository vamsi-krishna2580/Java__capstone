// src/pages/Dashboard.jsx
import { Users, Package, AlertTriangle, ShoppingCart, TrendingUp, BarChart3 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import Card from '../components/common/Card';
import { RevenueLineChart, CategoryPieChart, TopProductsBarChart } from '../components/charts/Charts';
import { dashboardStats, revenueTrend, salesByCategory, topProducts, bills } from '../data/mockData';
import Badge from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title={`Welcome back, ${user?.name?.split(' ')[0] || ''}`} description="Here's what's happening in your store today." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={Users} label="Total Customers" value={dashboardStats.totalCustomers} accent="brand" />
        <StatCard icon={Package} label="Total Products" value={dashboardStats.totalProducts} accent="brand" />
        <StatCard icon={AlertTriangle} label="Low Stock Products" value={dashboardStats.lowStockProducts} accent="danger" hint="Needs reorder" />
        <StatCard icon={ShoppingCart} label="Today's Sales" value={`₹${dashboardStats.todaysSales.toLocaleString()}`} accent="success" />
        <StatCard icon={TrendingUp} label="Monthly Revenue" value={`₹${dashboardStats.monthlyRevenue.toLocaleString()}`} accent="success" />
        <StatCard icon={BarChart3} label="Predicted Demand Alerts" value={dashboardStats.predictedDemandAlerts} accent="warning" hint="Products to reorder soon" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Revenue Trend (Last 7 Days)" className="lg:col-span-2">
          <RevenueLineChart labels={revenueTrend.map((r) => r.date)} data={revenueTrend.map((r) => r.revenue)} />
        </Card>
        <Card title="Sales by Category">
          <CategoryPieChart labels={salesByCategory.map((s) => s.category)} data={salesByCategory.map((s) => s.value)} />
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Top Selling Products" className="lg:col-span-2">
          <TopProductsBarChart labels={topProducts.map((p) => p.productName)} data={topProducts.map((p) => p.unitsSold)} />
        </Card>
        <Card title="Recent Transactions">
          <ul className="space-y-3">
            {bills.slice(0, 4).map((b) => (
              <li key={b.billId} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-slate-700">#{b.billId} &middot; {b.customerName}</p>
                  <p className="text-xs text-slate-400">{new Date(b.billDate).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-700">₹{b.totalAmount.toFixed(2)}</p>
                  <Badge variant={b.paymentStatus === 'PAID' ? 'success' : 'warning'}>{b.paymentStatus}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
