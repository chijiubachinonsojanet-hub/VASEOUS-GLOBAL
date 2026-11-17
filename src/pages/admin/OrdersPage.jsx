import { useEffect, useState } from 'react';
import { orderRecords } from '../../data/adminSeed';
import { getDashboardData } from '../../lib/crmStore';

function OrdersPage() {
  const [orders, setOrders] = useState(orderRecords);

  useEffect(() => {
    let active = true;
    const loadOrders = async () => {
      const data = await getDashboardData();
      if (active && data.orders?.length) {
        setOrders(data.orders);
      }
    };

    loadOrders();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">Orders</p>
          <h2>Order management</h2>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td><span className="status-badge">{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
