import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { businessConfig, categoryCatalog } from '../../config/businessConfig';
import { supabase } from '../../lib/supabaseClient';
import { getCommunityJoinLink, openWhatsAppChat } from '../../utils/whatsapp';

const steps = [
  'Discover products you want from the catalog or ask for custom sourcing.',
  'Tell Vaseous exactly what you want and your preferred style or budget range.',
  'Chat with the team on WhatsApp to confirm product details and sourcing options.',
  'Receive pricing and payment instructions directly from the vendor team.',
  'Confirm your order and send payment after agreement on product details.',
  'Vaseous sources the item from China and follows up with each stage.',
  'Your package is delivered to Nigeria and tracked until arrival.',
  'Receive your order and contact Vaseous for future drops or custom requests.',
];

const faqItems = [
  {
    question: 'Do I need to pay upfront before seeing the product?',
    answer: 'No. Vaseous works via pre-order sourcing. You discuss the item, confirm pricing, and then follow payment instructions manually through direct WhatsApp communication.',
  },
  {
    question: 'Can Vaseous source products not shown in the catalog?',
    answer: 'Yes. If you have a product photo or clear description, the team can help with custom sourcing requests and product matching.',
  },
  {
    question: 'How do I join the product group?',
    answer: 'You can join the WhatsApp community using the group invite link or ask the team to add you through a direct WhatsApp message if the invite is not yet available.',
  },
  {
    question: 'Is the platform a traditional online store?',
    answer: 'No. Vaseous uses WhatsApp as the primary sales channel. The website helps you discover products, learn the process, and contact the team quickly.',
  },
];

const valuePillars = [
  'Trusted China-to-Nigeria sourcing guidance',
  'Clear WhatsApp-first communication',
  'No fake stock claims or misleading pricing',
  'Simple pre-order updates from source to delivery',
];

function HomePage() {
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    categoryInterest: 'Fashion',
    consent: false,
  });
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  const handleCategoryClick = (categoryName) => {
    openWhatsAppChat(`Hi Vaseous Global, I would like to enquire about ${categoryName}.`);
  };

  const handleCommunityClick = () => {
    window.open(getCommunityJoinLink(), '_blank', 'noopener,noreferrer');
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.firstName.trim() || !formData.email.trim()) {
      setSubmitState({ type: 'error', message: 'Please add your first name and email address.' });
      return;
    }

    if (!formData.consent) {
      setSubmitState({ type: 'error', message: 'Marketing consent is required before subscribing.' });
      return;
    }

    const email = formData.email.trim().toLowerCase();

    if (!supabase) {
      setSubmitState({
        type: 'success',
        message: 'Subscription request prepared. Add your Supabase credentials in the .env file to save this data.',
      });
      return;
    }

    try {
      const { data: existingSubscriber } = await supabase
        .from('email_subscribers')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingSubscriber) {
        setSubmitState({ type: 'error', message: 'This email is already subscribed to Vaseous updates.' });
        return;
      }

      const { error } = await supabase.from('email_subscribers').insert({
        first_name: formData.firstName.trim(),
        email,
        category_interest: formData.categoryInterest,
        consent_given: true,
        consent_timestamp: new Date().toISOString(),
        unsubscribed: false,
      });

      if (error) {
        throw error;
      }

      setSubmitState({
        type: 'success',
        message: 'You are subscribed successfully. Keep an eye on your inbox and the WhatsApp community for new pre-order drops.',
      });
      setFormData({ firstName: '', email: '', categoryInterest: 'Fashion', consent: false });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: 'Something went wrong while saving your subscription. Please try again or contact the team directly on WhatsApp.',
      });
      console.error(error);
    }
  };

  return (
    <>
      <section className="hero-section section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">China-to-Nigeria pre-order sourcing</span>
            <h1>Source smarter products from China without the stress.</h1>
            <p>
              Vaseous Global helps shoppers in Nigeria discover reliable pre-order items, ask questions on WhatsApp,
              and receive shipping guidance from sourcing to delivery.
            </p>
            <div className="hero-actions">
              <a href="#how-it-works" className="btn btn-primary">
                Explore How It Works
                <ArrowRight size={16} />
              </a>
              <button type="button" className="btn btn-success" onClick={handleCommunityClick}>
                <MessageCircle size={16} />
                Join WhatsApp Group
              </button>
            </div>
            <div className="hero-trust">
              <div>
                <strong>WhatsApp-first</strong>
                <span>Direct vendor chat</span>
              </div>
              <div>
                <strong>Custom sourcing</strong>
                <span>Photo or description</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card primary-card">
              <div className="logo-hero-wrap">
                <img src={businessConfig.logoPath} alt="Vaseous logo" className="hero-logo" />
              </div>
              <div className="mini-badge">
                <Sparkles size={18} />
                New drops
              </div>
              <div className="product-stack">
                <div className="stack-item fashion-item">Fashion</div>
                <div className="stack-item shoes-item">Shoes</div>
                <div className="stack-item bag-item">Bags</div>
              </div>
              <div className="visual-footer">
                <div>
                  <span className="meta-label">Category</span>
                  <strong>Pre-order curated picks</strong>
                </div>
                <button type="button" className="icon-pill" onClick={() => openWhatsAppChat('Hi Vaseous, I want to discover current pre-order products.')}>Ask on WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">Why choose Vaseous</span>
            <h2>Simple sourcing without the usual confusion.</h2>
          </div>
          <div className="info-grid">
            {valuePillars.map((pillar) => (
              <div className="info-card" key={pillar}>
                <CheckCircle2 size={18} className="icon-positive" />
                <p>{pillar}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Product categories</span>
            <h2>Browse what you can source with Vaseous.</h2>
          </div>
          <div className="category-grid">
            {categoryCatalog.map((category) => (
              <article key={category.id} className="category-card">
                <div className="category-visual" aria-label={category.name}>
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-body">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <button type="button" className="text-link" onClick={() => handleCategoryClick(category.name)}>
                    Ask about this category
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section light-section">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">How pre-order works</span>
            <h2>A clear process from discovery to delivery.</h2>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={step}>
                <span className="step-number">0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container dual-cta-grid">
          <div className="cta-panel direct-cta">
            <div className="cta-icon">
              <MessageCircle size={24} />
            </div>
            <h3>Chat with Vaseous directly</h3>
            <p>Ideal for custom requests, product questions, pricing confirmations, and placing your order.</p>
            <button type="button" className="btn btn-primary" onClick={() => openWhatsAppChat(businessConfig.contactMessage)}>
              Chat on WhatsApp
            </button>
          </div>

          <div className="cta-panel community-cta">
            <div className="cta-icon">
              <PackageCheck size={24} />
            </div>
            <h3>Join the product community</h3>
            <p>Browse current pre-order drops, product updates, and follow the sourcing process at your pace.</p>
            <button type="button" className="btn btn-success" onClick={handleCommunityClick}>
              Join WhatsApp Group
            </button>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container subscribe-grid">
          <div>
            <span className="eyebrow">Stay updated</span>
            <h2>Get product drop updates and sourcing news.</h2>
            <p>
              Join the mailing list for new pre-order product updates. You will only receive updates if you explicitly opt in.
            </p>
          </div>

          <form className="subscribe-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <label>
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label>
              <span>Category interest</span>
              <select name="categoryInterest" value={formData.categoryInterest} onChange={handleChange}>
                {categoryCatalog.map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </label>

            <label className="checkbox-line">
              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
              <span>I agree to receive product updates and marketing emails from Vaseous Global.</span>
            </label>

            {submitState.message ? (
              <div className={`form-message ${submitState.type === 'error' ? 'error' : 'success'}`}>
                {submitState.message}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary full-width">
              Subscribe now
            </button>

            <div className="whatsapp-link-row">
              <button type="button" className="btn btn-success" onClick={handleCommunityClick}>
                <ShieldCheck size={16} />
                Join WhatsApp community
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container faq-wrap">
          <div className="section-header">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions before you order.</h2>
          </div>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div className={`faq-item ${expandedFaq === index ? 'open' : ''}`} key={item.question}>
                <button type="button" className="faq-trigger" onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}>
                  <span>{item.question}</span>
                  <ChevronDown size={18} />
                </button>
                {expandedFaq === index ? <p className="faq-answer">{item.answer}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
