'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Category } from '@/lib/types';
import ImageUpload from '@/components/admin/ImageUpload';

const EMPTY_FORM: CategoryFormState = {
  name_fr: '',
  name_en: '',
  subtitle_fr: '',
  subtitle_en: '',
  card_desc_fr: '',
  card_desc_en: '',
  desc_fr: '',
  desc_en: '',
  slug: '',
  sort_order: '0',
  image_url: '',
};

interface CategoryFormState {
  name_fr: string;
  name_en: string;
  subtitle_fr: string;
  subtitle_en: string;
  card_desc_fr: string;
  card_desc_en: string;
  desc_fr: string;
  desc_en: string;
  slug: string;
  sort_order: string;
  image_url: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(cat: Category) {
    setEditing(cat);
    setForm({
      name_fr: cat.name_fr,
      name_en: cat.name_en,
      subtitle_fr: cat.subtitle_fr || '',
      subtitle_en: cat.subtitle_en || '',
      card_desc_fr: cat.card_desc_fr || '',
      card_desc_en: cat.card_desc_en || '',
      desc_fr: cat.desc_fr || '',
      desc_en: cat.desc_en || '',
      slug: cat.slug,
      sort_order: String(cat.sort_order),
      image_url: cat.image_url || '',
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  }

  function updateField(field: keyof CategoryFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const body = new FormData();
      body.append('name_fr', form.name_fr);
      body.append('name_en', form.name_en);
      body.append('subtitle_fr', form.subtitle_fr);
      body.append('subtitle_en', form.subtitle_en);
      body.append('card_desc_fr', form.card_desc_fr);
      body.append('card_desc_en', form.card_desc_en);
      body.append('desc_fr', form.desc_fr);
      body.append('desc_en', form.desc_en);
      body.append('slug', form.slug);
      body.append('sort_order', form.sort_order);
      if (form.image_url) {
        body.append('image_url', form.image_url);
      }

      const url = editing
        ? '/api/categories/' + editing.id
        : '/api/categories';
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body });

      if (res.ok) {
        closeModal();
        loadCategories();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save category');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch('/api/categories/' + id, { method: 'DELETE' });
      if (res.ok) {
        setDeleteConfirm(null);
        loadCategories();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete category');
      }
    } catch {
      alert('Network error. Please try again.');
    }
  }

  return (
    <>
      <h1 className="admin-page-title">Categories</h1>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3>All Categories ({categories.length})</h3>
          <button className="admin-btn" onClick={openAdd}>
            + Add Category
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#7a6e62' }}>
            Loading...
          </div>
        ) : categories.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#7a6e62' }}>
            No categories yet. Click &quot;Add Category&quot; to create one.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Name (FR)</th>
                <th>Name (EN)</th>
                <th>Slug</th>
                <th>Sort Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    {cat.image_url ? (
                      <img
                        src={cat.image_url}
                        alt={cat.name_en}
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
                  <td>{cat.name_fr}</td>
                  <td>{cat.name_en}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {cat.slug}
                  </td>
                  <td>{cat.sort_order}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        className="admin-btn admin-btn-secondary"
                        onClick={() => openEdit(cat)}
                      >
                        Edit
                      </button>
                      {deleteConfirm === cat.id ? (
                        <>
                          <button
                            className="admin-btn admin-btn-danger"
                            onClick={() => handleDelete(cat.id)}
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
                          onClick={() => setDeleteConfirm(cat.id)}
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
              <h2>{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button className="admin-modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="form-group">
                  <label htmlFor="cat-name-fr">Name (FR) *</label>
                  <input
                    id="cat-name-fr"
                    type="text"
                    value={form.name_fr}
                    onChange={(e) => updateField('name_fr', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cat-name-en">Name (EN) *</label>
                  <input
                    id="cat-name-en"
                    type="text"
                    value={form.name_en}
                    onChange={(e) => updateField('name_en', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cat-subtitle-fr">Subtitle (FR)</label>
                  <input
                    id="cat-subtitle-fr"
                    type="text"
                    value={form.subtitle_fr}
                    onChange={(e) => updateField('subtitle_fr', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cat-subtitle-en">Subtitle (EN)</label>
                  <input
                    id="cat-subtitle-en"
                    type="text"
                    value={form.subtitle_en}
                    onChange={(e) => updateField('subtitle_en', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="card-desc-fr">Card Description (FR)</label>
                  <input
                    id="card-desc-fr"
                    type="text"
                    value={form.card_desc_fr}
                    onChange={(e) => updateField('card_desc_fr', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="card-desc-en">Card Description (EN)</label>
                  <input
                    id="card-desc-en"
                    type="text"
                    value={form.card_desc_en}
                    onChange={(e) => updateField('card_desc_en', e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="cat-desc-fr">Description (FR)</label>
                  <textarea
                    id="cat-desc-fr"
                    rows={3}
                    value={form.desc_fr}
                    onChange={(e) => updateField('desc_fr', e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="cat-desc-en">Description (EN)</label>
                  <textarea
                    id="cat-desc-en"
                    rows={3}
                    value={form.desc_en}
                    onChange={(e) => updateField('desc_en', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cat-slug">Slug *</label>
                  <input
                    id="cat-slug"
                    type="text"
                    value={form.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    placeholder="e.g. tshirts-polos"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cat-sort">Sort Order</label>
                  <input
                    id="cat-sort"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => updateField('sort_order', e.target.value)}
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
                  {saving ? 'Saving...' : editing ? 'Update Category' : 'Create Category'}
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
