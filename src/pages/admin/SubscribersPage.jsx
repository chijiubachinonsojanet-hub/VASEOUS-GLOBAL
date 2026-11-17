import { useEffect, useState } from 'react';
import { subscriberRecords } from '../../data/adminSeed';
import { getDashboardData } from '../../lib/crmStore';

function SubscribersPage() {
  const [subscribers, setSubscribers] = useState(subscriberRecords);

  useEffect(() => {
    let active = true;
    const loadSubscribers = async () => {
      const data = await getDashboardData();
      if (active && data.subscribers?.length) {
        setSubscribers(data.subscribers);
      }
    };

    loadSubscribers();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">Newsletter</p>
          <h2>Email subscribers</h2>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Interest</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.email || sub.id}>
                <td>{sub.email}</td>
                <td>{sub.interest ?? sub.category_interest}</td>
                <td>{sub.date ?? sub.created_at?.slice(0, 10)}</td>
                <td><span className="status-badge">{sub.status ?? 'Subscribed'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscribersPage;
