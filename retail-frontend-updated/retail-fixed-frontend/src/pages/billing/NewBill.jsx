// src/pages/billing/NewBill.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, Search } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { SelectField } from '../../components/common/FormField';
import { getCustomers } from '../../services/customerService';
import { getProducts } from '../../services/productService';
import { createBill } from '../../services/billingService';
import { useNotification } from '../../context/NotificationContext';

const TAX_RATE = 0.09; // 9% (combined 18% GST split example -> using 9% as a simple illustrative rate)

export default function NewBill() {
  const navigate = useNavigate();
  const { pushToast } = useNotification();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [productQuery, setProductQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCustomers().then((res) => {
      setCustomers(res.data);
      if (res.data.length) setCustomerId(res.data[0].customerId);
    });
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(productQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: product.productId, productName: product.productName, unitPrice: product.price, quantity: 1, maxStock: product.quantity }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, Math.min(i.maxStock, i.quantity + delta)) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId) => setCart((prev) => prev.filter((i) => i.productId !== productId));

  const subtotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax - Number(discount || 0)).toFixed(2));

  const handleGenerateBill = async () => {
    setError('');
    if (cart.length === 0) {
      setError('Add at least one product to the cart');
      return;
    }
    setSubmitting(true);
    try {
      const bill = await createBill({
        customerId,
        items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        tax,
        discount: Number(discount || 0),
      });
      pushToast('Bill generated successfully');
      navigate(`/billing/${bill.billId}`);
    } catch (err) {
      setError(err.message || 'Failed to create bill');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="New Bill" description="Create a new sales bill / invoice" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card title="Select Customer">
            <SelectField
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              options={customers.map((c) => ({ value: c.customerId, label: `${c.name} (${c.email})` }))}
            />
          </Card>

          <Card title="Add Products">
            <div className="mb-3 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {filteredProducts.map((p) => (
                <button
                  key={p.productId}
                  onClick={() => addToCart(p)}
                  disabled={p.quantity === 0}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-sm hover:border-brand-300 hover:bg-brand-50 disabled:opacity-40"
                >
                  <div>
                    <p className="font-medium text-slate-700">{p.productName}</p>
                    <p className="text-xs text-slate-400">{p.category} &middot; Stock: {p.quantity}</p>
                  </div>
                  <span className="font-semibold text-slate-700">₹{p.price}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Cart Summary">
          {error && <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{error}</div>}
          {cart.length === 0 ? (
            <p className="text-sm text-slate-400">No items added yet.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item.productId} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-slate-700">{item.productName}</p>
                    <p className="text-xs text-slate-400">₹{item.unitPrice} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQuantity(item.productId, -1)} className="rounded-md border border-slate-200 p-1 hover:bg-slate-50">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 1)} className="rounded-md border border-slate-200 p-1 hover:bg-slate-50">
                      <Plus size={12} />
                    </button>
                    <button onClick={() => removeFromCart(item.productId)} className="ml-1 text-slate-400 hover:text-danger">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 border-t border-slate-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tax (9%)</span>
              <span className="font-medium">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Discount (₹)</span>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-24 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold text-slate-800">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="mt-4 w-full" onClick={handleGenerateBill} disabled={submitting}>
            {submitting ? 'Generating...' : 'Generate Bill'}
          </Button>
        </Card>
      </div>
    </div>
  );
}
