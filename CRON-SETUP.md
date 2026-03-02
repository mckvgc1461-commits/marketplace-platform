# Render'ı Uyandırmak İçin Cron Job

## Sorun:
Render ücretsiz plan 15 dakika inaktivite sonrası uyur.
İlk istek 30 saniye sürer (cold start).

## Çözüm:
Her 10 dakikada bir health check yapan ücretsiz cron job.

---

## Yöntem 1: Cron-Job.org (Ücretsiz)

1. https://cron-job.org adresine git
2. Ücretsiz hesap aç
3. "Create Cronjob" butonuna tıkla
4. Ayarlar:
   - Title: `Render Keep Alive`
   - URL: `https://marketplace-platform-saz4.onrender.com/api/health`
   - Schedule: `*/10 * * * *` (Her 10 dakika)
   - Enabled: ✅
5. Save

---

## Yöntem 2: UptimeRobot (Ücretsiz)

1. https://uptimerobot.com adresine git
2. Ücretsiz hesap aç
3. "Add New Monitor" butonuna tıkla
4. Ayarlar:
   - Monitor Type: `HTTP(s)`
   - Friendly Name: `Render Keep Alive`
   - URL: `https://marketplace-platform-saz4.onrender.com/api/health`
   - Monitoring Interval: `5 minutes`
5. Create Monitor

---

## Yöntem 3: GitHub Actions (Ücretsiz)

`.github/workflows/keep-alive.yml` dosyası oluştur:

```yaml
name: Keep Render Alive

on:
  schedule:
    - cron: '*/10 * * * *'  # Her 10 dakika
  workflow_dispatch:

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Render
        run: curl https://marketplace-platform-saz4.onrender.com/api/health
```

---

## Test:

Tarayıcıda aç:
https://marketplace-platform-saz4.onrender.com/api/health

Görmeli:
```json
{
  "status": "ok",
  "timestamp": "2026-03-02T...",
  "message": "Server is running"
}
```

---

## Sonuç:

✅ Render her zaman uyanık kalacak
✅ Kullanıcılar hızlı yanıt alacak
✅ Cold start olmayacak
