// src/pages/billing/TransactionHistory.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Plus } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { getBillingHistory } from '../../services/billingService';

export default function TransactionHistory() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    getBillingHistory().then((res) => setBills(res.data));
  }, []);

  const columns = [
    { key: 'billId', header: 'Bill ID', render: (row) => `#${row.billId}` },
    { key: 'customerName', header: 'Customer' },
    { key: 'billDate', header: 'Date', render: (row) => new Date(row.billDate).toLocaleString() },
    { key: 'items', header: 'Items', render: (row) => row.items.length },
    { key: 'totalAmount', header: 'Total', render: (row) => `₹${row.totalAmount.toFixed(2)}` },
    {
      key: 'paymentStatus',
      header: 'Status',
      render: (row) => <Badge variant={row.paymentStatus === 'PAID' ? 'success' : 'warning'}>{row.paymentStatus}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <button onClick={() => navigate(`/billing/${row.billId}`)} className="text-slate-400 hover:text-brand-600" title="View Invoice">
          <Eye size={16} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Transaction History"
        description="All bills and payments"
        actions={
          <Button onClick={() => navigate('/billing/new')}>
            <Plus size={16} /> New Bill
          </Button>
        }
      />
      <Card>
        <DataTable columns={columns} data={bills} pageSize={8} />
      </Card>
    </div>
  );
}
