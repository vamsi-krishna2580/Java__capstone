// src/pages/products/ProductDetails.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, ArrowLeft } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { getProduct } from '../../services/productService';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <p className="text-sm text-slate-400">Loading...</p>;

  const stockBadge =
    product.quantity === 0 ? (
      <Badge variant="danger">Out of Stock</Badge>
    ) : product.quantity <= product.reorderLevel ? (
      <Badge variant="warning">Low Stock</Badge>
    ) : (
      <Badge variant="success">In Stock</Badge>
    );

  return (
    <div>
      <PageHeader
        title={product.productName}
        description={`Product #${product.productId}`}
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate('/products')}>
              <ArrowLeft size={16} /> Back
            </Button>
            <Button onClick={() => navigate(`/products/${id}/edit`)}>
              <Pencil size={16} /> Edit
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Product Details" className="lg:col-span-2">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-400">Category</dt>
              <dd className="font-medium text-slate-700">{product.category}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Brand</dt>
              <dd className="font-medium text-slate-700">{product.brand}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Price</dt>
              <dd className="font-medium text-slate-700">₹{product.price.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Quantity in Stock</dt>
              <dd className="font-medium text-slate-700">{product.quantity}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Supplier</dt>
              <dd className="font-medium text-slate-700">{product.supplier}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Reorder Level</dt>
              <dd className="font-medium text-slate-700">{product.reorderLevel}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Stock Status">
          <div className="flex flex-col items-center justify-center gap-3 py-6">
            {stockBadge}
            <p className="text-3xl font-bold text-slate-800">{product.quantity}</p>
            <p className="text-sm text-slate-400">units available</p>
            <p className="text-xs text-slate-400">Reorder threshold: {product.reorderLevel}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
