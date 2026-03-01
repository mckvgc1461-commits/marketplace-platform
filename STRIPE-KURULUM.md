# Stripe Gerçek Ödeme Sistemi Kurulumu

## ✅ Avantajlar:
- ❌ TC Kimlik GEREKMEZ
- ✅ Sadece kredi kartı bilgileri
- ✅ Gerçek para çekilir
- ✅ Güvenli ve yaygın
- ✅ Mobil uyumlu

## 1. Stripe Hesabı Aç

1. https://stripe.com adresine git
2. "Start now" butonuna tıkla
3. Email ve şifre ile kayıt ol
4. İşletme bilgilerini doldur

## 2. API Anahtarlarını Al

1. Stripe Dashboard'a gir
2. Sağ üstte "Developers" tıkla
3. "API keys" sekmesine git
4. İki anahtar göreceksin:

```
Publishable key: pk_test_51... (Public - frontend için)
Secret key: sk_test_51... (Private - backend için)
```

## 3. Vercel'de Environment Variables Ekle

Vercel panelinde (https://vercel.com):

1. Projeyi seç: `ai-dukkan`
2. Settings > Environment Variables
3. Şu değişkenleri ekle:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51QdVVvP8...
STRIPE_SECRET_KEY=sk_test_51QdVVvP8...
```

## 4. Test Kartları (Sandbox Modu)

Stripe test modunda bu kartları kullan:

```
✅ Başarılı Ödeme:
Kart: 4242 4242 4242 4242
Tarih: Gelecekte herhangi bir tarih (örn: 12/30)
CVC: Herhangi 3 rakam (örn: 123)

❌ Başarısız Ödeme (Yetersiz bakiye):
Kart: 4000 0000 0000 9995

❌ Başarısız Ödeme (Kart reddedildi):
Kart: 4000 0000 0000 0002
```

## 5. Gerçek Ödeme İçin (Production)

1. Stripe Dashboard'da "Activate your account" butonuna tıkla
2. İşletme bilgilerini tamamla:
   - İşletme türü (Şahıs/Şirket)
   - Banka hesap bilgileri (paranın yatacağı hesap)
   - Kimlik doğrulama (pasaport/ehliyet)
3. Onay bekle (1-2 gün)
4. Onaylandıktan sonra "Live" moduna geç
5. Live API anahtarlarını al:
   ```
   pk_live_... (Publishable)
   sk_live_... (Secret)
   ```
6. Vercel'de environment variables'ı güncelle

## 6. Para Nasıl Alınır?

### Türk Banka Hesabına:

Stripe → Wise/Payoneer → Türk Banka Hesabı

**Adımlar:**
1. Wise hesabı aç (https://wise.com)
2. Wise'da USD/EUR hesap aç
3. Stripe'da Wise hesap bilgilerini ekle
4. Stripe'dan Wise'a para gelir
5. Wise'dan Türk bankana TL olarak çek

**Komisyonlar:**
- Stripe: %2.9 + 0.30 TL
- Wise: %0.5-1

### Alternatif: Papara

Bazı kullanıcılar Papara ile Stripe'ı bağlıyor (araştır)

## 7. Nasıl Çalışır?

1. **Müşteri ürün ekler** → Sepete gider
2. **Teslimat bilgilerini girer** → Ad, telefon, adres
3. **"Kredi Kartı ile Öde" butonuna basar**
4. **Stripe ödeme formu açılır** → Müşteri kartını girer
5. **TC kimlik SORULMAZ** → Sadece kart bilgileri
6. **Ödeme başarılı** → Para Stripe hesabına gider
7. **Stripe'dan banka hesabına transfer** → 2-7 gün

## 8. Güvenlik

- 🔒 PCI DSS Level 1 sertifikalı
- 🔒 3D Secure destekli
- 🔒 Fraud detection (dolandırıcılık tespiti)
- 🔒 Kart bilgileri Stripe'da saklanır (senin sunucunda değil)

## 9. Test Et

1. Vercel'e deploy et
2. https://ai-dukkan.vercel.app/seller → Ürün ekle
3. Ana sayfa → Ürünü sepete ekle
4. Sepet → Teslimat bilgilerini doldur
5. Ödeme sayfası → Test kartı gir:
   ```
   4242 4242 4242 4242
   12/30
   123
   ```
6. Ödeme başarılı!

## 10. Stripe Dashboard'da Görebilirsin:

- Tüm ödemeleri
- Müşteri bilgilerini
- Başarılı/başarısız işlemleri
- Gelir raporlarını
- İade işlemlerini

## Hızlı Başlangıç:

```bash
1. https://stripe.com → Kayıt ol
2. API anahtarlarını kopyala
3. Vercel'de environment variables ekle
4. Deploy et
5. Test kartı ile dene!
```

## Destek:

- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Türkçe Destek: Var (email ile)

---

## ÖNEMLİ:

✅ Müşteri TC kimlik vermez
✅ Sadece kart bilgileri yeterli
✅ Gerçek para çekilir
✅ Güvenli ve yasal
✅ Dünya çapında kullanılır
