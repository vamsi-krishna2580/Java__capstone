// src/components/charts/Charts.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f1f5f9' } },
  },
};

export function RevenueLineChart({ labels, data, height = 260 }) {
  return (
    <div style={{ height }}>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Revenue',
              data,
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(79,70,229,0.08)',
              tension: 0.35,
              fill: true,
              pointRadius: 3,
            },
          ],
        }}
        options={baseOptions}
      />
    </div>
  );
}

export function CategoryPieChart({ labels, data, height = 260 }) {
  const colors = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'];
  return (
    <div style={{ height }}>
      <Pie
        data={{
          labels,
          datasets: [{ data, backgroundColor: colors }],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16 } } },
        }}
      />
    </div>
  );
}

export function TopProductsBarChart({ labels, data, height = 260 }) {
  return (
    <div style={{ height }}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Units Sold',
              data,
              backgroundColor: '#818cf8',
              borderRadius: 6,
            },
          ],
        }}
        options={baseOptions}
      />
    </div>
  );
}
