// src/pages/inventory/InventoryHistory.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { getInventoryHistory } from '../../services/inventoryService';

export default function InventoryHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getInventoryHistory().then((res) => setHistory(res.data));
  }, []);

  const columns = [
    { key: 'id', header: 'Event ID' },
    { key: 'productId', header: 'Product ID' },
    { key: 'productName', header: 'Product Name' },
    {
      key: 'type',
      header: 'Type',
      render: (row) => <Badge variant={row.type === 'RESTOCK' ? 'success' : 'brand'}>{row.type}</Badge>,
    },
    {
      key: 'change',
      header: 'Stock Change',
      render: (row) => (
        <span className={row.change > 0 ? 'text-success font-medium' : 'text-danger font-medium'}>
          {row.change > 0 ? `+${row.change}` : row.change}
        </span>
      ),
    },
    { key: 'date', header: 'Date' },
  ];

  return (
    <div>
      <PageHeader title="Inventory History" description="Stock-in and stock-out events over time" />
      <Card>
        <DataTable columns={columns} data={history} pageSize={8} />
      </Card>
    </div>
  );
}
