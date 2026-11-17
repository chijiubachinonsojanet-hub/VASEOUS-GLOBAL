import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { businessConfig, categoryCatalog } from '../../config/businessConfig';
import { saveSubscriber } from '../../lib/crmStore';
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

const featuredProducts = [
  {
    name: 'Aesthetic Scarf Set',
    category: 'Fashion & Style',
    image: 'https://i.etsystatic.com/52149613/r/il/9fc67f/8108601653/il_fullxfull.8108601653_ft43.jpg',
  },
  {
    name: 'Women’s Statement Heels',
    category: 'Shoes & Accessories',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Stanley Cup Collection',
    category: 'Kitchen & Lifestyle',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ1sSyzP5f-wBpN3BuBYNMBV8hJOOUWCXZnT1TIdI-TF7xvYTcdIwidD20YZygjsP89anbfIiiNrdtWBPkRcySD1137EoRFHkdR99b0d63DJv1L2gHtrZy0E_wC&usqp=CAc',
  },
  {
    name: 'Crystal Bracelet',
    category: 'Accessories',
    image: 'https://image.made-in-china.com/202f0j00deJWiaqBMYbj/OEM-ODM-All-Types-of-Jewelries-Alloly-Brass-925-Sterling-Silver-Stainless-Steel-Jewelry-Necklaces-Bracelets-Earrings-Jewelry.webp',
  },
];

const serviceBlocks = [
  {
    title: 'Sourcing',
    description: 'Send us a link, photo or description and we find the best option from China.',
  },
  {
    title: 'Bulk & Retail',
    description: 'Wholesale quantities for resellers, boutiques and repeat business buyers.',
  },
  {
    title: 'Customization',
    description: 'Private branding and custom requests for gifts, souvenir pieces, and business orders.',
  },
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

    try {
      const result = await saveSubscriber({
        firstName: formData.firstName.trim(),
        email,
        categoryInterest: formData.categoryInterest,
        consent: true,
      });

      if (!result.ok) {
        if (result.reason === 'duplicate') {
          setSubmitState({ type: 'error', message: 'This email is already subscribed to Vaseous updates.' });
          return;
        }
        throw new Error('Subscriber could not be saved.');
      }

      setSubmitState({
        type: 'success',
        message: result.source === 'supabase'
          ? 'You are subscribed successfully. Keep an eye on your inbox and the WhatsApp community for new pre-order drops.'
          : 'Your subscription was saved locally and will appear in the CRM dashboard for follow-up.',
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
            <h1>Your finds. Our sourcing. Your doorstep.</h1>
            <p>
              Shop selected products from China or send us a link, photo or description for a custom sourcing quote.
              We help you discover, compare and order with fewer hassles and more confidence.
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
                <strong>Verified</strong>
                <span>Supplier sourcing</span>
              </div>
              <div>
                <strong>Fast</strong>
                <span>Direct WhatsApp updates</span>
              </div>
              <div>
                <strong>Local</strong>
                <span>Delivery across Nigeria</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="hero-photo-stack">
                <img
                  src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSwo_RjmAWxDLF_-6UjPSKsoVRdShy3FyMaMHtpGbYMq3As5L-CgcQxv8RTZxn2csL9Rb5D4BZe9rcRGdkzfswyHwhJIRPNJxtHHBOovsu5&usqp=CAc"
                  alt="Fashion set product"
                  className="hero-photo hero-photo-one"
                />
                <img
                  src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80"
                  alt="Women’s heels product"
                  className="hero-photo hero-photo-two"
                />
              </div>
              <div className="hero-floating-badge">
                <div className="logo-hero-wrap">
                  <img src={businessConfig.logoPath} alt="Vaseous logo" className="hero-logo" />
                </div>
                <div>
                  <span>Pre-order picks</span>
                  <strong>Selected this week</strong>
                </div>
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
          <div className="section-header before-grid-header">
            <span className="eyebrow">Shop by category</span>
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

      <section className="section light-section">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">Featured pre-orders</span>
            <h2>Popular picks for this week.</h2>
          </div>
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <article key={product.name} className="product-card">
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />
                  <span className="product-tag">Pre-order</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <span className="custom-price-pill">Custom price</span>
                    <button type="button" onClick={() => openWhatsAppChat(`Hi Vaseous, I want to enquire about ${product.name}.`)}>
                      Ask about it
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container service-wrap">
          <div className="section-header centered">
            <span className="eyebrow">Our services</span>
            <h2>More than a store — a sourcing partner for individuals and businesses.</h2>
          </div>
          <div className="service-grid">
            {serviceBlocks.map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-icon">✓</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
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
        <div className="container request-panel">
          <div>
            <span className="eyebrow">Need something specific?</span>
            <h2>Send us a photo, product link or description and we will quote it for you.</h2>
          </div>
          <div className="request-panel-actions">
            <button type="button" className="btn btn-primary" onClick={() => openWhatsAppChat('Hi Vaseous, I want a custom sourcing quote.')}>Request an item</button>
            <button type="button" className="btn btn-ghost" onClick={handleCommunityClick}>Join WhatsApp group</button>
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
