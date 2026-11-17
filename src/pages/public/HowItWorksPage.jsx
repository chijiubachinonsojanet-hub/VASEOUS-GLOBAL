const steps = [
  'Discover products from the Vaseous catalog, categories, or a custom product request.',
  'Choose the item you want and share your exact preference, style, or quantity.',
  'Contact Vaseous on WhatsApp to ask questions and confirm availability or sourcing options.',
  'Receive pricing details and payment instructions from the team after your enquiry.',
  'Confirm the order and send payment according to the agreed instructions.',
  'Vaseous starts sourcing the item directly from China and keeps you updated along the way.',
  'The product is shipped to Nigeria and tracked until it reaches your destination.',
  'Receive your order and contact Vaseous again for your next pre-order or custom request.',
];

function HowItWorksPage() {
  return (
    <div className="static-page section">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">How it works</span>
          <h1>From discovery to delivery in eight clear steps.</h1>
        </div>

        <div className="steps-grid large-steps">
          {steps.map((step, index) => (
            <div className="step-card" key={step}>
              <span className="step-number">0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;
