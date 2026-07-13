// src/pages/customers/ViewCustomer.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Pencil, ArrowLeft } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { getCustomer } from '../../services/customerService';
import { bills } from '../../data/mockData';

export default function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getCustomer(id).then(setCustomer);
  }, [id]);

  if (!customer) return <p className="text-sm text-slate-400">Loading...</p>;

  const purchaseHistory = bills.filter((b) => b.customerId === Number(id));

  return (
    <div>
      <PageHeader
        title={customer.name}
        description={`Customer #${customer.customerId}`}
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate('/customers')}>
              <ArrowLeft size={16} /> Back
            </Button>
            <Button onClick={() => navigate(`/customers/${id}/edit`)}>
              <Pencil size={16} /> Edit
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Profile Details" className="lg:col-span-1">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Email</dt>
              <dd className="font-medium text-slate-700">{customer.email}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Phone</dt>
              <dd className="font-medium text-slate-700">{customer.phone}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Address</dt>
              <dd className="font-medium text-slate-700">{customer.address}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Registered On</dt>
              <dd className="font-medium text-slate-700">{customer.registrationDate}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Purchase History" className="lg:col-span-2">
          {purchaseHistory.length === 0 ? (
            <p className="text-sm text-slate-400">No purchases yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Bill ID</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Date</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Items</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Total</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {purchaseHistory.map((b) => (
                    <tr key={b.billId}>
                      <td className="px-4 py-3">
                        <Link to={`/billing/${b.billId}`} className="text-brand-600 font-medium hover:underline">
                          #{b.billId}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{new Date(b.billDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{b.items.map((i) => i.productName).join(', ')}</td>
                      <td className="px-4 py-3 font-medium">₹{b.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={b.paymentStatus === 'PAID' ? 'success' : 'warning'}>{b.paymentStatus}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
