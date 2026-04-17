'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [categoryCount, setCategoryCount] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products'),
        ]);

        if (catRes.ok) {
          const cats = await catRes.json();
          setCategoryCount(Array.isArray(cats) ? cats.length : 0);
        }
        if (prodRes.ok) {
          const prods = await prodRes.json();
          setProductCount(Array.isArray(prods) ? prods.length : 0);
        }
      } catch {
        // Stats will stay null
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <>
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <h3>Categories</h3>
          <div className="stat-value">
            {loading ? '...' : categoryCount !== null ? categoryCount : '--'}
          </div>
        </div>

        <div className="admin-stat-card">
          <h3>Products</h3>
          <div className="stat-value">
            {loading ? '...' : productCount !== null ? productCount : '--'}
          </div>
        </div>

        <div className="admin-stat-card">
          <h3>Shipping Rate</h3>
          <div className="stat-value">8 TND</div>
        </div>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3>Quick Actions</h3>
        </div>
        <div style={{ padding: '24px', display: 'flex', gap: '12px' }}>
          <Link href="/admin/categories" className="admin-btn">
            Manage Categories
          </Link>
          <Link href="/admin/products" className="admin-btn">
            Manage Products
          </Link>
        </div>
      </div>
    </>
  );
}
