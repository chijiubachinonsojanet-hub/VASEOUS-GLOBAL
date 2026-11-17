import { ShieldCheck, Sparkles, Target } from 'lucide-react';

const values = [
  {
    title: 'Clear sourcing guidance',
    icon: Target,
    text: 'Vaseous Global makes the process of buying from China easier by guiding customers through each step, from product discovery to payment and delivery updates.',
  },
  {
    title: 'Trust-first communication',
    icon: ShieldCheck,
    text: 'Every product conversation is handled through direct WhatsApp communication so customers can ask questions, confirm details, and understand pricing before committing.',
  },
  {
    title: 'No complicated storefront pressure',
    icon: Sparkles,
    text: 'The platform is built around pre-order discovery and direct contact, helping shoppers choose items without unnecessary friction or pressure.',
  },
];

function AboutPage() {
  return (
    <div className="static-page section">
      <div className="container narrow-container">
        <span className="eyebrow">About Vaseous</span>
        <h1>Helping Nigerians shop from China with more confidence.</h1>
        <p>
          Vaseous Global was created to simplify the busy, stressful process of sourcing products from China. Instead of making customers figure out suppliers, shipping, and product coordination alone, we provide a friendlier way to discover products, ask questions, and confirm how a pre-order will work.
        </p>

        <div className="feature-stack">
          {values.map(({ title, icon: Icon, text }) => (
            <div className="feature-box" key={title}>
              <div className="feature-icon">
                <Icon size={18} />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
