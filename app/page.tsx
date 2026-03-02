'use client';
import { Rocket, Check, Zap, Shield, Globe, TrendingUp, Store, Sparkles, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* TAM SÜRÜM BANNER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Shield size={24} />
            <span className="font-bold text-lg">✅ TAM SÜRÜM - GERÇEK ÖDEME SİSTEMİ AKTİF</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full mb-8 shadow-lg">
            <Zap size={24} />
            <span className="font-bold text-lg">5 Dakikada Siteniz Hazır!</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            E-Ticaret Siteniz<br />Anında Hazır! 🚀
          </h1>
          
          <p className="text-3xl text-gray-700 mb-12 max-w-4xl mx-auto font-medium">
            Tek seferlik ödeme, ömür boyu kullanım.<br />
            <span className="text-green-600 font-bold">Aylık ücret YOK!</span>
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap mb-16">
            <Link href="/store/demo" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-16 py-5 rounded-2xl font-black text-2xl hover:shadow-2xl hover:scale-105 transition-all">
              🎬 DEMO GÖSTER
            </Link>
            <Link href="/auth/kayit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-16 py-5 rounded-2xl font-black text-2xl hover:shadow-2xl hover:scale-105 transition-all">
              Hemen Başla 🚀
            </Link>
            <Link href="/auth/giris" className="bg-white border-4 border-gray-300 text-gray-700 px-16 py-5 rounded-2xl font-black text-2xl hover:border-blue-600 hover:shadow-xl transition-all">
              Giriş Yap
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <Rocket className="mx-auto mb-4 text-blue-600" size={48} />
              <div className="text-4xl font-black text-blue-600 mb-2">5 dk</div>
              <div className="text-gray-600 font-semibold">Kurulum</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <Shield className="mx-auto mb-4 text-green-600" size={48} />
              <div className="text-4xl font-black text-green-600 mb-2">%100</div>
              <div className="text-gray-600 font-semibold">Güvenli</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <Globe className="mx-auto mb-4 text-purple-600" size={48} />
              <div className="text-4xl font-black text-purple-600 mb-2">0 TL</div>
              <div className="text-gray-600 font-semibold">Aylık Ücret</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <TrendingUp className="mx-auto mb-4 text-pink-600" size={48} />
              <div className="text-4xl font-black text-pink-600 mb-2">∞</div>
              <div className="text-gray-600 font-semibold">Sınırsız</div>
            </div>
          </div>
        </div>
      </section>

      {/* Paketler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-6xl font-black text-center mb-4">Paketlerimiz</h2>
          <p className="text-2xl text-center text-gray-600 mb-16">Tek seferlik ödeme, ömür boyu kullanım!</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-xl p-10 hover:scale-105 transition-all">
              <h3 className="text-3xl font-black mb-4">Hızlı Başlangıç</h3>
              <div className="text-6xl font-black text-blue-600 mb-6">2,499 TL</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-lg"><Check className="text-green-500" size={24} />Bedava domain</li>
                <li className="flex items-center gap-3 text-lg"><Check className="text-green-500" size={24} />Sınırsız ürün</li>
                <li className="flex items-center gap-3 text-lg"><Check className="text-green-500" size={24} />PayTR ödeme</li>
              </ul>
              <Link href="/musteri?package=starter" className="block bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-xl hover:bg-blue-700">
                Seç
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-10 scale-110 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-black text-sm">
                EN POPÜLER
              </div>
              <h3 className="text-3xl font-black mb-4">Profesyonel</h3>
              <div className="text-6xl font-black mb-6">4,999 TL</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-lg"><Check size={24} />Özel domain</li>
                <li className="flex items-center gap-3 text-lg"><Check size={24} />Logo tasarımı</li>
                <li className="flex items-center gap-3 text-lg"><Check size={24} />SEO optimizasyonu</li>
              </ul>
              <Link href="/musteri?package=professional" className="block bg-white text-purple-600 text-center py-4 rounded-xl font-bold text-xl hover:bg-gray-100">
                Seç
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-3xl shadow-xl p-10 hover:scale-105 transition-all">
              <h3 className="text-3xl font-black mb-4">Kurumsal</h3>
              <div className="text-6xl font-black text-purple-600 mb-6">9,999 TL</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-lg"><Check className="text-green-500" size={24} />Özel tasarım</li>
                <li className="flex items-center gap-3 text-lg"><Check className="text-green-500" size={24} />Kargo entegrasyonu</li>
                <li className="flex items-center gap-3 text-lg"><Check className="text-green-500" size={24} />SMS bildirimleri</li>
              </ul>
              <Link href="/musteri?package=enterprise" className="block bg-purple-600 text-white text-center py-4 rounded-xl font-bold text-xl hover:bg-purple-700">
                Seç
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-8">
            Rakipleriniz Aylık Ücret Öderken,<br />Siz Tek Seferlik Ödeyin!
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <div className="text-lg opacity-80 mb-3">Rakipler (3 yıl)</div>
              <div className="text-5xl font-black line-through">10,764 TL</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-8 ring-4 ring-white">
              <div className="text-lg opacity-80 mb-3">Siz (3 yıl)</div>
              <div className="text-5xl font-black">2,499 TL</div>
            </div>
          </div>
          <div className="text-4xl font-black mb-8">8,265 TL TASARRUF! 🎉</div>
          <Link href="/musteri" className="inline-block bg-white text-blue-600 px-16 py-5 rounded-2xl font-black text-2xl hover:shadow-2xl hover:scale-105 transition-all">
            Şimdi Başla
          </Link>
        </div>
      </section>
    </div>
  );
}
