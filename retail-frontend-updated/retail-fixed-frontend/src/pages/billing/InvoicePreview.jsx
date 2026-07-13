// src/pages/billing/InvoicePreview.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Printer, ArrowLeft, CreditCard } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { getBill, recordPayment } from '../../services/billingService';
import { useNotification } from '../../context/NotificationContext';

export default function InvoicePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useNotification();
  const [bill, setBill] = useState(null);

  const load = () => getBill(id).then(setBill);

  useEffect(() => {
    load();
  }, [id]);

  const handlePayment = async () => {
    await recordPayment({ billId: id, paymentMethod: 'CASH', amount: bill.totalAmount });
    pushToast('Payment recorded successfully');
    load();
  };

  if (!bill) return <p className="text-sm text-slate-400">Loading...</p>;

  return (
    <div>
      <PageHeader
        title={`Invoice #${bill.billId}`}
        description={new Date(bill.billDate).toLocaleString()}
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate('/billing')}>
              <ArrowLeft size={16} /> Back
            </Button>
            {bill.paymentStatus !== 'PAID' && (
              <Button onClick={handlePayment}>
                <CreditCard size={16} /> Record Payment
              </Button>
            )}
            <Button variant="secondary" onClick={() => window.print()}>
              <Printer size={16} /> Print
            </Button>
          </>
        }
      />

      <Card className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <p className="text-lg font-bold text-slate-800">Smart Retail Store</p>
            <p className="text-sm text-slate-400">123 Market Street, Chennai, TN</p>
          </div>
          <Badge variant={bill.paymentStatus === 'PAID' ? 'success' : 'warning'}>{bill.paymentStatus}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-slate-400">Billed To</p>
            <p className="font-medium text-slate-700">{bill.customerName}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400">Invoice Date</p>
            <p className="font-medium text-slate-700">{new Date(bill.billDate).toLocaleDateString()}</p>
          </div>
        </div>

        <table className="min-w-full text-sm mb-4">
          <thead className="border-b border-slate-100">
            <tr>
              <th className="py-2 text-left font-semibold text-slate-600">Product</th>
              <th className="py-2 text-right font-semibold text-slate-600">Qty</th>
              <th className="py-2 text-right font-semibold text-slate-600">Unit Price</th>
              <th className="py-2 text-right font-semibold text-slate-600">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bill.items.map((item) => (
              <tr key={item.productId}>
                <td className="py-2 text-slate-700">{item.productName}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">₹{item.unitPrice.toFixed(2)}</td>
                <td className="py-2 text-right font-medium">₹{item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-1 text-sm ml-auto max-w-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span>₹{bill.items.reduce((s, i) => s + i.subtotal, 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tax</span>
            <span>₹{bill.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Discount</span>
            <span>-₹{bill.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold text-slate-800">
            <span>Total</span>
            <span>₹{bill.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
