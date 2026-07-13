// src/pages/analytics/RevenueAnalysis.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { RevenueLineChart } from '../../components/charts/Charts';
import { getRevenue } from '../../services/analyticsService';
import { IndianRupee, TrendingDown, Percent } from 'lucide-react';

export default function RevenueAnalysis() {
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    getRevenue().then(setRevenue);
  }, []);

  if (!revenue) return <p className="text-sm text-slate-400">Loading...</p>;

  return (
    <div>
      <PageHeader title="Revenue Analysis" description="Revenue, cost, and profit margin overview" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <StatCard icon={IndianRupee} label="Total Revenue" value={`₹${revenue.totalRevenue.toLocaleString()}`} accent="success" />
        <StatCard icon={TrendingDown} label="Total Cost" value={`₹${revenue.totalCost.toLocaleString()}`} accent="warning" />
        <StatCard icon={Percent} label="Profit Margin" value={`${revenue.profitMargin}%`} accent="brand" />
      </div>

      <Card title="Revenue Trend">
        <RevenueLineChart labels={revenue.trend.map((r) => r.date)} data={revenue.trend.map((r) => r.revenue)} height={300} />
      </Card>
    </div>
  );
}
