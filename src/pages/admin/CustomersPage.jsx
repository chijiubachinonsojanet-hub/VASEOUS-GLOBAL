import { useEffect, useState } from 'react';
import { customerRecords } from '../../data/adminSeed';
import { getDashboardData } from '../../lib/crmStore';

function CustomersPage() {
  const [customers, setCustomers] = useState(customerRecords);

  useEffect(() => {
    let active = true;
    const loadCustomers = async () => {
      const data = await getDashboardData();
      if (active && data.customers?.length) {
        setCustomers(data.customers);
      }
    };

    loadCustomers();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">CRM</p>
          <h2>Customer directory</h2>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Segment</th>
              <th>Status</th>
              <th>Orders</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.name || customer.id}>
                <td>{customer.name}</td>
                <td>{customer.segment}</td>
                <td><span className="status-badge">{customer.status}</span></td>
                <td>{customer.purchases}</td>
                <td>{customer.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomersPage;
