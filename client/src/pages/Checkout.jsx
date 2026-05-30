import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Could come from single product "Shop Now"
  const singleProduct = location.state?.product;

  const orderItems = singleProduct
    ? [{ ...singleProduct, quantity: 1 }]
    : cart;

  const orderTotal = singleProduct ? singleProduct.price : total;

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

  if (success) {
    return (
      <div className="checkout-page page-container">
        <div className="success-card card">
          <div className="success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with ShopEZ. You'll receive a confirmation shortly.</p>
          <div className="success-details">
            <div className="s-row"><span>Payment Method</span><span>{form.paymentMethod}</span></div>
            <div className="s-row"><span>Total Amount</span><span className="total-amt">₱{orderTotal.toLocaleString()}</span></div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/products')} style={{ justifyContent: 'center' }}>
            Continue Shopping
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/profile')} style={{ justifyContent: 'center', marginTop: '8px' }}>
            View Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-container">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Form */}
        <div className="checkout-form card">
          <h3>📍 Delivery Details</h3>
          <form onSubmit={handleSubmit} className="co-form">
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea
                className="input-field"
                name="shippingAddress"
                rows={3}
                placeholder="Enter your full delivery address..."
                value={form.shippingAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select
                className="input-field"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
              >
                <option>Cash on Delivery</option>
                <option>GCash</option>
                <option>PayMaya</option>
                <option>Bank Transfer</option>
                <option>Credit/Debit Card</option>
              </select>
            </div>
            {error && <p className="error-msg">⚠️ {error}</p>}
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Placing Order...' : '✅ Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary card">
          <h3>🛍️ Order Summary</h3>
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
          <div className="co-total">
            <span>Total</span>
            <span>₱{orderTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
