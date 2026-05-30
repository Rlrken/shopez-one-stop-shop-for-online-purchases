import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="page-container" style={{ padding: '60px 20px' }}>
        <div className="empty-state">
          <div className="icon">🔐</div>
          <h3>Please login to view your cart</h3>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: '16px' }}>Login</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-container" style={{ padding: '60px 20px' }}>
        <div className="empty-state">
          <div className="icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Start shopping to add items to your cart.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '16px' }}>Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-container">
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item card" key={item._id}>
              <div className="cart-item-img">
                {item.image
                  ? <img src={item.image} alt={item.name} />
                  : <span>🛍️</span>}
              </div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                {item.category && <span className="badge badge-purple">{item.category}</span>}
                <p className="cart-item-price">₱{item.price?.toLocaleString()}</p>
              </div>
              <div className="cart-item-actions">
                <div className="qty-ctrl">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <p className="item-subtotal">₱{(item.price * item.quantity).toLocaleString()}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary card">
          <h3>Order Summary</h3>
          <div className="summary-rows">
            {cart.map((item) => (
              <div className="summary-row" key={item._id}>
                <span>{item.name} × {item.quantity}</span>
                <span>₱{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₱{total.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
            onClick={() => navigate('/checkout')}>
            Proceed to Checkout →
          </button>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
            onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
