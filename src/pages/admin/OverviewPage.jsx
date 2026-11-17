import { useEffect, useState } from 'react';
import { ArrowUpRight, CircleDollarSign, PackageCheck, ShoppingCart, UserRoundCheck } from 'lucide-react';
import { categoryBreakdown, dashboardMetrics, salesTrend } from '../../data/adminSeed';
import { getDashboardData } from '../../lib/crmStore';

const iconMap = [UserRoundCheck, ShoppingCart, ArrowUpRight, PackageCheck, CircleDollarSign];

function OverviewPage() {
  const [dashboardData, setDashboardData] = useState({ leads: [], customers: [], orders: [], subscribers: [] });

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const data = await getDashboardData();
      if (active) {
        setDashboardData(data);
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const leadCount = dashboardData.leads.length;
  const customerCount = dashboardData.customers.length;
  const orderCount = dashboardData.orders.length;
  const subscriberCount = dashboardData.subscribers.length;

  const metrics = [
    ...dashboardMetrics.slice(0, 4),
    { label: 'Pending Payments', value: '₦1,060,000', tone: 'crimson' },
    { label: 'Confirmed Payments', value: '₦2,420,000', tone: 'emerald' },
    { label: 'Orders in Transit', value: String(orderCount), tone: 'peach' },
    { label: 'Delivered Orders', value: `${Math.max(orderCount - 2, 0)}`, tone: 'emerald' },
    { label: 'Repeat Customers', value: `${Math.min(Math.round((customerCount / Math.max(leadCount + customerCount, 1)) * 100), 100)}%`, tone: 'crimson' },
  ];

  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">Overview</p>
          <h2>Sales performance snapshot</h2>
        </div>
      </div>

      <div className="kpi-grid">
        {metrics.map((metric, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <div className="kpi-card" key={metric.label}>
              <div className="kpi-header">
                <span>{metric.label}</span>
                <Icon size={18} />
              </div>
              <strong>{metric.value}</strong>
              <div className={`trend-pill ${metric.tone}`}>Updated today</div>
            </div>
          );
        })}
      </div>

      <div className="insight-grid">
        <div className="panel-card">
          <h3>Lead activity</h3>
          <div className="chart-bars">
            {salesTrend.map((bar, index) => (
              <span key={`${bar}-${index}`} style={{ height: `${bar}%` }} className={`bar bar-${index % 3}`} />
            ))}
          </div>
        </div>

        <div className="panel-card">
          <h3>Top categories</h3>
          <ul className="list-strip">
            {categoryBreakdown.map((item) => (
              <li key={item.label}><span>{item.label}</span><strong>{item.value}</strong></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel-card">
        <h3>Live counts</h3>
        <ul className="list-strip">
          <li><span>Customers</span><strong>{customerCount}</strong></li>
          <li><span>Leads</span><strong>{leadCount}</strong></li>
          <li><span>Orders</span><strong>{orderCount}</strong></li>
          <li><span>Subscribers</span><strong>{subscriberCount}</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default OverviewPage;
