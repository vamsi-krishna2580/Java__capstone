// src/pages/customers/AddCustomer.jsx
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import CustomerForm from '../../components/customers/CustomerForm';
import { createCustomer } from '../../services/customerService';
import { useNotification } from '../../context/NotificationContext';

export default function AddCustomer() {
  const navigate = useNavigate();
  const { pushToast } = useNotification();

  const handleSubmit = async (data) => {
    await createCustomer(data);
    pushToast('Customer created successfully');
    navigate('/customers');
  };

  return (
    <div>
      <PageHeader title="Add Customer" description="Create a new customer record" />
      <Card>
        <CustomerForm onSubmit={handleSubmit} submitLabel="Create Customer" />
      </Card>
    </div>
  );
}
