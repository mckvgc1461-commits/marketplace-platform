# Türkiye'de TC Kimlik Gerektirmeyen Ödeme Sistemleri

## 🚫 Sorun: İyzico TC Kimlik İstiyor

İyzico ve çoğu Türk ödeme sistemi yasal olarak TC kimlik numarası ister. Bu müşteriler için sorun olabilir.

## ✅ Alternatif Çözümler:

### 1. STRIPE (En Popüler - Uluslararası)
- **TC kimlik gerektirmez**
- Sadece kart bilgileri yeterli
- Dünya çapında kullanılır
- Türkiye'den kullanılabilir
- Komisyon: %2.9 + 0.30 TL

**Kurulum:**
```bash
npm install stripe @stripe/stripe-js
```

**Avantajlar:**
- TC kimlik yok
- Kolay entegrasyon
- Güvenilir
- Mobil uyumlu

**Dezavantajlar:**
- Türk Lirası desteği sınırlı (USD/EUR kullanılır)
- Türk banka hesabına direkt para yatmaz (Wise/Payoneer gerekir)

---

### 2. PAYTR (Türk - TC Opsiyonel)
- TC kimlik **opsiyonel** (zorunlu değil)
- Türk Lirası desteği
- Türk bankalarına direkt ödeme
- Komisyon: %2.5-3.5

**Web:** https://www.paytr.com

**Avantajlar:**
- TC kimlik zorunlu değil
- TL desteği
- Türk bankaları
- Kolay kurulum

---

### 3. PAPARA (Dijital Cüzdan)
- TC kimlik sadece satıcı için (müşteri için değil)
- Müşteri Papara hesabıyla öder
- Komisyon: %1.5

**Web:** https://www.papara.com

**Avantajlar:**
- Müşteri TC kimlik vermez
- Düşük komisyon
- Hızlı transfer

**Dezavantajlar:**
- Müşterinin Papara hesabı olmalı

---

### 4. PAYPAL (Uluslararası)
- TC kimlik gerektirmez
- Email ile ödeme
- Dünya çapında kullanılır

**Avantajlar:**
- TC kimlik yok
- Güvenilir
- Yaygın

**Dezavantajlar:**
- Türkiye'de sınırlı destek
- Yüksek komisyon (%4-5)

---

## 🎯 ÖNERİM: STRIPE Kullanalım

Stripe en iyi seçenek çünkü:
1. ✅ TC kimlik gerektirmez
2. ✅ Sadece kart bilgileri yeterli
3. ✅ Kolay entegrasyon
4. ✅ Güvenilir ve yaygın
5. ✅ Mobil uyumlu

### Stripe Kurulumu:

1. **Stripe hesabı aç:** https://stripe.com
2. **API anahtarlarını al**
3. **Kodu entegre et** (ben yapacağım)
4. **Test et**

### Para Nasıl Alınır?

Stripe → Wise/Payoneer → Türk Banka Hesabı

veya

Stripe → Direkt Türk Kartı (Bazı bankalar destekler)

---

## 🔥 Basit Çözüm: Kendi Ödeme Formumuz

Eğer hiçbir ödeme sistemi kullanmak istemezsen:

1. Müşteri kart bilgilerini girer
2. Biz manuel işleriz (POS cihazı ile)
3. Sipariş onaylanır

**Avantajlar:**
- Hiç komisyon yok
- TC kimlik yok
- Tam kontrol

**Dezavantajlar:**
- Manuel işlem
- Güvenlik sorumluluğu
- Otomatik değil

---

## Hangisini İstiyorsun?

1. **STRIPE** - TC kimlik yok, kolay, güvenilir (ÖNERİLİR)
2. **PAYTR** - Türk, TC opsiyonel
3. **Basit Form** - Manuel işlem, komisyon yok
4. **PAPARA** - Dijital cüzdan

Söyle, hangisini kurayım?
