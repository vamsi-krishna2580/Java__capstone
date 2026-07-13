// src/pages/products/ProductList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import { getProducts, deleteProduct } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';

export default function ProductList() {
  const navigate = useNavigate();
  const { pushToast } = useNotification();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const load = async (q = '') => {
    setLoading(true);
    const res = await getProducts({ search: q });
    setProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSearch = (val) => {
    setSearch(val);
    load(val);
  };

  const handleDelete = async () => {
    await deleteProduct(toDelete.productId);
    pushToast('Product deleted successfully');
    setToDelete(null);
    load(search);
  };

  const stockBadge = (row) => {
    if (row.quantity === 0) return <Badge variant="danger">Out of Stock</Badge>;
    if (row.quantity <= row.reorderLevel) return <Badge variant="warning">Low Stock</Badge>;
    return <Badge variant="success">In Stock</Badge>;
  };

  const columns = [
    { key: 'productId', header: 'ID' },
    { key: 'productName', header: 'Product Name' },
    { key: 'category', header: 'Category' },
    { key: 'brand', header: 'Brand' },
    { key: 'price', header: 'Price', render: (row) => `₹${row.price.toFixed(2)}` },
    { key: 'quantity', header: 'Quantity' },
    { key: 'status', header: 'Status', render: stockBadge },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button onClick={() => navigate(`/products/${row.productId}`)} className="text-slate-400 hover:text-brand-600" title="View">
            <Eye size={16} />
          </button>
          <button onClick={() => navigate(`/products/${row.productId}/edit`)} className="text-slate-400 hover:text-brand-600" title="Edit">
            <Pencil size={16} />
          </button>
          <button onClick={() => setToDelete(row)} className="text-slate-400 hover:text-danger" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage your product catalog"
        actions={
          <Button onClick={() => navigate('/products/add')}>
            <Plus size={16} /> Add Product
          </Button>
        }
      />
      <Card>
        {loading ? (
          <p className="text-sm text-slate-400">Loading products...</p>
        ) : (
          <DataTable columns={columns} data={products} searchPlaceholder="Search by product name" onSearch={handleSearch} pageSize={6} />
        )}
      </Card>

      <Modal
        title="Delete Product"
        isOpen={!!toDelete}
        onClose={() => setToDelete(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setToDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <span className="font-semibold">{toDelete?.productName}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
