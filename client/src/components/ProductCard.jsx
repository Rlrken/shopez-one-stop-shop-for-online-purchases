import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) { navigate('/login'); return; }
    addToCart(product);
  };

  const handleShopNow = () => {
    if (!user) { navigate('/login'); return; }
    navigate(`/checkout/${product._id}`, { state: { product } });
  };

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-img" />
        ) : (
          <div className="product-img-placeholder">🛍️</div>
        )}
        {product.category && (
          <span className="product-category badge badge-purple">{product.category}</span>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}
        <div className="product-footer">
          <span className="product-price">₱{product.price?.toLocaleString()}</span>
          <span className="product-stock">{product.stock > 0 ? `${product.stock} left` : 'Out of stock'}</span>
        </div>

        <div className="product-actions">
          <button
            className="btn btn-outline product-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            🛒 Add to Cart
          </button>
          <button
            className="btn btn-primary product-btn"
            onClick={handleShopNow}
            disabled={product.stock === 0}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
