# 🚀 CANLI YAYINA ALMA REHBERİ

## 1️⃣ GITHUB'A YÜKLE (2 Dakika)

Visual Studio Code terminalinde sırayla:

```bash
git init
git add .
git commit -m "E-ticaret platformu hazır"
```

Şimdi GitHub'a git: https://github.com/new
- Repository name: `marketplace-platform` (veya istediğiniz isim)
- Public seçin
- Create repository

Sonra terminalde:
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/marketplace-platform.git
git branch -M main
git push -u origin main
```

## 2️⃣ VERCEL'E DEPLOY ET (1 Dakika)

1. https://vercel.com adresine git
2. "Sign Up" → GitHub ile giriş yap
3. "Add New..." → "Project"
4. GitHub'daki projenizi seçin
5. "Import" butonuna tıkla

### Environment Variables Ekle:
Deploy etmeden önce "Environment Variables" bölümüne şunları ekle:

```
NEXT_PUBLIC_SUPABASE_URL = https://dcnhmatuqazltqhqsfgu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_VuyUnNdtMRj9IHxOW7Cq6g_wuTWQJq8
IYZICO_API_KEY = sandbox-your-api-key
IYZICO_SECRET_KEY = sandbox-your-secret-key
NEXT_PUBLIC_SITE_URL = https://your-site.vercel.app
```

6. "Deploy" butonuna tıkla!

⏰ 2-3 dakika bekle... ✅ SİTENİZ HAZIR!

## 3️⃣ SUPABASE DATABASE KURULUMU (3 Dakika)

1. https://supabase.com → "Start your project"
2. GitHub ile giriş yap
3. "New project" → İsim ver (örn: marketplace-db)
4. Şifre belirle (güçlü olsun!)
5. Region: Frankfurt (Türkiye'ye en yakın)
6. "Create new project" → 2 dakika bekle

### Database Tablolarını Oluştur:

Sol menüden "SQL Editor" → "New query"

Şu kodu yapıştır ve "Run" butonuna bas:

```sql
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
  created_at TIMESTAMP DEFAULT NOW()
);

-- Herkes ürünleri görebilir
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT USING (true);

-- Herkes ürün ekleyebilir (demo için)
CREATE POLICY "Anyone can insert products" 
ON products FOR INSERT WITH CHECK (true);

-- İndeksler
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
```

### API Bilgilerini Al:

Settings → API → Şunları kopyala:
- Project URL
- anon/public key

Vercel'de Environment Variables'ı güncelle!

## 4️⃣ IYZICO ÖDEME SİSTEMİ (5 Dakika) - TÜRKİYE İÇİN

1. https://sandbox-merchant.iyzipay.com → "Üye Ol"
2. E-posta doğrula
3. Ayarlar → API Bilgileri

### Test Modunda Key'ler:
```
API Key: sandbox-your-api-key
Secret Key: sandbox-your-secret-key
```

Bu key'leri Vercel Environment Variables'a ekle!

### Test Kartları (Sandbox):
- Başarılı: 5528 7900 0000 0001
- Başarısız: 5406 6700 0000 0009
- Tarih: 12/30
- CVC: 123

### Canlıya Almak İçin:
1. https://merchant.iyzipay.com → Gerçek hesap aç
2. KYC (Kimlik doğrulama) yap
3. API key'leri al
4. .env'de URI'yi değiştir: `https://api.iyzipay.com`

## 5️⃣ GOOGLE'DA GÖRÜNMEK (2 Dakika)

1. https://search.google.com/search-console
2. "Mülk ekle" → URL'inizi girin
3. Doğrulama: Vercel otomatik yapar
4. "Sitemap gönder" → `https://your-site.vercel.app/sitemap.xml`

🎉 2-3 gün içinde Google'da görünmeye başlar!

## 6️⃣ ÜCRETSİZ DOMAIN (Opsiyonel)

### Vercel Domain (Ücretsiz):
- Otomatik gelir: `your-project.vercel.app`

### Kendi Domain'iniz:
1. Vercel → Settings → Domains
2. "Add" → Domain adınızı girin
3. DNS ayarlarını yapın

## ✅ TAMAMLANDI!

Artık:
- ✅ Siteniz canlı
- ✅ Ödeme sistemi çalışıyor
- ✅ Database hazır
- ✅ SSL sertifikası var
- ✅ Google'a gönderildi

## 🎁 MÜŞTERİLERİNİZE VERİN

Her müşteri:
1. Bu projeyi GitHub'dan fork'lar
2. Kendi Vercel hesabına deploy eder
3. Kendi Supabase database'ini oluşturur
4. Kendi Stripe hesabını bağlar

**SINIR YOK! Sınırsız müşteri, sınırsız site!**

## 💰 MALİYET

- Hosting: ÜCRETSİZ
- Database: ÜCRETSİZ
- Domain: ÜCRETSİZ (.vercel.app)
- SSL: ÜCRETSİZ
- Stripe: Sadece satışta %2.9 + 0.30₺

## 🆘 SORUN ÇÖZME

### "Build failed" hatası:
```bash
npm install
npm run build
```
Hata varsa gönderin, düzeltelim!

### Database bağlanmıyor:
- Supabase URL ve Key'i kontrol edin
- Vercel'de Environment Variables'ı kontrol edin

### Ödeme çalışmıyor:
- Stripe key'lerini kontrol edin
- Test modunda olduğunuzdan emin olun

---

**🎉 BAŞARILAR! Artık gerçek bir e-ticaret platformunuz var!**
