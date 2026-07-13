// src/pages/analytics/TopProducts.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import { TopProductsBarChart } from '../../components/charts/Charts';
import { getTopProducts } from '../../services/analyticsService';

export default function TopProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getTopProducts(10).then((res) => setProducts(res.data));
  }, []);

  const rankedData = products.map((p, i) => ({ ...p, rank: i + 1 }));
  const rankedColumns = [
    { key: 'rank', header: '#' },
    { key: 'productName', header: 'Product' },
    { key: 'unitsSold', header: 'Units Sold' },
    { key: 'revenue', header: 'Revenue', render: (row) => `₹${row.revenue.toLocaleString()}` },
  ];

  return (
    <div>
      <PageHeader title="Top Selling Products" description="Best performing products by units sold and revenue" />

      <Card title="Top Products by Units Sold" className="mb-6">
        <TopProductsBarChart labels={products.map((p) => p.productName)} data={products.map((p) => p.unitsSold)} height={300} />
      </Card>

      <Card title="Ranked List">
        <DataTable columns={rankedColumns} data={rankedData} pageSize={10} />
      </Card>
    </div>
  );
}
