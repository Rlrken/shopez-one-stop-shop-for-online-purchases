import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const itemCount   = cart.reduce((s, i) => s + i.quantity, 0);
  const uniqueItems = cart.length;

  if (!user) {
    return (
      <div className="cart-page cart-empty-wrap">
        <div className="empty-state">
          <div className="icon">🔐</div>
          <h3>LOGIN REQUIRED</h3>
          <p>Please log in to view and manage your cart.</p>
          <Link to="/login" className="btn-primary-pill">Login →</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-empty-wrap">
        <div className="empty-state">
          <div className="icon">🛒</div>
          <h3>CART IS EMPTY</h3>
          <p>Start shopping to add items to your cart.</p>
          <Link to="/products" className="btn-primary-pill" style={{ marginTop: '16px' }}>Browse Products →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* ── Hero Header ── */}
      <header className="cart-hero">
        <span className="cart-hero-bgword">CART</span>
        <div className="cart-hero-content">
          <div className="cart-hero-top">
            <div>
              <div className="cart-hero-label">Shopping Cart</div>
              <h1 className="cart-page-title">
                YOUR <span className="hl-yellow">BAG</span>
              </h1>
              <p className="cart-page-sub">Review your items and proceed to checkout.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="cart-stats">
            <div className="cart-stat">
              <span className="stat-lbl">Items</span>
              <span className="stat-val">{uniqueItems}</span>
            </div>
            <div className="cart-stat">
              <span className="stat-lbl">Qty Total</span>
              <span className="stat-val">{itemCount}</span>
            </div>
            <div className="cart-stat">
              <span className="stat-lbl">Total</span>
              <span className="stat-val">₱{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="cart-content">
        <div className="cart-layout">

          {/* Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <span>{cart.length} product{cart.length !== 1 ? 's' : ''}</span>
              <span>Subtotal</span>
            </div>

            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-img">
                  {item.image
                    ? <img src={item.image} alt={item.name} />
                    : <span>🛍️</span>}
                </div>

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  {item.category && (
                    <span className="badge badge-purple">{item.category}</span>
                  )}
                  <p className="cart-item-price">₱{item.price?.toLocaleString()}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="qty-ctrl">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="item-subtotal">₱{(item.price * item.quantity).toLocaleString()}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)} title="Remove item">🗑️</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <div className="cart-summary-header">
              <h3>ORDER <span>SUMMARY</span></h3>
            </div>

            <div className="cart-summary-body">
              <div className="summary-rows">
                {cart.map((item) => (
                  <div className="summary-row" key={item._id}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="summary-total">
                <span className="summary-total-lbl">Grand Total</span>
                <span className="summary-total-val">₱{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="cart-summary-footer">
              <button className="btn-checkout" onClick={() => navigate('/checkout')}>
                Proceed to Checkout →
              </button>
              <button className="btn-clear" onClick={clearCart}>
                🗑️ Clear Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}