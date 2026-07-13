// src/pages/analytics/CustomerTrends.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { CategoryPieChart, RevenueLineChart } from '../../components/charts/Charts';
import { getCustomerTrends } from '../../services/analyticsService';
import { UserPlus, Users } from 'lucide-react';

export default function CustomerTrends() {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    getCustomerTrends().then(setTrends);
  }, []);

  if (!trends) return <p className="text-sm text-slate-400">Loading...</p>;

  return (
    <div>
      <PageHeader title="Customer Trends" description="New vs returning customers and growth over time" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <StatCard icon={UserPlus} label="New Customers" value={trends.newCustomers} accent="brand" />
        <StatCard icon={Users} label="Returning Customers" value={trends.returningCustomers} accent="success" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="New vs Returning">
          <CategoryPieChart labels={['New', 'Returning']} data={[trends.newCustomers, trends.returningCustomers]} />
        </Card>
        <Card title="Customer Growth" className="lg:col-span-2">
          <RevenueLineChart labels={trends.growthTrend.map((g) => g.month)} data={trends.growthTrend.map((g) => g.customers)} />
        </Card>
      </div>
    </div>
  );
}
