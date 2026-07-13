// src/pages/inventory/StockMonitoring.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import { getInventory } from '../../services/inventoryService';

export default function StockMonitoring() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getInventory().then((res) => setInventory(res.data));
  }, []);

  const filtered = inventory.filter((i) => i.productName.toLowerCase().includes(search.toLowerCase()));

  const statusBadge = (row) => {
    if (row.availableStock === 0) return <Badge variant="danger">Out of Stock</Badge>;
    if (row.availableStock <= row.threshold) return <Badge variant="warning">Low Stock</Badge>;
    return <Badge variant="success">Healthy</Badge>;
  };

  const columns = [
    { key: 'productId', header: 'Product ID' },
    { key: 'productName', header: 'Product Name' },
    { key: 'availableStock', header: 'Available Stock' },
    { key: 'threshold', header: 'Threshold' },
    { key: 'reorderQuantity', header: 'Reorder Qty' },
    { key: 'status', header: 'Status', render: statusBadge },
    {
      key: 'lastUpdated',
      header: 'Last Updated',
      render: (row) => new Date(row.lastUpdated).toLocaleString(),
    },
  ];

  return (
    <div>
      <PageHeader title="Stock Monitoring" description="Real-time view of stock levels for all products" />
      <Card>
        <DataTable columns={columns} data={filtered} searchPlaceholder="Search by product name" onSearch={setSearch} pageSize={8} />
      </Card>
    </div>
  );
}
