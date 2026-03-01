'use client';
import { useState } from 'react';
import { Rocket, Check, Zap, Shield, Globe, TrendingUp } from 'lucide-react';

export default function MusteriPage() {
  const [selectedPackage, setSelectedPackage] = useState('professional');

  const packages = [
    {
      id: 'starter',
      name: 'Hızlı Başlangıç',
      price: 2499,
      features: [
        '5 dakikada hazır site',
        'Bedava .vercel.app domain',
        'Sınırsız ürün',
        'PayTR ödeme sistemi',
        'Mobil uyumlu',
        'Ömür boyu kullanım',
        '1 ay email desteği'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Profesyonel',
      price: 4999,
      features: [
        '5 dakikada hazır site',
        'Özel domain bağlama',
        'Sınırsız ürün',
        'PayTR ödeme sistemi',
        'Mobil uyumlu',
        'Ömür boyu kullanım',
        'Logo tasarımı',
        '6 ay email desteği',
        'Google SEO optimizasyonu'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Kurumsal',
      price: 9999,
      features: [
        '5 dakikada hazır site',
        'Özel domain + SSL',
        'Sınırsız ürün',
        'PayTR ödeme sistemi',
        'Özel tasarım',
        'Ömür boyu kullanım',
        'Logo + banner tasarımı',
        '1 yıl öncelikli destek',
        'Kargo entegrasyonu',
        'SMS bildirimleri',
        'Gelişmiş raporlar'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Zap size={20} />
            <span className="font-semibold">5 Dakikada Hazır!</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            E-Ticaret Siteniz<br />Anında Hazır!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tek seferlik ödeme, ömür boyu kullanım. Aylık ücret yok!
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Rocket className="mx-auto mb-3 text-blue-600" size={32} />
              <div className="text-3xl font-bold text-blue-600 mb-1">5 dk</div>
              <div className="text-sm text-gray-600">Kurulum Süresi</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Shield className="mx-auto mb-3 text-green-600" size={32} />
              <div className="text-3xl font-bold text-green-600 mb-1">%100</div>
              <div className="text-sm text-gray-600">Güvenli Ödeme</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Globe className="mx-auto mb-3 text-purple-600" size={32} />
              <div className="text-3xl font-bold text-purple-600 mb-1">0 TL</div>
              <div className="text-sm text-gray-600">Aylık Ücret</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <TrendingUp className="mx-auto mb-3 text-pink-600" size={32} />
              <div className="text-3xl font-bold text-pink-600 mb-1">∞</div>
              <div className="text-sm text-gray-600">Sınırsız Ürün</div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                pkg.popular ? 'ring-4 ring-blue-500 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    EN POPÜLER
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-5xl font-black text-blue-600 mb-2">
                  {pkg.price.toLocaleString('tr-TR')} TL
                </div>
                <div className="text-sm text-gray-500">Tek seferlik ödeme</div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPackage(pkg.id)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hemen Başla
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Rakipleriniz Aylık Ücret Öderken, Siz Tek Seferlik Ödeyin!
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-sm opacity-80 mb-2">Rakipler (3 yıl)</div>
              <div className="text-4xl font-bold line-through">10,764 TL</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-6 ring-2 ring-white">
              <div className="text-sm opacity-80 mb-2">Siz (3 yıl)</div>
              <div className="text-4xl font-bold">2,499 TL</div>
            </div>
          </div>
          <div className="text-2xl font-bold mb-6">
            8,265 TL TASARRUF! 🎉
          </div>
          <button className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-xl hover:shadow-2xl transition-all">
            Şimdi Başla ve Tasarruf Et
          </button>
        </div>
      </div>
    </div>
  );
}
