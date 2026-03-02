'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function OdemeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('professional');

  const packages = {
    starter: { name: 'Hızlı Başlangıç', price: 2499 },
    professional: { name: 'Profesyonel', price: 4999 },
    enterprise: { name: 'Kurumsal', price: 9999 }
  };

  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg && packages[pkg as keyof typeof packages]) {
      setSelectedPackage(pkg);
    }
  }, [searchParams]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      const paymentData = {
        package: selectedPackage,
        amount: packages[selectedPackage as keyof typeof packages].price,
        customer: {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          country: formData.get('country')
        }
      };

      const response = await fetch('/api/paytr-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (data.token) {
        window.location.href = `https://www.paytr.com/odeme/guvenli/${data.token}`;
      } else {
        alert('Ödeme başlatılamadı: ' + (data.error || 'Bilinmeyen hata'));
      }
    } catch (error) {
      alert('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const pkg = packages[selectedPackage as keyof typeof packages];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/musteri" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={20} />
          Geri Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">Ödeme</h1>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-80">Seçilen Paket</div>
                <div className="text-2xl font-bold">{pkg.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Toplam</div>
                <div className="text-4xl font-black">{pkg.price.toLocaleString('tr-TR')} TL</div>
              </div>
            </div>
          </div>

          <form onSubmit={handlePayment} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ahmet Yılmaz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefon</label>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="5551234567"
              />
              <p className="text-xs text-gray-500 mt-1">Başında 0 olmadan 10 haneli telefon numarası</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Adres</label>
              <textarea
                name="address"
                required
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Tam adresiniz"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Şehir</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="İstanbul"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ülke</label>
                <input
                  type="text"
                  name="country"
                  required
                  value="Türkiye"
                  readOnly
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Lock className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm text-blue-800">
                <div className="font-semibold mb-1">Güvenli Ödeme</div>
                <div>PayTR güvenli ödeme altyapısı ile kredi kartı bilgileriniz şifrelenir ve güvenle işlenir.</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Ödeme Sayfasına Yönlendiriliyor...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Ödemeye Geç ({pkg.price.toLocaleString('tr-TR')} TL)
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-500">
              Ödeme sonrası siteniz otomatik olarak aktifleştirilecektir.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OdemePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <OdemeContent />
    </Suspense>
  );
}
