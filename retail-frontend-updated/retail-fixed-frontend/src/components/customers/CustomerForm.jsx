// src/components/customers/CustomerForm.jsx
import { useState } from 'react';
import { TextField, TextAreaField } from '../common/FormField';
import Button from '../common/Button';

export default function CustomerForm({ initialValues, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(
    initialValues || { name: '', email: '', phone: '', address: '' }
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name?.trim()) errs.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email || '')) errs.email = 'Enter a valid email';
    if (!/^\d{10}$/.test(form.phone || '')) errs.phone = 'Phone must be 10 digits';
    if (!form.address?.trim()) errs.address = 'Address is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <TextField
        label="Customer Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
        placeholder="e.g. Ramesh Kumar"
      />
      <TextField
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        placeholder="e.g. ramesh@example.com"
      />
      <TextField
        label="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        error={errors.phone}
        placeholder="10-digit mobile number"
      />
      <TextAreaField
        label="Address"
        rows={3}
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        error={errors.address}
        placeholder="Street, City, State"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
