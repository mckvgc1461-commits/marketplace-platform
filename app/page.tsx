'use client';
import { Rocket, Check, Zap, Shield, Globe, TrendingUp, Store, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Zap size={20} />
              <span className="font-semibold">5 Dakikada Hazır!</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              E-Ticaret Siteniz<br />Anında Hazır! v2.0
            </h1>
            <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Tek seferlik ödeme, ömür boyu kullanım. Aylık ücret yok!
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Link href="/musteri" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:shadow-2xl transition-all">
                Paketleri Gör 🚀
              </Link>
              <Link href="/auth/giris" className="bg-white border-2 border-gray-300 text-gray-700 px-12 py-4 rounded-xl font-bold text-xl hover:border-blue-600 transition-all">
                Giriş Yap
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
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
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-xl text-gray-600">Rakiplerimizden farklı olarak, gerçekten ÜCRETSİZ!</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <Store className="text-blue-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Anında Kurulum</h3>
              <p className="text-gray-700">5 dakikada e-ticaret siteniz hazır. Hosting, domain, ödeme sistemi - her şey dahil!</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <Shield className="text-purple-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Güvenli Ödeme</h3>
              <p className="text-gray-700">PayTR entegrasyonu ile Türkiye'nin en güvenli ödeme altyapısı. TC kimlik gerektirmez!</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl">
              <Sparkles className="text-pink-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Ömür Boyu Kullanım</h3>
              <p className="text-gray-700">Tek seferlik ödeme, aylık ücret yok. Sınırsız ürün, sınırsız sipariş!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-6">Paketlerimiz</h2>
          <p className="text-xl text-gray-600 mb-12">Tek seferlik ödeme, ömür boyu kullanım!</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Hızlı Başlangıç</h3>
              <div className="text-5xl font-black text-blue-600 mb-4">2,499 TL</div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2"><Check className="text-green-500" size={20} />Bedava domain</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={20} />Sınırsız ürün</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={20} />PayTR ödeme</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 scale-105">
              <div className="bg-yellow-300 text-purple-900 px-4 py-1 rounded-full text-sm font-bold inline-block mb-2">
                EN POPÜLER
              </div>
              <h3 className="text-2xl font-bold mb-2">Profesyonel</h3>
              <div className="text-5xl font-black mb-4">4,999 TL</div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2"><Check size={20} />Özel domain</li>
                <li className="flex items-center gap-2"><Check size={20} />Logo tasarımı</li>
                <li className="flex items-center gap-2"><Check size={20} />SEO optimizasyonu</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-2">Kurumsal</h3>
              <div className="text-5xl font-black text-purple-600 mb-4">9,999 TL</div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2"><Check className="text-green-500" size={20} />Özel tasarım</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={20} />Kargo entegrasyonu</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={20} />SMS bildirimleri</li>
              </ul>
            </div>
          </div>
          
          <Link href="/musteri" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-16 py-5 rounded-xl font-bold text-2xl hover:shadow-2xl transition-all">
            Tüm Paketleri Gör
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
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
          <div className="text-3xl font-bold mb-6">8,265 TL TASARRUF! 🎉</div>
          <Link href="/musteri" className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-xl hover:shadow-2xl transition-all">
            Şimdi Başla ve Tasarruf Et
          </Link>
        </div>
      </section>
    </div>
  );
}
