import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort]         = useState('default');

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getProducts();
      setProducts(data.products || []);
    } catch {
      setError('Failed to load products. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filtered = products
    .filter((p) => {
      const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || p.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === 'price-asc')  return (a.price ?? 0) - (b.price ?? 0);
      if (sort === 'price-desc') return (b.price ?? 0) - (a.price ?? 0);
      if (sort === 'name-asc')   return a.name.localeCompare(b.name);
      if (sort === 'name-desc')  return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="products-page">

      {/* ── Page Hero Header ── */}
      <header className="products-hero">
        <span className="products-hero-bgword">SHOP</span>
        <div className="products-hero-inner">
          <div className="products-hero-left">
            <div className="page-tag">Catalogue</div>
            <h1 className="page-title">
              ALL&nbsp;<span className="hl-yellow">PROD</span><span className="hl-red">UCTS</span>
            </h1>
            <p className="page-subtitle">
              Browse our full collection — filter by category or search to find exactly what you need.
            </p>
          </div>
          {!loading && (
            <div className="products-count-badge">
              <span className="count-num">{filtered.length}</span>
              <span className="count-label">Items</span>
            </div>
          )}
        </div>
      </header>

      {/* ── Filters Bar ── */}
      <div className="filters-bar">
       <div className="filters-bar-inner">
        <div className="filters-search-wrap">
          <span className="filters-search-label">Search</span>
          <input
            className="search-input"
            placeholder="Type a product name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filters-sort-wrap">
          <span className="filters-sort-label">Sort</span>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </div>
       </div>
      </div>

      {/* ── Content ── */}
      <div className="products-content">
        {loading && (
          <div className="loader"><div className="spinner" /></div>
        )}

        {error && (
          <div className="alert-error">⚠️ {error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h3>No Products Found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}