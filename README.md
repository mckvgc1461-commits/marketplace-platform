# 🚀 E-Ticaret SaaS Platformu - TAM SÜRÜM

## ⚠️ GERÇEK ÖDEME SİSTEMİ
Bu platform **GERÇEK PARA** ile çalışır. Test modu KAPALI!
Müşterilerden alınan ödemeler gerçekten kredi kartlarından çekilir.

---

## 🎯 Özellikler

### ✅ Tam Otomatik Sistem
- Müşteri kaydı → Paket seçimi → Ödeme → Site otomatik aktif
- Manuel kurulum YOK
- Subdomain otomatik oluşturulur (örn: ahmet.ai-dukkan.com)

### 💳 Gerçek Ödeme Sistemi
- **PayTR** entegrasyonu (Türkiye'nin en güvenilir ödeme sistemi)
- Test modu KAPALI - Gerçek para çekilir
- 9 taksit desteği
- Güvenli hash kontrolü
- Otomatik callback işleme

### 🏪 Multi-Tenant Mimari
- Tek hosting, sınırsız müşteri
- Her müşterinin kendi subdomain'i
- Supabase ile veri izolasyonu
- RLS (Row Level Security) ile güvenlik

### 📦 Paketler
1. **Hızlı Başlangıç** - 2,499 TL
   - Bedava subdomain
   - Sınırsız ürün
   - PayTR ödeme sistemi

2. **Profesyonel** - 4,999 TL
   - Özel domain desteği
   - Logo tasarımı
   - SEO optimizasyonu

3. **Kurumsal** - 9,999 TL
   - Özel tasarım
   - Kargo entegrasyonu
   - SMS bildirimleri

---

## 🛠️ Teknolojiler

- **Frontend**: Next.js 16 + React + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payment**: PayTR (Gerçek ödeme)
- **Hosting**: Render (Ücretsiz)
- **Domain**: Ücretsiz subdomain

---

## 📋 Kurulum

### 1. Projeyi Klonla
```bash
git clone https://github.com/mckvgc1461-commits/marketplace-platform.git
cd marketplace-platform
npm install
```

### 2. Environment Variables
`.env.local` dosyası oluştur:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://khlremgxaifqxnspaemf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# PayTR - GERÇEK ÖDEME
PAYTR_MERCHANT_ID=your_merchant_id
PAYTR_MERCHANT_KEY=your_merchant_key
PAYTR_MERCHANT_SALT=your_merchant_salt

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Database Setup
Supabase'de `supabase-multi-tenant-schema-v2.sql` dosyasını çalıştır.

### 4. PayTR Kurulumu
**ÖNEMLİ**: Detaylı kurulum için `GERCEK-ODEME-KURULUM.md` dosyasını oku!

1. https://www.paytr.com adresinde hesap aç
2. Merchant ID, Key, Salt bilgilerini al
3. Callback URL'ini ayarla:
   ```
   https://your-domain.com/api/paytr-callback
   ```

### 5. Deploy
```bash
# Render'a deploy
git push origin main
```

---

## 🔒 Güvenlik

✅ **Yapılanlar:**
- SSL/HTTPS zorunlu
- PayTR hash kontrolü
- Supabase RLS
- Environment variables ile API key gizleme
- IP kontrolü

⚠️ **Önemli:**
- `.env.local` dosyasını GitHub'a YÜKLEME
- PayTR API bilgilerini kimseyle PAYLAŞMA
- Düzenli log kontrolü yap

---

## 💰 Para Kazanma

1. Müşteri siteye gelir
2. Paket seçer (2,499 - 9,999 TL)
3. Ödeme yapar (gerçek kredi kartı)
4. Para PayTR hesabına yatar
5. PayTR'den banka hesabına çek (1-2 iş günü)

**Komisyon**: PayTR %2.9 + 0.25 TL alır (standart)

---

## 📊 Sistem Akışı

```
Müşteri Kaydı
    ↓
Paket Seçimi
    ↓
Ödeme Formu
    ↓
PayTR Ödeme Sayfası
    ↓
Kredi Kartı Bilgileri
    ↓
Ödeme Başarılı
    ↓
Callback → Store Aktif
    ↓
Müşteri Dashboard'a Yönlendirilir
    ↓
Subdomain Hazır (ahmet.ai-dukkan.com)
```

---

## 🎨 Ekranlar

1. **Ana Sayfa** - Paket tanıtımı, fiyatlar
2. **Kayıt** - Müşteri kaydı
3. **Giriş** - Müşteri girişi
4. **Paketler** - Detaylı paket bilgileri
5. **Ödeme** - Müşteri bilgileri + PayTR
6. **Success** - Ödeme başarılı, site bilgileri
7. **Dashboard** - Müşteri paneli (ürün/sipariş yönetimi)

---

## 🚨 Sorun Giderme

### Ödeme başlatılamıyor
- PayTR API bilgilerini kontrol et
- Environment variables doğru mu?
- PayTR hesabı aktif mi?

### Ödeme başarılı ama site aktif olmuyor
- Callback URL doğru mu?
- Render loglarına bak
- Supabase'de `stores` tablosunu kontrol et

### Para hesaba yatmıyor
- PayTR'de onay süreci var (1-2 iş günü)
- Banka hesap bilgileri doğru mu?

---

## 📞 Destek

- **PayTR**: destek@paytr.com | 0850 532 26 96
- **Supabase**: https://supabase.com/docs
- **GitHub Issues**: https://github.com/mckvgc1461-commits/marketplace-platform/issues

---

## 📄 Lisans

Bu proje ticari kullanım içindir. Tüm hakları saklıdır.

---

## 🎉 Başarılar!

Artık müşterilerden **GERÇEK PARA** alabilirsin!
Her satışta para otomatik olarak PayTR hesabına yatacak.

**Live Demo**: https://marketplace-platform-saz4.onrender.com

---

## 📚 Dokümantasyon

- [Gerçek Ödeme Kurulum](GERCEK-ODEME-KURULUM.md)
- [PayTR Kurulum](PAYTR-KURULUM.md)
- [Deployment Guide](DEPLOYMENT-GUIDE.md)
- [Sistem Özeti](TAM-SISTEM-OZETI.md)

---

**Son Güncelleme**: 2 Mart 2026
**Versiyon**: 2.0 (Production Ready)
**Status**: ✅ GERÇEK ÖDEME AKTİF
