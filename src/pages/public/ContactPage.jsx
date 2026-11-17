import { useState } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { businessConfig } from '../../config/businessConfig';
import { supabase } from '../../lib/supabaseClient';
import { openWhatsAppChat, getCommunityJoinLink } from '../../utils/whatsapp';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    enquiryType: 'General enquiry',
    message: '',
  });
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitState({ type: 'error', message: 'Please complete your name, email, and enquiry details.' });
      return;
    }

    if (!supabase) {
      setSubmitState({
        type: 'success',
        message: 'Your enquiry was prepared. Add your Supabase details in the .env file to save it to the database.',
      });
      return;
    }

    try {
      const { error } = await supabase.from('enquiries').insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        enquiry_type: formData.enquiryType,
        message: formData.message.trim(),
      });

      if (error) {
        throw error;
      }

      setSubmitState({
        type: 'success',
        message: 'Your enquiry has been sent successfully. The Vaseous team will follow up through your contact details.',
      });
      setFormData({ fullName: '', email: '', enquiryType: 'General enquiry', message: '' });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: 'Your enquiry could not be saved yet. Please send the same message through WhatsApp or email directly.',
      });
      console.error(error);
    }
  };

  return (
    <div className="static-page section">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">Contact</span>
          <h1>Talk to Vaseous directly.</h1>
          <p>Reach the team quickly through WhatsApp, email, or the direct enquiry form below.</p>

          <div className="contact-stack">
            <button type="button" className="btn btn-primary" onClick={() => openWhatsAppChat(businessConfig.contactMessage)}>
              <MessageCircle size={16} />
              Chat on WhatsApp
            </button>

            <button type="button" className="btn btn-success" onClick={() => window.open(getCommunityJoinLink(), '_blank', 'noopener,noreferrer')}>
              Join WhatsApp Group
            </button>

            <a className="contact-email" href={businessConfig.businessEmailHref}>
              <Mail size={16} /> {businessConfig.businessEmail}
            </a>
          </div>
        </div>

        <form className="standard-form" onSubmit={handleSubmit}>
          <label>
            <span>Full name</span>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          </label>

          <label>
            <span>Enquiry type</span>
            <select name="enquiryType" value={formData.enquiryType} onChange={handleChange}>
              <option>General enquiry</option>
              <option>Product question</option>
              <option>Pricing enquiry</option>
              <option>Custom sourcing</option>
              <option>Order follow-up</option>
            </select>
          </label>

          <label>
            <span>Your message</span>
            <textarea name="message" value={formData.message} onChange={handleChange} rows={6} placeholder="Tell us what you need..." />
          </label>

          {submitState.message ? (
            <div className={`form-message ${submitState.type === 'error' ? 'error' : 'success'}`}>{submitState.message}</div>
          ) : null}

          <button type="submit" className="btn btn-primary full-width">Send enquiry</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
