-- Multi-Tenant SaaS E-Ticaret Platformu
-- Her müşteri kendi mağazasını yönetir

-- 1. STORES (Mağazalar) - Her müşteri bir mağaza
CREATE TABLE stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users,
  store_name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT UNIQUE,
  logo_url TEXT,
  description TEXT,
  
  -- Ödeme Ayarları (Her mağaza kendi PayTR hesabını kullanır)
  paytr_merchant_id TEXT,
  paytr_merchant_key TEXT,
  paytr_merchant_salt TEXT,
  
  -- Mağaza Ayarları
  theme_color TEXT DEFAULT '#3B82F6',
  currency TEXT DEFAULT 'TRY',
  language TEXT DEFAULT 'tr',
  
  -- Abonelik Bilgileri
  plan TEXT DEFAULT 'free', -- free, basic, premium
  subscription_status TEXT DEFAULT 'active',
  subscription_expires_at TIMESTAMP,
  
  -- İletişim
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. PRODUCTS (Ürünler) - Her ürün bir mağazaya ait
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  sku TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. ORDERS (Siparişler) - Her sipariş bir mağazaya ait
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  
  -- Müşteri Bilgileri
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  
  -- Sipariş Detayları
  products JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  -- Ödeme Bilgileri
  payment_method TEXT DEFAULT 'credit_card',
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_id TEXT,
  
  -- Sipariş Durumu
  order_status TEXT DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  
  -- Notlar
  customer_notes TEXT,
  admin_notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. STORE_SETTINGS (Mağaza Ayarları)
CREATE TABLE store_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE UNIQUE,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  
  -- Sosyal Medya
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  
  -- Kargo Ayarları
  free_shipping_threshold DECIMAL(10,2) DEFAULT 0,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  
  -- Email Ayarları
  order_notification_email TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. ANALYTICS (İstatistikler)
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Metrikler
  visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  orders INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(store_id, date)
);

-- RLS (Row Level Security) Politikaları
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- STORES Politikaları
CREATE POLICY "Users can view their own stores"
ON stores FOR SELECT
USING (auth.uid() = owner_id);

CREATE POLICY "Users can create stores"
ON stores FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own stores"
ON stores FOR UPDATE
USING (auth.uid() = owner_id);

-- PRODUCTS Politikaları
CREATE POLICY "Anyone can view active products"
ON products FOR SELECT
USING (status = 'active');

CREATE POLICY "Store owners can manage their products"
ON products FOR ALL
USING (
  store_id IN (
    SELECT id FROM stores WHERE owner_id = auth.uid()
  )
);

-- ORDERS Politikaları
CREATE POLICY "Store owners can view their orders"
ON orders FOR SELECT
USING (
  store_id IN (
    SELECT id FROM stores WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Anyone can create orders"
ON orders FOR INSERT
WITH CHECK (true);

-- İndeksler (Performans)
CREATE INDEX idx_stores_subdomain ON stores(subdomain);
CREATE INDEX idx_stores_custom_domain ON stores(custom_domain);
CREATE INDEX idx_stores_owner ON stores(owner_id);
CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_store ON orders(store_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_analytics_store_date ON analytics(store_id, date);

-- Fonksiyonlar
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger: Order number otomatik oluştur
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_set_order_number
BEFORE INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION set_order_number();

-- Trigger: Updated_at otomatik güncelle
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stores_update_updated_at
BEFORE UPDATE ON stores
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER products_update_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_update_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
