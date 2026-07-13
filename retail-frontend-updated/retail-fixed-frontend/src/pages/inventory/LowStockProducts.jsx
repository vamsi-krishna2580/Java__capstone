// src/pages/inventory/LowStockProducts.jsx
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { getLowStock } from '../../services/inventoryService';
import { useNotification } from '../../context/NotificationContext';

export default function LowStockProducts() {
  const [lowStock, setLowStock] = useState([]);
  const { pushToast } = useNotification();

  useEffect(() => {
    getLowStock().then((res) => setLowStock(res.data));
  }, []);

  const columns = [
    { key: 'productId', header: 'Product ID' },
    { key: 'productName', header: 'Product Name' },
    { key: 'availableStock', header: 'Available Stock' },
    { key: 'threshold', header: 'Threshold' },
    {
      key: 'urgency',
      header: 'Urgency',
      render: (row) =>
        row.availableStock === 0 ? (
          <Badge variant="danger">Critical</Badge>
        ) : row.availableStock <= row.threshold / 2 ? (
          <Badge variant="danger">High</Badge>
        ) : (
          <Badge variant="warning">Moderate</Badge>
        ),
    },
    { key: 'reorderQuantity', header: 'Reorder Qty' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <Button size="sm" onClick={() => pushToast(`Reorder request sent for ${row.productName}`)}>
          Reorder Now
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Low Stock Products"
        description="Products at or below their reorder threshold, sorted by urgency"
      />
      {lowStock.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">No low-stock products right now. Great job!</p>
        </Card>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-warning">
            <AlertTriangle size={16} />
            {lowStock.length} product(s) need attention.
          </div>
          <Card>
            <DataTable columns={columns} data={lowStock} pageSize={8} />
          </Card>
        </>
      )}
    </div>
  );
}
