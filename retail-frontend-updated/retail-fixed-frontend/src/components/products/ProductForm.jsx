// src/components/products/ProductForm.jsx
import { useState } from 'react';
import { TextField, SelectField } from '../common/FormField';
import Button from '../common/Button';
import { categories } from '../../services/productService';

export default function ProductForm({ initialValues, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(
    initialValues || {
      productName: '',
      category: categories[0],
      brand: '',
      price: '',
      quantity: '',
      supplier: '',
      reorderLevel: '',
    }
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.productName?.trim()) errs.productName = 'Product name is required';
    if (!form.brand?.trim()) errs.brand = 'Brand is required';
    if (!form.supplier?.trim()) errs.supplier = 'Supplier is required';
    if (!(Number(form.price) > 0)) errs.price = 'Price must be greater than 0';
    if (Number(form.quantity) < 0 || form.quantity === '') errs.quantity = 'Quantity is required';
    if (Number(form.reorderLevel) < 0 || form.reorderLevel === '') errs.reorderLevel = 'Reorder level is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
        reorderLevel: Number(form.reorderLevel),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <TextField
        label="Product Name"
        value={form.productName}
        onChange={(e) => setForm({ ...form, productName: e.target.value })}
        error={errors.productName}
        placeholder="e.g. Basmati Rice 5kg"
      />
      <SelectField
        label="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        options={categories}
      />
      <TextField
        label="Brand"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
        error={errors.brand}
        placeholder="e.g. India Gate"
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Price (₹)"
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          error={errors.price}
        />
        <TextField
          label="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          error={errors.quantity}
        />
      </div>
      <TextField
        label="Supplier"
        value={form.supplier}
        onChange={(e) => setForm({ ...form, supplier: e.target.value })}
        error={errors.supplier}
        placeholder="e.g. AgroFresh Distributors"
      />
      <TextField
        label="Reorder Level"
        type="number"
        value={form.reorderLevel}
        onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })}
        error={errors.reorderLevel}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
