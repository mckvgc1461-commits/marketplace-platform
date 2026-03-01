-- Supabase'de çalıştırılacak SQL
-- https://supabase.com > SQL Editor'da çalıştırın

-- Products tablosu
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  seller_id TEXT NOT NULL,
  seller_name TEXT,
  seller_phone TEXT,
  seller_email TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders tablosu
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  products JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_intent_id TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  customer_address TEXT,
  customer_city TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users tablosu (Supabase Auth ile entegre)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'customer',
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS (Row Level Security) Politikaları
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Herkes ürünleri görebilir
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Sadece satıcılar ürün ekleyebilir
CREATE POLICY "Sellers can insert products" 
ON products FOR INSERT 
WITH CHECK (auth.uid()::text = seller_id);

-- İndeksler (Performans için)
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user ON orders(user_id);
