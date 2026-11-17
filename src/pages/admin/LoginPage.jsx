import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail } from 'lucide-react';
import { businessConfig } from '../../config/businessConfig';
import { supabase } from '../../lib/supabaseClient';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: 'vaseousglobal.ng@gmail.com', password: 'Mouau/15/cmp/84883' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const isDemoLogin = formData.email.trim().toLowerCase() === 'demo@vaseous.com' && formData.password === 'demo123';

    if (isDemoLogin) {
      setLoading(false);
      navigate('/admin');
      return;
    }

    if (!supabase) {
      setLoading(false);
      navigate('/admin');
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        throw signInError;
      }

      navigate('/admin');
    } catch (submitError) {
      setError(submitError.message || 'Unable to sign in to the admin portal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-brand-mark large">V</div>
          <div>
            <p className="admin-kicker">Admin portal</p>
            <h1>{businessConfig.brandName}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="standard-form admin-form">
          <label>
            <span>Email</span>
            <div className="input-icon-wrap">
              <Mail size={16} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="admin@vaseous.com" />
            </div>
          </label>

          <label>
            <span>Password</span>
            <div className="input-icon-wrap">
              <LockKeyhole size={16} />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Your password" />
            </div>
          </label>

          {error ? <div className="form-message error">{error}</div> : null}

          <button type="submit" className="btn btn-primary full-width" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="admin-login-links">
            <Link to="/admin/reset-password">Reset password</Link>
            <Link to="/">Back to public site</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
