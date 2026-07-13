// src/pages/customers/CustomerList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { getCustomers, deleteCustomer } from '../../services/customerService';
import { useNotification } from '../../context/NotificationContext';

export default function CustomerList() {
  const navigate = useNavigate();
  const { pushToast } = useNotification();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const load = async (q = '') => {
    setLoading(true);
    const res = await getCustomers({ search: q });
    setCustomers(res.data);
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
    await deleteCustomer(toDelete.customerId);
    pushToast('Customer deleted successfully');
    setToDelete(null);
    load(search);
  };

  const columns = [
    { key: 'customerId', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'registrationDate', header: 'Registered On' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button onClick={() => navigate(`/customers/${row.customerId}`)} className="text-slate-400 hover:text-brand-600" title="View">
            <Eye size={16} />
          </button>
          <button onClick={() => navigate(`/customers/${row.customerId}/edit`)} className="text-slate-400 hover:text-brand-600" title="Edit">
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
        title="Customers"
        description="Manage your customer database"
        actions={
          <Button onClick={() => navigate('/customers/add')}>
            <Plus size={16} /> Add Customer
          </Button>
        }
      />
      <Card>
        {loading ? (
          <p className="text-sm text-slate-400">Loading customers...</p>
        ) : (
          <DataTable columns={columns} data={customers} searchPlaceholder="Search by name or email" onSearch={handleSearch} pageSize={6} />
        )}
      </Card>

      <Modal
        title="Delete Customer"
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
          Are you sure you want to delete <span className="font-semibold">{toDelete?.name}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
