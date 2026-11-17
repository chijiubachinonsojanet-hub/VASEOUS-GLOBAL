import { businessConfig } from '../../config/businessConfig';

function SettingsPage() {
  return (
    <div className="admin-page">
      <div className="page-heading">
        <div>
          <p className="admin-kicker">Settings</p>
          <h2>Business configuration</h2>
        </div>
      </div>

      <div className="panel-card settings-card">
        <ul className="settings-list">
          <li><span>Brand name</span><strong>{businessConfig.brandName}</strong></li>
          <li><span>Legal name</span><strong>{businessConfig.legalName}</strong></li>
          <li><span>Business email</span><strong>{businessConfig.businessEmail}</strong></li>
          <li><span>WhatsApp number</span><strong>{businessConfig.whatsappNumberDisplay}</strong></li>
          <li><span>Currency</span><strong>{businessConfig.currencyCode}</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsPage;
