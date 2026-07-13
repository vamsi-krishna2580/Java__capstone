// src/pages/predictions/ReorderRecommendations.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import { getReorderRecommendations } from '../../services/predictionService';
import { useNotification } from '../../context/NotificationContext';

export default function ReorderRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const { pushToast } = useNotification();

  useEffect(() => {
    getReorderRecommendations().then((res) => setRecommendations(res.data));
  }, []);

  const columns = [
    { key: 'productName', header: 'Product Name' },
    { key: 'currentStock', header: 'Current Stock' },
    { key: 'recommendedStock', header: 'Recommended Stock' },
    { key: 'reorderQuantity', header: 'Reorder Quantity' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <Button size="sm" onClick={() => pushToast(`Purchase order created for ${row.productName}`)}>
          Create Purchase Order
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Reorder Recommendations" description="Products recommended for restocking based on demand forecasts" />
      <Card>
        {recommendations.length === 0 ? (
          <p className="text-sm text-slate-400">No reorder recommendations at this time.</p>
        ) : (
          <DataTable columns={columns} data={recommendations} pageSize={8} />
        )}
      </Card>
    </div>
  );
}
