// src/pages/analytics/MonthlySales.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { RevenueLineChart } from '../../components/charts/Charts';
import { getMonthlySales } from '../../services/analyticsService';
import { TrendingUp, Calendar } from 'lucide-react';

export default function MonthlySales() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    getMonthlySales().then(setReport);
  }, []);

  if (!report) return <p className="text-sm text-slate-400">Loading...</p>;

  const previousMonth = report.dailyBreakdown[report.dailyBreakdown.length - 2];
  const growth = previousMonth ? (((report.totalSales - previousMonth.sales) / previousMonth.sales) * 100).toFixed(1) : 0;

  return (
    <div>
      <PageHeader title="Monthly Sales Report" description={`Sales trend for ${report.month}`} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <StatCard icon={Calendar} label={`Sales (${report.month})`} value={`₹${report.totalSales.toLocaleString()}`} accent="success" />
        <StatCard
          icon={TrendingUp}
          label="Growth vs Previous Month"
          value={`${growth > 0 ? '+' : ''}${growth}%`}
          accent={growth >= 0 ? 'success' : 'danger'}
        />
      </div>

      <Card title="Monthly Sales Trend">
        <RevenueLineChart
          labels={report.dailyBreakdown.map((m) => m.month)}
          data={report.dailyBreakdown.map((m) => m.sales)}
          height={300}
        />
      </Card>
    </div>
  );
}
