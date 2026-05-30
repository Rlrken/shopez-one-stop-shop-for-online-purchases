import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const features = [
  { icon: '🔍', title: 'Easy Discovery', desc: 'Browse thousands of products with smart filters and search.' },
  { icon: '🛒', title: 'Simple Cart', desc: 'Add items and checkout in just a few clicks.' },
  { icon: '🔐', title: 'Secure Checkout', desc: 'Your data and payments are always protected.' },
  { icon: '📦', title: 'Order Tracking', desc: 'Stay updated on every order from placement to delivery.' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content page-container">
          <div className="hero-text">
            <span className="hero-tag badge badge-orange">✨ Effortless Shopping</span>
            <h1 className="hero-title">
              Your one-stop<br />
              <span className="highlight">shopping</span> destination
            </h1>
            <p className="hero-subtitle">
              Discover amazing products, enjoy personalized recommendations,
              and experience a seamless checkout — all in one place.
            </p>
            <div className="hero-ctas">
              <Link to="/products" className="btn btn-primary hero-btn">
                🛍️ Shop Now
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-secondary hero-btn">
                  Join Free
                </Link>
              )}
            </div>
          </div>
          <div className="hero-graphic">
            <div className="graphic-circle c1">🛍️</div>
            <div className="graphic-circle c2">⭐</div>
            <div className="graphic-circle c3">💳</div>
            <div className="graphic-circle c4">📦</div>
            <div className="graphic-main">🎁</div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="page-container stats-inner">
          <div className="stat-item">
            <span className="stat-num">10K+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">5K+</span>
            <span className="stat-label">Happy Shoppers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">Secure</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features page-container">
        <h2 className="section-title">Why choose <span className="highlight">ShopEZ?</span></h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner page-container">
        <div className="cta-inner">
          <h2>Ready to start shopping?</h2>
          <p>Join thousands of satisfied customers today.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
            {!user && <Link to="/register" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Create Account</Link>}
          </div>
        </div>
      </section>
    </div>
  );
}
