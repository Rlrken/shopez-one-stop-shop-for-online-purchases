import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const PAYMENT_OPTIONS = [
  { value: 'Cash on Delivery', icon: '💵', label: 'Cash on Delivery' },
  { value: 'GCash',            icon: '📱', label: 'GCash' },
  { value: 'PayMaya',          icon: '💳', label: 'PayMaya' },
  { value: 'Bank Transfer',    icon: '🏦', label: 'Bank Transfer' },
  { value: 'Credit/Debit Card',icon: '💰', label: 'Card' },
];

export default function Checkout() {
  const { user }                    = useAuth();
  const { cart, total, clearCart }  = useCart();
  const navigate                    = useNavigate();
  const location                    = useLocation();

  const singleProduct = location.state?.product;
  const orderItems    = singleProduct ? [{ ...singleProduct, quantity: 1 }] : cart;
  const orderTotal    = singleProduct ? singleProduct.price : total;

  const [form, setForm] = useState({
    shippingAddress: '',
    paymentMethod: 'Cash on Delivery',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.shippingAddress) { setError('Shipping address is required.'); return; }

    try {
      setLoading(true);
      const products = orderItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      await createOrder({
        userId: user._id,
        products,
        shippingAddress: form.shippingAddress,
        paymentMethod: form.paymentMethod,
        totalAmount: orderTotal,
      });
      if (!singleProduct) clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success State ── */
  if (success) {
    return (
      <div className="checkout-page">
        <div className="success-wrap">
          <div className="success-card">
            <div className="success-card-top">
              <span className="success-icon">🎉</span>
              <h2 className="success-title">ORDER <span className="hl">PLACED!</span></h2>
              <p>Thank you for shopping with us. You'll receive a confirmation shortly.</p>
            </div>
            <div className="success-card-body">
              <div className="success-details">
                <div className="s-row">
                  <span>Payment Method</span>
                  <span>{form.paymentMethod}</span>
                </div>
                <div className="s-row">
                  <span>Total Amount</span>
                  <span className="total-amt">₱{orderTotal.toLocaleString()}</span>
                </div>
              </div>
              <button className="btn-continue" onClick={() => navigate('/products')}>
                Continue Shopping →
              </button>
              <button className="btn-outline-ink" onClick={() => navigate('/profile')}>
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Checkout Form ── */
  return (
    <div className="checkout-page">

      {/* Hero Header */}
      <header className="checkout-hero">
        <span className="checkout-hero-bgword">CHECKOUT</span>
        <div className="checkout-hero-inner">
          <div>
            <div className="checkout-hero-tag">Secure Order</div>
            <h1 className="checkout-page-title">
              CHECK<span className="hl-yellow">OUT</span>
            </h1>
            <p className="checkout-page-sub">Fill in your details and place your order below.</p>
          </div>
          <div className="checkout-steps">
            <div className="checkout-step active">
              <span className="checkout-step-num">1</span>
              Details
            </div>
            <div className="checkout-step">
              <span className="checkout-step-num">2</span>
              Confirm
            </div>
            <div className="checkout-step">
              <span className="checkout-step-num">3</span>
              Done
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="checkout-content">
        <div className="checkout-layout">

          {/* ── Delivery Form ── */}
          <div className="checkout-form-card">
            <div className="card-header">
              <h3>DELIVERY <span>DETAILS</span></h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="co-form">
                <div className="form-group">
                  <label>Shipping Address</label>
                  <textarea
                    className="input-field"
                    name="shippingAddress"
                    rows={3}
                    placeholder="Enter your full delivery address…"
                    value={form.shippingAddress}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <div className="payment-options">
                    {PAYMENT_OPTIONS.map((opt) => (
                      <div
                        key={opt.value}
                        className={`payment-opt ${form.paymentMethod === opt.value ? 'selected' : ''}`}
                        onClick={() => { setForm({ ...form, paymentMethod: opt.value }); setError(''); }}
                      >
                        <span className="payment-opt-icon">{opt.icon}</span>
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>

                {error && <p className="error-msg">⚠️ {error}</p>}

                <button type="submit" className="btn-place-order" disabled={loading}>
                  {loading ? 'Placing Order…' : '✓ Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="checkout-summary-card">
            <div className="card-header">
              <h3>ORDER <span>SUMMARY</span></h3>
            </div>
            <div className="co-items">
              {orderItems.map((item) => (
                <div className="co-item" key={item._id}>
                  <div className="co-item-img">
                    {item.image ? <img src={item.image} alt={item.name} /> : '🛍️'}
                  </div>
                  <div className="co-item-info">
                    <p className="co-item-name">{item.name}</p>
                    <p className="co-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <span className="co-item-price">₱{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="co-total-row">
              <span className="co-total-label">Total</span>
              <span className="co-total-amount">₱{orderTotal.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}