# HIZLI BAŞLANGIÇ - TAM OTOMATİK SAAS

## 🎯 SİSTEM HAZIR!

### Linkler:
- **Ana Sayfa:** https://ai-dukkan.vercel.app
- **Müşteri Paneli:** https://ai-dukkan.vercel.app/musteri
- **Kayıt:** https://ai-dukkan.vercel.app/auth/kayit
- **Giriş:** https://ai-dukkan.vercel.app/auth/giris
- **Dashboard:** https://ai-dukkan.vercel.app/dashboard

## 🚀 NASIL ÇALIŞIR:

### 1. Müşteri Akışı:
```
1. ai-dukkan.vercel.app/musteri → Paket seç
2. "Hemen Başla" → Kayıt ol
3. Email/şifre gir
4. Mağaza adı ve subdomain seç
5. Dashboard'a yönlendir
6. Ödeme yap (şimdilik manuel)
7. Sen kurulum yaparsın
8. Müşteri kullanmaya başlar
```

### 2. Senin İşin:
```
1. Supabase'de stores tablosunu kontrol et
2. Yeni kayıt gördüğünde:
   - GitHub'da yeni repo oluştur
   - Vercel'e deploy et
   - Müşterinin PayTR bilgilerini ekle
   - subdomain.ai-dukkan.com'u ayarla
3. Müşteriye email at: "Siteniz hazır!"
4. Para al!
```

## 💰 FİYATLAR:

- **Hızlı Başlangıç:** 2,499 TL
- **Profesyonel:** 4,999 TL
- **Kurumsal:** 9,999 TL

## 🔧 KURULUM (Manuel - 30 dakika):

### Adım 1: GitHub Repo
```bash
# Yeni repo oluştur
gh repo create musteri-adi-dukkan --public

# Kodu kopyala
git clone https://github.com/mckvgc1461-commits/marketplace-platform
cd marketplace-platform
git remote set-url origin https://github.com/musteri-adi-dukkan
git push -u origin main
```

### Adım 2: Vercel Deploy
```
1. vercel.com → New Project
2. GitHub repo seç
3. Environment Variables ekle:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - PAYTR_MERCHANT_ID (müşterinin)
   - PAYTR_MERCHANT_KEY (müşterinin)
   - PAYTR_MERCHANT_SALT (müşterinin)
4. Deploy
```

### Adım 3: Teslim
```
Müşteriye email:
"Siteniz hazır!
URL: musteri-adi-dukkan.vercel.app
Giriş: email@example.com
Şifre: (kayıt sırasındaki)

Ürünlerinizi ekleyebilirsiniz!"
```

## ⚡ HIZLI NOTLAR:

- Vercel deploy 3-5 dakika sürer
- Supabase ücretsiz (50,000 row)
- Her müşteri kendi PayTR'sini kullanır
- Para direkt müşterinin hesabına gider

## 🎉 BAŞARI!

Sistem hazır. Müşteri kayıt olsun, sen kurulum yap, para kazan!

Zamanla otomatikleştiririz.
