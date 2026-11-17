import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, BriefcaseBusiness, CheckCheck, CircleUserRound, FileText, LayoutDashboard, LogOut, MessageSquareText, Package, Settings, UsersRound } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/customers', label: 'Customers', icon: UsersRound },
  { to: '/admin/leads', label: 'Leads', icon: FileText },
  { to: '/admin/pipeline', label: 'Sales Pipeline', icon: BriefcaseBusiness },
  { to: '/admin/orders', label: 'Orders', icon: Package },
  { to: '/admin/subscribers', label: 'Email Subscribers', icon: MessageSquareText },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">V</div>
          <div>
            <strong>{businessConfig.brandName}</strong>
            <span>Admin CRM</span>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="admin-logout" onClick={handleSignOut}>
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-kicker">Operations dashboard</p>
            <h1>Vaseous Global</h1>
          </div>
          <div className="admin-topbar-actions">
            <button type="button" className="pill-button">
              <CheckCheck size={16} />
              Live update
            </button>
            <div className="admin-user">
              <CircleUserRound size={20} />
              <span>Admin</span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
