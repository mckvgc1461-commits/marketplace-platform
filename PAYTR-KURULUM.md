# PayTR Gerçek Ödeme Sistemi Kurulumu

## ✅ Avantajlar:
- ✅ Türkiye'de çalışır
- ✅ TC Kimlik OPSIYONEL (zorunlu değil)
- ✅ Türk Lirası desteği
- ✅ Türk bankalarına direkt ödeme
- ✅ Gerçek para çekilir
- ✅ Kolay kurulum

## 1. PayTR Hesabı Aç

1. https://www.paytr.com adresine git
2. "Üye Ol" butonuna tıkla
3. Email ve şifre ile kayıt ol
4. Telefon doğrulama yap

## 2. İşletme Bilgilerini Doldur

1. PayTR paneline gir
2. "Ayarlar" > "İşletme Bilgileri"
3. Doldur:
   - İşletme türü (Şahıs/Şirket)
   - Vergi numarası
   - Banka hesap bilgileri (IBAN)
   - Kimlik belgesi (TC kimlik/pasaport)

## 3. API Anahtarlarını Al

1. PayTR panelinde "Entegrasyon" > "API Bilgileri"
2. Üç anahtar göreceksin:

```
Merchant ID: 123456
Merchant Key: aBcDeFgHiJkLmNoPqRsTuVwXyZ
Merchant Salt: xYzAbC123456
```

## 4. Vercel'de Environment Variables Ekle

Vercel panelinde (https://vercel.com):

1. Projeyi seç: `ai-dukkan`
2. Settings > Environment Variables
3. Şu değişkenleri ekle:

```
PAYTR_MERCHANT_ID=123456
PAYTR_MERCHANT_KEY=aBcDeFgHiJkLmNoPqRsTuVwXyZ
PAYTR_MERCHANT_SALT=xYzAbC123456
NEXT_PUBLIC_SITE_URL=https://ai-dukkan.vercel.app
```

## 5. Test Modu

PayTR otomatik olarak test modunda başlar. Test kartları:

```
✅ Başarılı Ödeme:
Kart: 4355 0840 0000 0001
Tarih: 12/30
CVV: 000

❌ Başarısız Ödeme:
Kart: 4355 0840 0000 0002
Tarih: 12/30
CVV: 000
```

## 6. Canlı Moda Geçiş

1. PayTR panelinde "Ayarlar" > "Test Modu"
2. "Canlı Moda Geç" butonuna tıkla
3. Onay bekle (1-2 gün)
4. Onaylandıktan sonra gerçek ödemeler alabilirsin

## 7. Nasıl Çalışır?

1. **Müşteri ürün ekler** → Sepete gider
2. **Teslimat bilgilerini girer** → Ad, telefon, adres
3. **"Kredi Kartı ile Öde" butonuna basar**
4. **PayTR ödeme sayfası açılır** → Müşteri kartını girer
5. **TC kimlik OPSIYONEL** → İstenirse girilir, istenmezse geçilir
6. **Ödeme başarılı** → Para PayTR hesabına gider
7. **PayTR'den banka hesabına transfer** → Otomatik veya manuel

## 8. Para Akışı

```
Müşteri Kartı → PayTR → (Komisyon Kesimi) → Senin Banka Hesabın
```

- PayTR komisyonu: %2.5-3.5
- Para transferi: Günlük veya haftalık (ayarlanabilir)
- Türk Lirası olarak gelir

## 9. Komisyon Oranları

| İşlem Türü | Komisyon |
|------------|----------|
| Tek Çekim | %2.5 |
| 2-3 Taksit | %3.0 |
| 6-9 Taksit | %3.5 |

## 10. Test Et

1. Vercel'e deploy et
2. https://ai-dukkan.vercel.app/seller → Ürün ekle
3. Ana sayfa → Ürünü sepete ekle
4. Sepet → Teslimat bilgilerini doldur
5. "Kredi Kartı ile Öde" → PayTR sayfası açılır
6. Test kartı gir:
   ```
   4355 0840 0000 0001
   12/30
   000
   ```
7. Ödeme başarılı!

## 11. PayTR Panelinde Görebilirsin:

- Tüm ödemeleri
- Müşteri bilgilerini
- Başarılı/başarısız işlemleri
- Gelir raporlarını
- İade işlemlerini
- Banka transferlerini

## 12. Güvenlik

- 🔒 3D Secure zorunlu
- 🔒 SSL sertifikalı
- 🔒 PCI DSS uyumlu
- 🔒 Fraud detection

## 13. Müşteri Deneyimi

1. Müşteri siteye girer
2. Ürün seçer, sepete ekler
3. Teslimat bilgilerini doldurur
4. "Kredi Kartı ile Öde" butonuna basar
5. PayTR'nin güvenli ödeme sayfası açılır
6. Kart bilgilerini girer
7. TC kimlik (opsiyonel - istenirse girer)
8. 3D Secure doğrulaması (SMS kodu)
9. Ödeme tamamlanır
10. Başarı sayfasına yönlendirilir

## Hızlı Başlangıç:

```bash
1. https://www.paytr.com → Kayıt ol
2. İşletme bilgilerini doldur
3. API anahtarlarını kopyala
4. Vercel'de environment variables ekle
5. Deploy et
6. Test kartı ile dene!
```

## Destek:

- PayTR Docs: https://www.paytr.com/entegrasyon
- PayTR Destek: destek@paytr.com
- Telefon: 0850 885 03 03
- Canlı destek: PayTR panelinde

---

## ÖNEMLİ:

✅ TC kimlik opsiyonel (zorunlu değil)
✅ Türkiye'de çalışır
✅ Türk Lirası
✅ Türk bankalarına direkt
✅ Gerçek para çekilir
✅ Güvenli ve yasal

## Alternatif: TC Kimlik İstememe

PayTR panelinde "Ayarlar" > "Ödeme Ayarları" bölümünden:
- "TC Kimlik Zorunluluğu" seçeneğini KAPALI yap
- Böylece müşterilerden TC kimlik istenmez
