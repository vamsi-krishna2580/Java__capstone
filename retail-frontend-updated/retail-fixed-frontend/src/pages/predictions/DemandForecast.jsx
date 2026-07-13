// src/pages/predictions/DemandForecast.jsx
import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import { SelectField } from '../../components/common/FormField';
import { RevenueLineChart } from '../../components/charts/Charts';
import DataTable from '../../components/common/DataTable';
import { getDemandPredictions, getForecast } from '../../services/predictionService';

export default function DemandForecast() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    getDemandPredictions().then((res) => {
      setProducts(res.data);
      if (res.data.length) setSelectedId(res.data[0].productId);
    });
  }, []);

  useEffect(() => {
    if (selectedId) getForecast(selectedId, 6).then(setForecast);
  }, [selectedId]);

  const columns = [
    { key: 'productName', header: 'Product Name' },
    { key: 'currentStock', header: 'Current Stock' },
    { key: 'avgMonthlySales', header: 'Avg Monthly Sales' },
    { key: 'predictedDemand', header: 'Predicted Demand' },
    { key: 'recommendedStock', header: 'Recommended Stock' },
  ];

  return (
    <div>
      <PageHeader title="Demand Forecast" description="6-month demand forecast by product" />

      <Card title="Select Product" className="mb-6 max-w-sm">
        <SelectField
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          options={products.map((p) => ({ value: p.productId, label: p.productName }))}
        />
      </Card>

      {forecast && (
        <Card title={`Forecast for ${forecast.productName}`} className="mb-6">
          <RevenueLineChart labels={forecast.forecast.map((f) => f.month)} data={forecast.forecast.map((f) => f.predictedDemand)} height={300} />
        </Card>
      )}

      <Card title="All Products — Forecast Overview">
        <DataTable columns={columns} data={products} pageSize={8} />
      </Card>
    </div>
  );
}
