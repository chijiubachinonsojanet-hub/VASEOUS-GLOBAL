import { ArrowRight } from 'lucide-react';
import { categoryCatalog } from '../../config/businessConfig';
import { openWhatsAppChat } from '../../utils/whatsapp';

function CategoriesPage() {
  return (
    <div className="static-page section">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">Categories</span>
          <h1>Explore the categories Vaseous can source for you.</h1>
        </div>

        <div className="category-grid detail-grid">
          {categoryCatalog.map((category) => (
            <article className="category-card detail-card" key={category.id}>
              <div className="category-visual" aria-label={category.name}>
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-body">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <button
                  type="button"
                  className="btn btn-primary small-btn"
                  onClick={() => openWhatsAppChat(`Hi Vaseous, I want to enquire about ${category.name}.`)}
                >
                  Ask about this product
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
