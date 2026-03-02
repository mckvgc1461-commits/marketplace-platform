# 🔴 GERÇEK ÖDEME SİSTEMİ KURULUM KILAVUZU

## ⚠️ ÖNEMLİ UYARI
Bu sistem **GERÇEK PARA** ile çalışır. Test modu KAPALI (`test_mode = 0`).
Müşterilerden alınan ödemeler **GERÇEKTEN** kredi kartlarından çekilir!

---

## 📋 ADIM 1: PayTR Hesabı Oluştur

1. https://www.paytr.com adresine git
2. "Üye Ol" butonuna tıkla
3. Şirket bilgilerini doldur:
   - Şirket Adı
   - Vergi Numarası / TC Kimlik
   - Telefon
   - Email
   - Banka Hesap Bilgileri (para buraya yatacak!)

4. Hesap onayını bekle (1-2 iş günü)

---

## 📋 ADIM 2: PayTR API Bilgilerini Al

1. PayTR'ye giriş yap
2. **Mağaza → Ayarlar** menüsüne git
3. Şu bilgileri kopyala:
   - **Merchant ID** (Mağaza Numarası)
   - **Merchant Key** (Mağaza Parolası)
   - **Merchant Salt** (Mağaza Gizli Anahtarı)

---

## 📋 ADIM 3: Render'a Environment Variables Ekle

1. https://dashboard.render.com adresine git
2. Projenizi seç: `marketplace-platform-saz4`
3. **Environment** sekmesine git
4. Şu değişkenleri ekle:

```
PAYTR_MERCHANT_ID = [PayTR'den aldığın Merchant ID]
PAYTR_MERCHANT_KEY = [PayTR'den aldığın Merchant Key]
PAYTR_MERCHANT_SALT = [PayTR'den aldığın Merchant Salt]
```

5. **Save Changes** butonuna tıkla
6. Servis otomatik yeniden başlayacak

---

## 📋 ADIM 4: PayTR Callback URL'ini Ayarla

1. PayTR panelinde **Mağaza → Ayarlar** menüsüne git
2. **Bildirim URL (IPN)** alanına şunu yaz:
```
https://marketplace-platform-saz4.onrender.com/api/paytr-callback
```

3. **Başarılı Ödeme URL'i**:
```
https://marketplace-platform-saz4.onrender.com/success
```

4. **Başarısız Ödeme URL'i**:
```
https://marketplace-platform-saz4.onrender.com/musteri/odeme
```

5. Kaydet

---

## 📋 ADIM 5: Test Et (GERÇEK KART İLE!)

⚠️ **DİKKAT**: Test modu kapalı olduğu için gerçek para çekilecek!

1. Siteye git: https://marketplace-platform-saz4.onrender.com
2. **Paketleri Gör** butonuna tıkla
3. Bir paket seç (örn: Hızlı Başlangıç - 2,499 TL)
4. Bilgileri doldur
5. **GERÇEK KREDİ KARTI** bilgilerini gir
6. Ödemeyi tamamla
7. Para **GERÇEKTEN** çekilecek ve PayTR hesabına yatacak!

---

## 💰 PARA ÇEKME

1. PayTR panelinde **Bakiye** menüsüne git
2. **Para Çek** butonuna tıkla
3. Tutarı gir
4. Banka hesabına 1-2 iş günü içinde yatar

---

## 🔒 GÜVENLİK

✅ **Yapılanlar:**
- SSL/HTTPS zorunlu
- Hash kontrolü (sahte istekleri engeller)
- IP kontrolü
- Supabase RLS (Row Level Security)

⚠️ **Yapılması Gerekenler:**
- PayTR API bilgilerini KİMSEYLE paylaşma
- .env dosyasını GitHub'a YÜKLEME
- Düzenli olarak logları kontrol et

---

## 📊 ÖDEME TAKİBİ

### Supabase'de Kontrol:
1. https://supabase.com/dashboard adresine git
2. Projeyi aç
3. **Table Editor → stores** tablosuna git
4. `status` kolonu:
   - `pending` = Ödeme bekleniyor
   - `active` = Ödeme başarılı, site aktif
   - `failed` = Ödeme başarısız

### PayTR'de Kontrol:
1. PayTR panelinde **İşlemler** menüsüne git
2. Tüm ödemeleri görebilirsin
3. Başarılı/Başarısız durumları kontrol et

---

## 🚨 SORUN GİDERME

### Ödeme başlatılamıyor:
- PayTR API bilgilerini kontrol et
- Render'da environment variables doğru mu?
- PayTR hesabı aktif mi?

### Ödeme başarılı ama site aktif olmuyor:
- Callback URL doğru mu?
- Supabase'de `stores` tablosunu kontrol et
- Render loglarına bak: `View Logs` butonu

### Para hesaba yatmıyor:
- PayTR'de onay süreci var (1-2 iş günü)
- Banka hesap bilgileri doğru mu?
- PayTR destek ile iletişime geç

---

## 📞 DESTEK

- PayTR Destek: destek@paytr.com
- PayTR Telefon: 0850 532 26 96
- Supabase Docs: https://supabase.com/docs

---

## ✅ KONTROL LİSTESİ

- [ ] PayTR hesabı oluşturuldu ve onaylandı
- [ ] Merchant ID, Key, Salt alındı
- [ ] Render'a environment variables eklendi
- [ ] PayTR'de callback URL ayarlandı
- [ ] Test ödemesi yapıldı (gerçek kart ile!)
- [ ] Ödeme başarılı ve site aktif oldu
- [ ] Para PayTR hesabına yattı
- [ ] Banka hesabına para çekme testi yapıldı

---

## 🎉 SİSTEM HAZIR!

Artık müşterilerden **GERÇEK PARA** alabilirsin!
Her satışta para otomatik olarak PayTR hesabına yatacak.

**Başarılar! 🚀**
