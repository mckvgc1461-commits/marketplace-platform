'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CreditCard, Lock } from 'lucide-react';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const total = searchParams.get('total') || '0';
  const customerName = searchParams.get('name') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simüle edilmiş ödeme işlemi (2 saniye bekle)
    setTimeout(() => {
      // Gerçek sistemde burada Iyzico API'sine istek atılacak
      router.push('/success');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Lock className="text-green-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Güvenli Ödeme</h1>
            <p className="text-gray-600">256-bit SSL şifreleme ile korunmaktadır</p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm opacity-80">Ödenecek Tutar</span>
              <CreditCard size={32} />
            </div>
            <div className="text-4xl font-bold">{parseFloat(total).toFixed(2)} TL</div>
            <div className="text-sm opacity-80 mt-2">{customerName}</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Kart Numarası</label>
              <input
                type="text"
                required
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                value={cardInfo.number}
                onChange={(e) => setCardInfo({ ...cardInfo, number: formatCardNumber(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kart Üzerindeki İsim</label>
              <input
                type="text"
                required
                placeholder="AD SOYAD"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 uppercase"
                value={cardInfo.name}
                onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value.toUpperCase() })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Son Kullanma Tarihi</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={cardInfo.expiry}
                  onChange={(e) => setCardInfo({ ...cardInfo, expiry: formatExpiry(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  required
                  maxLength={3}
                  placeholder="123"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={cardInfo.cvv}
                  onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value.replace(/\D/g, '') })}
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-yellow-800 mb-2">Test Kartı Bilgileri:</p>
              <p className="text-yellow-700">Kart: 5528 7900 0000 0001</p>
              <p className="text-yellow-700">Tarih: 12/30 | CVV: 123</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Ödeme İşleniyor...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  {parseFloat(total).toFixed(2)} TL Öde
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Bu ödeme sayfası test amaçlıdır. Gerçek para çekilmez.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
