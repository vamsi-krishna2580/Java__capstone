// src/pages/predictions/PredictionDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, PackageSearch, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { getDemandPredictions } from '../../services/predictionService';

export default function PredictionDashboard() {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    getDemandPredictions().then((res) => setPredictions(res.data));
  }, []);

  const needsReorder = predictions.filter((p) => p.reorderQuantity > 0);
  const totalPredictedDemand = predictions.reduce((sum, p) => sum + p.predictedDemand, 0);

  const columns = [
    { key: 'productName', header: 'Product' },
    { key: 'currentStock', header: 'Current Stock' },
    { key: 'avgMonthlySales', header: 'Avg Monthly Sales' },
    { key: 'predictedDemand', header: 'Predicted Demand' },
    { key: 'recommendedStock', header: 'Recommended Stock' },
    {
      key: 'status',
      header: 'Status',
      render: (row) =>
        row.reorderQuantity > 0 ? <Badge variant="warning">Reorder Needed</Badge> : <Badge variant="success">Sufficient</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader title="Prediction Dashboard" description="AI-driven inventory demand forecasts" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <StatCard icon={AlertCircle} label="Products Needing Reorder" value={needsReorder.length} accent="warning" />
        <StatCard icon={TrendingUp} label="Total Predicted Demand (units)" value={totalPredictedDemand} accent="brand" />
        <StatCard icon={PackageSearch} label="Products Tracked" value={predictions.length} accent="success" />
      </div>

      <Card
        title="Demand Forecast Summary"
        actions={
          <button onClick={() => navigate('/predictions/reorder')} className="text-sm font-medium text-brand-600 hover:underline">
            View Reorder Recommendations →
          </button>
        }
      >
        <DataTable columns={columns} data={predictions} pageSize={8} />
      </Card>
    </div>
  );
}
