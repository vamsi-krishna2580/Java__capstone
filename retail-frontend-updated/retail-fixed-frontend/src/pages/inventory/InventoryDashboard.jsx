// src/pages/inventory/InventoryDashboard.jsx
import { useEffect, useState } from 'react';
import { Boxes, AlertTriangle, XCircle, IndianRupee } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import { CategoryPieChart } from '../../components/charts/Charts';
import { getInventory } from '../../services/inventoryService';
import { products } from '../../data/mockData';

export default function InventoryDashboard() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory().then((res) => setInventory(res.data));
  }, []);

  const totalSKUs = inventory.length;
  const lowStockCount = inventory.filter((i) => i.availableStock <= i.threshold && i.availableStock > 0).length;
  const outOfStockCount = inventory.filter((i) => i.availableStock === 0).length;
  const totalStockValue = inventory.reduce((sum, i) => {
    const product = products.find((p) => p.productId === i.productId);
    return sum + (product ? product.price * i.availableStock : 0);
  }, 0);

  const categoryDistribution = Object.entries(
    inventory.reduce((acc, i) => {
      const product = products.find((p) => p.productId === i.productId);
      const cat = product?.category || 'Other';
      acc[cat] = (acc[cat] || 0) + i.availableStock;
      return acc;
    }, {})
  );

  return (
    <div>
      <PageHeader title="Inventory Dashboard" description="Overview of stock levels across your store" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Boxes} label="Total SKUs" value={totalSKUs} accent="brand" />
        <StatCard icon={IndianRupee} label="Total Stock Value" value={`₹${totalStockValue.toLocaleString()}`} accent="success" />
        <StatCard icon={AlertTriangle} label="Low Stock Items" value={lowStockCount} accent="warning" />
        <StatCard icon={XCircle} label="Out of Stock" value={outOfStockCount} accent="danger" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Stock Distribution by Category" className="lg:col-span-2">
          <CategoryPieChart
            labels={categoryDistribution.map(([cat]) => cat)}
            data={categoryDistribution.map(([, qty]) => qty)}
          />
        </Card>
        <Card title="Quick Summary">
          <ul className="space-y-3 text-sm">
            {categoryDistribution.map(([cat, qty]) => (
              <li key={cat} className="flex items-center justify-between">
                <span className="text-slate-600">{cat}</span>
                <span className="font-semibold text-slate-700">{qty} units</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
