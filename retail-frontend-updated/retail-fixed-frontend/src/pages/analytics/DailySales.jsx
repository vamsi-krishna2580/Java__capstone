// src/pages/analytics/DailySales.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { TopProductsBarChart } from '../../components/charts/Charts';
import { getDailySales } from '../../services/analyticsService';
import { ShoppingCart, Receipt } from 'lucide-react';

export default function DailySales() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    getDailySales().then(setReport);
  }, []);

  if (!report) return <p className="text-sm text-slate-400">Loading...</p>;

  return (
    <div>
      <PageHeader title="Daily Sales Report" description={`Sales summary for ${report.date}`} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <StatCard icon={ShoppingCart} label="Total Sales Today" value={`₹${report.totalSales.toLocaleString()}`} accent="success" />
        <StatCard icon={Receipt} label="Transactions" value={report.transactionCount} accent="brand" />
      </div>

      <Card title="Hourly Sales Breakdown">
        <TopProductsBarChart
          labels={report.hourlyBreakdown.map((h) => h.hour)}
          data={report.hourlyBreakdown.map((h) => h.sales)}
          height={300}
        />
      </Card>
    </div>
  );
}
