'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Category, Product } from '@/lib/types';
import ImageUpload from '@/components/admin/ImageUpload';

const EMPTY_FORM: ProductFormState = {
  name_fr: '',
  name_en: '',
  price: '',
  badge: '',
  category_id: '',
  sizes: '',
  slug: '',
  sort_order: '0',
  image_url: '',
};

interface ProductFormState {
  name_fr: string;
  name_en: string;
  price: string;
  badge: string;
  category_id: string;
  sizes: string;
  slug: string;
  sort_order: string;
  image_url: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);

      if (prodRes.ok) {
        const prods = await prodRes.json();
        setProducts(Array.isArray(prods) ? prods : []);
      }
      if (catRes.ok) {
        const cats = await catRes.json();
        setCategories(Array.isArray(cats) ? cats : []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function getCategoryName(categoryId: string) {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name_en : 'Unknown';
  }

  const filteredProducts =
    filterCategory === 'all'
      ? products
      : products.filter((p) => p.category_id === filterCategory);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(prod: Product) {
    setEditing(prod);
    setForm({
      name_fr: prod.name_fr,
      name_en: prod.name_en,
      price: String(prod.price),
      badge: prod.badge || '',
      category_id: prod.category_id,
      sizes: prod.sizes ? prod.sizes.join(', ') : '',
      slug: prod.slug,
      sort_order: String(prod.sort_order),
      image_url: prod.image_url || '',
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  }

  function updateField(field: keyof ProductFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const body = new FormData();
      body.append('name_fr', form.name_fr);
      body.append('name_en', form.name_en);
      body.append('price', form.price);
      body.append('badge', form.badge);
      body.append('category_id', form.category_id);
      body.append('sizes', form.sizes);
      body.append('slug', form.slug);
      body.append('sort_order', form.sort_order);
      if (form.image_url) {
        body.append('image_url', form.image_url);
      }

      const url = editing
        ? '/api/products/' + editing.id
        : '/api/products';
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body });

      if (res.ok) {
        closeModal();
        loadData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save product');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch('/api/products/' + id, { method: 'DELETE' });
      if (res.ok) {
        setDeleteConfirm(null);
        loadData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch {
      alert('Network error. Please try again.');
    }
  }

  return (
    <>
      <h1 className="admin-page-title">Products</h1>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3>All Products ({products.length})</h3>
          <button className="admin-btn" onClick={openAdd}>
            + Add Product
          </button>
        </div>

        <div className="admin-filter">
          <label style={{ fontSize: '0.85rem', color: '#7a6e62' }}>
            Filter by category:
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name_en}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#7a6e62' }}>
            Loading...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#7a6e62' }}>
            No products found. Click &quot;Add Product&quot; to create one.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Name (FR)</th>
                <th>Name (EN)</th>
                <th>Price</th>
                <th>Category</th>
                <th>Badge</th>
                <th>Sizes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    {prod.image_url ? (
                      <img
                        src={prod.image_url}
                        alt={prod.name_en}
                        className="admin-table-thumb"
                      />
                    ) : (
                      <div
                        className="admin-table-thumb"
                        style={{
                          background: '#e8dfd2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          color: '#7a6e62',
                        }}
                      >
                        No img
                      </div>
                    )}
                  </td>
                  <td>{prod.name_fr}</td>
                  <td>{prod.name_en}</td>
                  <td>{prod.price} TND</td>
                  <td>{getCategoryName(prod.category_id)}</td>
                  <td>
                    {prod.badge ? (
                      <span
                        style={{
                          background: '#4a3f35',
                          color: '#f5f0e8',
                          padding: '2px 8px',
                          borderRadius: '2px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {prod.badge}
                      </span>
                    ) : (
                      <span style={{ color: '#7a6e62', fontSize: '0.8rem' }}>--</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>
                    {prod.sizes ? prod.sizes.join(', ') : '--'}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        className="admin-btn admin-btn-secondary"
                        onClick={() => openEdit(prod)}
                      >
                        Edit
                      </button>
                      {deleteConfirm === prod.id ? (
                        <>
                          <button
                            className="admin-btn admin-btn-danger"
                            onClick={() => handleDelete(prod.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="admin-btn admin-btn-secondary"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="admin-btn admin-btn-danger"
                          onClick={() => setDeleteConfirm(prod.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
              <button className="admin-modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="form-group">
                  <label htmlFor="prod-name-fr">Name (FR) *</label>
                  <input
                    id="prod-name-fr"
                    type="text"
                    value={form.name_fr}
                    onChange={(e) => updateField('name_fr', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-name-en">Name (EN) *</label>
                  <input
                    id="prod-name-en"
                    type="text"
                    value={form.name_en}
                    onChange={(e) => updateField('name_en', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-price">Price (TND) *</label>
                  <input
                    id="prod-price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-category">Category *</label>
                  <select
                    id="prod-category"
                    value={form.category_id}
                    onChange={(e) => updateField('category_id', e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="prod-slug">Slug *</label>
                  <input
                    id="prod-slug"
                    type="text"
                    value={form.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    placeholder="e.g. classic-oversized-tee"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-sort">Sort Order</label>
                  <input
                    id="prod-sort"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => updateField('sort_order', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-badge">Badge (optional)</label>
                  <input
                    id="prod-badge"
                    type="text"
                    value={form.badge}
                    onChange={(e) => updateField('badge', e.target.value)}
                    placeholder="e.g. NOUVEAU, NEW"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-sizes">Sizes (comma-separated)</label>
                  <input
                    id="prod-sizes"
                    type="text"
                    value={form.sizes}
                    onChange={(e) => updateField('sizes', e.target.value)}
                    placeholder="e.g. S, M, L, XL, XXL"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Image</label>
                  <ImageUpload
                    currentImage={form.image_url || null}
                    onUpload={(url) => updateField('image_url', url)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="submit"
                  className="admin-btn"
                  disabled={saving}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {saving
                    ? 'Saving...'
                    : editing
                    ? 'Update Product'
                    : 'Create Product'}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
