import { useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, Mail, Menu, MessageCircleMore, Phone, X } from 'lucide-react';
import { businessConfig, categoryCatalog } from '../config/businessConfig';
import { getCommunityJoinLink, openWhatsAppChat } from '../utils/whatsapp';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/categories', label: 'Categories' },
  { to: '/contact', label: 'Contact' },
];

function BrandMark() {
  const [showFallback, setShowFallback] = useState(false);

  if (showFallback) {
    return <div className="logo-fallback" aria-label="Vaseous logo">V</div>;
  }

  return (
    <img
      src={businessConfig.logoPath}
      alt="Vaseous logo"
      className="brand-logo"
      onError={() => setShowFallback(true)}
    />
  );
}

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const quickCategories = useMemo(() => categoryCatalog.slice(0, 5), []);

  const handleDirectOrderClick = () => {
    openWhatsAppChat(businessConfig.contactMessage);
  };

  const handleCommunityClick = () => {
    const link = getCommunityJoinLink();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Vaseous home">
            <BrandMark />
            <span>{businessConfig.brandName}</span>
          </Link>

          <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button type="button" className="btn btn-ghost nav-secondary-action" onClick={handleCommunityClick}>
              <MessageCircleMore size={16} />
              Product Group
            </button>
            <button type="button" className="btn btn-primary" onClick={handleDirectOrderClick}>
              Chat to Order
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="page-main">
        <Outlet key={location.pathname} />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              <BrandMark />
              <span>{businessConfig.brandName}</span>
            </Link>
            <p className="footer-copy">
              Your trusted China-to-Nigeria sourcing partner for convenient pre-order shopping and product discovery.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-policies">Terms &amp; Policies</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Categories</h4>
            <ul className="footer-list">
              {quickCategories.map((category) => (
                <li key={category.id}>
                  <Link to="/categories">{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul className="footer-list contact-list">
              <li>
                <a href={businessConfig.businessEmailHref}>
                  <Mail size={16} /> {businessConfig.businessEmail}
                </a>
              </li>
              <li>
                <a href={businessConfig.whatsappLink}>
                  <Phone size={16} /> {businessConfig.whatsappNumberDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {businessConfig.legalName}</span>
          <Link to="/admin/login">Admin Portal</Link>
        </div>
      </footer>
    </div>
  );
}
