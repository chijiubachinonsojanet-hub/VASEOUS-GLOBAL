function PrivacyPolicyPage() {
  return (
    <div className="static-page section">
      <div className="container narrow-container">
        <span className="eyebrow">Privacy policy</span>
        <h1>How Vaseous handles your information.</h1>

        <div className="policy-block">
          <h3>Information we collect</h3>
          <p>We may collect information such as your name, email address, type of product interest, contact details shared through the website, and any information submitted through our enquiry form or email subscription form.</p>
        </div>

        <div className="policy-block">
          <h3>Marketing consent</h3>
          <p>Email marketing is optional and only sent when a user clearly agrees to subscribe. This consent is stored with a timestamp in our secure database and can be withdrawn at any time.</p>
        </div>

        <div className="policy-block">
          <h3>How we use your information</h3>
          <p>We use the information collected to respond to enquiries, manage customer communication, support pre-order sourcing, and share relevant updates about product availability or product drops when consent has been explicitly given.</p>
        </div>

        <div className="policy-block">
          <h3>Storage and security</h3>
          <p>Data is stored in a Supabase PostgreSQL environment with access limited to authorised admin accounts. We use security controls such as row-level policies and browser-safe environment variables, but no online system can guarantee absolute security.</p>
        </div>

        <div className="policy-block">
          <h3>Data removal requests</h3>
          <p>If you want your data removed, please contact us at <a href="mailto:vaseousglobal.ng@gmail.com">vaseousglobal.ng@gmail.com</a> and include the relevant email or contact details for review.</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
