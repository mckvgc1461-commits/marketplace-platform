# İyzico Gerçek Ödeme Sistemi Kurulumu

## 1. İyzico Hesabı Oluştur

1. https://www.iyzico.com adresine git
2. "Üye Ol" butonuna tıkla
3. İşletme bilgilerini doldur (şirket/şahıs)
4. Banka hesap bilgilerini ekle (paranın yatacağı hesap)
5. Kimlik doğrulama belgelerini yükle

## 2. API Anahtarlarını Al

1. İyzico paneline giriş yap
2. "Ayarlar" > "API Anahtarları" bölümüne git
3. **CANLI (Production)** API anahtarlarını kopyala:
   - API Key
   - Secret Key

## 3. Vercel'de Environment Variables Güncelle

Vercel panelinde (https://vercel.com/dashboard):

1. Projeyi seç: `ai-dukkan`
2. Settings > Environment Variables
3. Şu değişkenleri ekle/güncelle:

```
IYZICO_API_KEY=canli-api-key-buraya
IYZICO_SECRET_KEY=canli-secret-key-buraya
NEXT_PUBLIC_SITE_URL=https://ai-dukkan.vercel.app
```

## 4. Kod Değişikliği (Sandbox'tan Production'a Geçiş)

`app/api/checkout/route.ts` ve `app/api/payment-callback/route.ts` dosyalarında:

**DEĞİŞTİR:**
```javascript
uri: 'https://sandbox-api.iyzipay.com'
```

**BUNUNLA:**
```javascript
uri: 'https://api.iyzipay.com'
```

## 5. Test Kartı vs Gerçek Kart

### Sandbox (Test) Modu:
- Test kartı: 5528 7900 0000 0001
- Para gerçekten çekilmez
- Sadece test amaçlı

### Production (Gerçek) Modu:
- Müşteri kendi kredi kartını kullanır
- Para gerçekten çekilir
- İyzico komisyon keser (%2-3)
- Kalan para satıcının banka hesabına yatar

## 6. Nasıl Çalışır?

1. **Müşteri ürün ekler** → Sepete gider
2. **Teslimat bilgilerini girer** → Ad, telefon, adres
3. **"Kredi Kartı ile Öde" butonuna basar**
4. **İyzico ödeme sayfası açılır** → Müşteri kendi kartını girer
5. **Ödeme başarılı** → Para İyzico'ya gider
6. **İyzico komisyon keser** → Kalan parayı satıcıya gönderir
7. **Sipariş veritabanına kaydedilir** → Satıcı görebilir

## 7. Para Akışı

```
Müşteri Kartı → İyzico → (Komisyon Kesimi) → Satıcı Banka Hesabı
```

- İyzico komisyonu: %2-3 arası
- Para transferi: 1-2 iş günü
- Satıcı panelinden takip edilebilir

## 8. Önemli Notlar

⚠️ **Sandbox modunda para gerçekten çekilmez!**
✅ **Production modunda gerçek para işlemi yapılır**
💰 **Satıcı banka hesabı mutlaka doğrulanmalı**
📱 **3D Secure otomatik aktif (güvenlik için)**

## 9. Müşteri Deneyimi

1. Müşteri siteye girer
2. Ürün seçer, sepete ekler
3. Teslimat bilgilerini doldurur
4. "Kredi Kartı ile Öde" butonuna basar
5. İyzico'nun güvenli ödeme sayfası açılır
6. Kendi kredi kartı bilgilerini girer
7. 3D Secure doğrulaması yapar (SMS kodu)
8. Ödeme tamamlanır
9. Başarı sayfasına yönlendirilir

## 10. Satıcı Paneli

İyzico panelinde satıcı görebilir:
- Tüm ödemeleri
- Komisyon kesintilerini
- Banka hesabına yapılan transferleri
- Müşteri bilgilerini
- İade/iptalleri

## Hızlı Başlangıç

1. İyzico'ya üye ol: https://www.iyzico.com
2. Banka hesabını ekle
3. API anahtarlarını al
4. Vercel'de environment variables güncelle
5. Kodu production moduna çevir (uri değiştir)
6. Deploy et
7. Gerçek kartla test et!

## Destek

- İyzico Destek: https://dev.iyzipay.com
- Telefon: 0850 222 0 999
- E-posta: destek@iyzico.com
