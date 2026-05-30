import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/api';
import './Profile.css';

const statusColors = {
  pending:    'badge-yellow',
  processing: 'badge-orange',
  shipped:    'badge-purple',
  delivered:  'badge-green',
};

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data } = await getOrders();
      // Filter only this user's orders
      const myOrders = (data.orders || []).filter(
        (o) => o.userId?._id === user._id || o.userId === user._id
      );
      setOrders(myOrders);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="profile-page page-container">
      {/* Profile Header */}
      <div className="profile-header card">
        <div className="profile-avatar">
          {user?.username?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="profile-info">
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <span className={`badge ${user?.role === 'admin' ? 'badge-purple' : 'badge-orange'}`}>
            {user?.role}
          </span>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
      </div>

      {/* Orders */}
      <div className="profile-orders">
        <h2 className="section-heading">📦 My Orders</h2>

        {loading && <div className="loader"><div className="spinner" /></div>}

        {!loading && orders.length === 0 && (
          <div className="empty-state">
            <div className="icon">📦</div>
            <h3>No orders yet</h3>
            <p>Your order history will appear here.</p>
          </div>
        )}

        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card card" key={order._id}>
              <div className="order-header">
                <div>
                  <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</p>
                </div>
                <span className={`badge ${statusColors[order.status] || 'badge-orange'}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-body">
                <div className="order-detail">
                  <span>📍 Ship to</span>
                  <span>{order.shippingAddress}</span>
                </div>
                <div className="order-detail">
                  <span>💳 Payment</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="order-detail">
                  <span>🛍️ Items</span>
                  <span>{order.products?.length} item(s)</span>
                </div>
              </div>

              <div className="order-total">
                <span>Total</span>
                <span>₱{order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
