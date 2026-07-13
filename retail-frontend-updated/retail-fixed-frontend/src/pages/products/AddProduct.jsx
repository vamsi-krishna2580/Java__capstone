// src/pages/products/AddProduct.jsx
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import ProductForm from '../../components/products/ProductForm';
import { createProduct } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';

export default function AddProduct() {
  const navigate = useNavigate();
  const { pushToast } = useNotification();

  const handleSubmit = async (data) => {
    await createProduct(data);
    pushToast('Product created successfully');
    navigate('/products');
  };

  return (
    <div>
      <PageHeader title="Add Product" description="Add a new product to your catalog" />
      <Card>
        <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
      </Card>
    </div>
  );
}
