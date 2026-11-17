import { Link } from 'react-router-dom';

function ResetPasswordPage() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card compact-card">
        <div className="admin-login-header">
          <div className="admin-brand-mark large">V</div>
          <div>
            <p className="admin-kicker">Password reset</p>
            <h1>Recover access</h1>
          </div>
        </div>

        <div className="standard-form admin-form">
          <p>
            Use the Supabase Auth reset flow for production. In a local environment without configured credentials, this page acts as a placeholder for the reset journey.
          </p>
          <Link to="/admin/login" className="btn btn-primary full-width">
            Go back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
