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

  const totalSpent = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const delivered  = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="profile-page">

      {/* ── Hero Header ── */}
      <header className="profile-hero">
        <span className="profile-hero-bgword">PROFILE</span>
        <div className="profile-hero-inner">
          <div className="profile-hero-top">
            <div className="profile-avatar">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="profile-info">
              <div className="profile-hero-tag">
                {user?.role === 'admin' ? '⚙️ Admin' : '👤 Member'}
              </div>
              <h1 className="profile-username">{user?.username}</h1>
              <p className="profile-email">{user?.email}</p>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              Sign Out →
            </button>
          </div>

          {/* Stats strip */}
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-lbl">Total Orders</span>
              <span className="profile-stat-val">{orders.length}</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-lbl">Total Spent</span>
              <span className="profile-stat-val">₱{totalSpent.toLocaleString()}</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-lbl">Delivered</span>
              <span className="profile-stat-val">{delivered}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="profile-content">
        <h2 className="section-heading">MY <span className="hl">ORDERS</span></h2>

        {loading && <div className="loader"><div className="spinner" /></div>}

        {!loading && orders.length === 0 && (
          <div className="empty-state">
            <div className="icon">📦</div>
            <h3>No Orders Yet</h3>
            <p>Your order history will appear here once you make a purchase.</p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>

                {/* Card Header */}
                <div className="order-card-header">
                  <span className="order-id">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                  <span className={`badge ${statusColors[order.status] || 'badge-orange'}`}>
                    {order.status}
                  </span>
                </div>

                {/* Card Body */}
                <div className="order-card-body">
                  <div className="order-detail">
                    <span className="order-detail-lbl">Ship to</span>
                    <span className="order-detail-val">{order.shippingAddress}</span>
                  </div>
                  <div className="order-detail">
                    <span className="order-detail-lbl">Payment</span>
                    <span className="order-detail-val">{order.paymentMethod}</span>
                  </div>
                  <div className="order-detail">
                    <span className="order-detail-lbl">Items</span>
                    <span className="order-detail-val">{order.products?.length} item(s)</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="order-card-footer">
                  <span className="order-total-lbl">Order Total</span>
                  <span className="order-total-val">₱{order.totalAmount?.toLocaleString()}</span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}