// src/pages/customers/EditCustomer.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import CustomerForm from '../../components/customers/CustomerForm';
import { getCustomer, updateCustomer } from '../../services/customerService';
import { useNotification } from '../../context/NotificationContext';

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useNotification();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getCustomer(id).then(setCustomer);
  }, [id]);

  const handleSubmit = async (data) => {
    await updateCustomer(id, data);
    pushToast('Customer updated successfully');
    navigate('/customers');
  };

  return (
    <div>
      <PageHeader title="Edit Customer" description={`Update details for customer #${id}`} />
      <Card>
        {customer ? (
          <CustomerForm initialValues={customer} onSubmit={handleSubmit} submitLabel="Update Customer" />
        ) : (
          <p className="text-sm text-slate-400">Loading...</p>
        )}
      </Card>
    </div>
  );
}
