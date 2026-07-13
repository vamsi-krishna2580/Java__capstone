// src/pages/products/UpdateProduct.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import ProductForm from '../../components/products/ProductForm';
import { getProduct, updateProduct } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useNotification();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  const handleSubmit = async (data) => {
    await updateProduct(id, data);
    pushToast('Product updated successfully');
    navigate('/products');
  };

  return (
    <div>
      <PageHeader title="Update Product" description={`Update details for product #${id}`} />
      <Card>
        {product ? (
          <ProductForm initialValues={product} onSubmit={handleSubmit} submitLabel="Update Product" />
        ) : (
          <p className="text-sm text-slate-400">Loading...</p>
        )}
      </Card>
    </div>
  );
}
