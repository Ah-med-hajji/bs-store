-- BS Store — Initial Migration
-- Creates categories and products tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Categories table
CREATE TABLE categories (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name_fr     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  subtitle_fr TEXT NOT NULL DEFAULT 'Notre Sélection',
  subtitle_en TEXT NOT NULL DEFAULT 'Our Selection',
  card_desc_fr TEXT,
  card_desc_en TEXT,
  desc_fr     TEXT,
  desc_en     TEXT,
  image_url   TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Products table
CREATE TABLE products (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  slug        TEXT UNIQUE NOT NULL,
  name_fr     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  price       INTEGER NOT NULL,
  badge       TEXT,
  image_url   TEXT,
  sizes       TEXT[],
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Row-level security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policy: public read
CREATE POLICY "Public read product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Storage policy: authenticated upload (using service_role bypasses RLS anyway)
