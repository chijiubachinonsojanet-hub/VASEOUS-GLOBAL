import { useEffect, useState } from 'react';
import { analyticsCards } from '../../data/adminSeed';
import { getDashboardData } from '../../lib/crmStore';

function AnalyticsPage() {
  const [stats, setStats] = useState({ leads: [], orders: [], subscribers: [] });

  useEffect(() => {
    let active = true;
    const loadStats = async () => {
      const data = await getDashboardData();
      if (active) {
        setStats(data);
      }
    };

    loadStats();
    return () => {
      active = false;
    };
  }, []);

  const cards = [
    { label: 'Subscribers', value: String(stats.subscribers.length) },
    { label: 'New leads', value: String(stats.leads.length) },
    { label: 'Completed orders', value: String(stats.orders.filter((order) => order.status === 'Confirmed').length) },
    { label: 'Revenue in ₦', value: '₦2,420,000' },
  ];

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">Analytics</p>
          <h2>Live business metrics</h2>
        </div>
      </div>

      <div className="kpi-grid">
        {cards.map((card) => (
          <div className="kpi-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <div className="trend-pill emerald">Updated today</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsPage;
