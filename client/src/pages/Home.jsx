import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const features = [
  { icon: '🔍', title: 'Easy Discovery',  desc: 'Browse thousands of products with smart filters built for real humans.' },
  { icon: '🛒', title: 'Simple Cart',      desc: 'Add items and checkout in a few clicks — zero friction, maximum speed.' },
  { icon: '🔐', title: 'Secure Checkout',  desc: 'End-to-end encryption. Your data and payments are locked down, always.' },
  { icon: '📦', title: 'Order Tracking',   desc: 'Real-time updates from placement to delivery, right in your pocket.' },
];

const reviews = [
  { stars: '★★★★★', text: 'Fastest checkout I have ever experienced. Took me 45 seconds from cart to confirmation.', meta: 'ANNA K. — VERIFIED BUYER' },
  { stars: '★★★★★', text: 'The search actually finds what I am looking for. Revolutionary concept, honestly.',         meta: 'JAMES O. — VERIFIED BUYER' },
  { stars: '★★★★★', text: 'Order tracking is legit. I watched my package move across the country in real time.',     meta: 'PRIYA M. — VERIFIED BUYER' },
];

const marqueeItems = [
  'Free Shipping Over ₱500', 'New Arrivals Daily', '10,000+ Products',
  '5-Star Reviews', 'Secure Payments', 'Easy Returns', '24/7 Support',
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-tag">Live Now — Shop Smarter</span>
          <h1 className="hero-title">
            Stop <span className="hl-yellow">Searching.</span><br />
            Start <span className="hl-red">Finding.</span>
          </h1>
          <p className="hero-subtitle">
            Thousands of products. Zero confusion. Built for people who know
            what they want — and people still figuring it out.
          </p>
          <div className="hero-ctas">
            <Link to="/products" className="btn-hero-primary">Shop Now →</Link>
            {!user && <Link to="/register" className="btn-hero-ghost">Join Free</Link>}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        {[['10K+','Products'],['5K+','Shoppers'],['100%','Secure'],['24/7','Support']].map(([n,l]) => (
          <div className="stat-item" key={l}>
            <span className="stat-num">{n}</span>
            <span className="stat-label">{l}</span>
          </div>
        ))}
      </div>

      {/* ── Marquee ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="marquee-item" key={i}>
              {item}<span className="mdot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="features">
        <p className="section-eyebrow">Why ShopEZ</p>
        <h2 className="section-title">Built for <span className="hl">real people.</span></h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="proof-strip">
        <div className="proof-inner">
          <div>
            <div className="proof-quote-mark">"</div>
            <p className="proof-quote">
              ShopEZ completely changed how I buy things online. It's fast,
              simple, and somehow always knows what I'm looking for.
            </p>
            <div className="proof-author">
              <div className="proof-avatar">MR</div>
              <div>
                <p className="proof-name">Maria Reyes</p>
                <p className="proof-role">Verified Customer · 3 years shopping</p>
              </div>
            </div>
          </div>

          <div className="proof-reviews">
            {reviews.map((r, i) => (
              <div className="review-card" key={i}>
                <div className="review-stars">{r.stars}</div>
                <p className="review-text">{r.text}</p>
                <p className="review-meta">{r.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="cta-inner">
          <div>
            <p className="cta-label">Ready when you are</p>
            <h2>Your next favorite<br />thing is waiting.</h2>
            <p>
              Join thousands of satisfied shoppers. No fluff, no gimmicks —
              just great products and a checkout that actually works.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/products" className="btn-cta-dark">Browse Products →</Link>
            {!user && <Link to="/register" className="btn-cta-outline">Create Free Account</Link>}
          </div>
        </div>
      </section>

    </div>
  );
}