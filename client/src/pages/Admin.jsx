import { useState, useEffect } from 'react';
import { getProducts, addProduct, getOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const statusColors = {
  pending:    'badge-yellow',
  processing: 'badge-orange',
  shipped:    'badge-purple',
  delivered:  'badge-green',
};

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab]         = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);

  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: '', image: ''
  });
  const [adding, setAdding]   = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  useEffect(() => {
    if (!user || !isAdmin) { navigate('/'); return; }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pRes, oRes] = await Promise.all([getProducts(), getOrders()]);
      setProducts(pRes.data.products || []);
      setOrders(oRes.data.orders || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setAddError('');
    setAddSuccess('');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) { setAddError('Name and price are required.'); return; }

    try {
      setAdding(true);
      await addProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock) || 0,
        image: form.image,
      });
      setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
      setAddSuccess('✅ Product added successfully!');
      fetchData();
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to add product.');
    } finally {
      setAdding(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="admin-page page-container">
      <div className="admin-header">
        <h1 className="page-title">⚙️ Admin Dashboard</h1>
        <div className="admin-stats">
          <div className="admin-stat">
            <span className="stat-val">{products.length}</span>
            <span className="stat-lbl">Products</span>
          </div>
          <div className="admin-stat">
            <span className="stat-val">{orders.length}</span>
            <span className="stat-lbl">Orders</span>
          </div>
          <div className="admin-stat">
            <span className="stat-val">
              ₱{orders.reduce((s, o) => s + (o.totalAmount || 0), 0).toLocaleString()}
            </span>
            <span className="stat-lbl">Revenue</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={`tab-btn ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>
          📦 Products
        </button>
        <button className={`tab-btn ${tab === 'add' ? 'active' : ''}`} onClick={() => setTab('add')}>
          ➕ Add Product
        </button>
        <button className={`tab-btn ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
          🧾 All Orders
        </button>
      </div>

      {loading && <div className="loader"><div className="spinner" /></div>}

      {/* Products Tab */}
      {!loading && tab === 'products' && (
        <div className="admin-products">
          {products.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📦</div>
              <h3>No products yet</h3>
              <p>Add your first product using the Add Product tab.</p>
            </div>
          ) : (
            <div className="admin-table-wrap card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <div className="prod-cell">
                          <div className="prod-thumb">
                            {p.image ? <img src={p.image} alt={p.name} /> : '🛍️'}
                          </div>
                          <div>
                            <p className="prod-name">{p.name}</p>
                            <p className="prod-desc-sm">{p.description?.slice(0, 50)}...</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-purple">{p.category || '—'}</span></td>
                      <td><strong>₱{p.price?.toLocaleString()}</strong></td>
                      <td>
                        <span className={`badge ${p.stock > 0 ? 'badge-green' : 'badge-orange'}`}>
                          {p.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add Product Tab */}
      {tab === 'add' && (
        <div className="add-product-wrap">
          <div className="card add-product-card">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct} className="add-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input className="input-field" name="name" placeholder="e.g. Gold Bracelet" value={form.name} onChange={handleFormChange} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input className="input-field" name="category" placeholder="e.g. Jewelry" value={form.category} onChange={handleFormChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="input-field" name="description" rows={3} placeholder="Describe the product..." value={form.description} onChange={handleFormChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₱) *</label>
                  <input className="input-field" name="price" type="number" min="0" placeholder="0.00" value={form.price} onChange={handleFormChange} />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input className="input-field" name="stock" type="number" min="0" placeholder="0" value={form.stock} onChange={handleFormChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input className="input-field" name="image" placeholder="https://..." value={form.image} onChange={handleFormChange} />
              </div>
              {addError   && <p className="error-msg">⚠️ {addError}</p>}
              {addSuccess && <p style={{ color: 'var(--success)', fontSize: '0.875rem' }}>{addSuccess}</p>}
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={adding}>
                {adding ? 'Adding...' : '➕ Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {!loading && tab === 'orders' && (
        <div className="admin-orders">
          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🧾</div>
              <h3>No orders yet</h3>
            </div>
          ) : (
            <div className="admin-table-wrap card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td><code>#{o._id.slice(-8).toUpperCase()}</code></td>
                      <td>{o.userId?.username || '—'}</td>
                      <td>{o.products?.length}</td>
                      <td><strong>₱{o.totalAmount?.toLocaleString()}</strong></td>
                      <td>{o.paymentMethod}</td>
                      <td><span className={`badge ${statusColors[o.status] || 'badge-orange'}`}>{o.status}</span></td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
