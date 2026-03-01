'use client';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import ProductCard from './components/ProductCard';
import { Product } from './types';
import { TrendingUp, Package, Shield, Zap, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(12);
    
    if (data) setProducts(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Modern Gradient */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Türkiye'nin #1 E-Ticaret Platformu</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Hayalinizdeki Mağazayı<br />
            <span className="text-yellow-300">5 Dakikada</span> Açın
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto">
            Hosting, domain, ödeme sistemi - HER ŞEY HAZIR! Sadece ürünlerinizi ekleyin ve satışa başlayın.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/musteri" className="bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all shadow-2xl hover:scale-105">
              KENDİ SİTENİ KUR 🚀
            </Link>
            <Link href="/seller" className="bg-white/10 backdrop-blur-sm border-2 border-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              ÜRÜN SAT
            </Link>
          </div>
          <div className="mt-8 flex gap-8 justify-center text-sm">
            <div className="flex items-center gap-2">
              <Star className="fill-yellow-300 text-yellow-300" size={20} />
              <span>Kredi Kartı Gerektirmez</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="fill-yellow-300 text-yellow-300" size={20} />
              <span>Sınırsız Ürün</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="fill-yellow-300 text-yellow-300" size={20} />
              <span>Gerçek Ödeme Sistemi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-black mb-2">50K+</div>
            <div className="text-gray-400">Aktif Mağaza</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">2M+</div>
            <div className="text-gray-400">Mutlu Müşteri</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">%100</div>
            <div className="text-gray-400">Ücretsiz Başlangıç</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">24/7</div>
            <div className="text-gray-400">Destek</div>
          </div>
        </div>
      </section>

      {/* Features - Modern Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-xl text-gray-600">Rakiplerimizden farklı olarak, gerçekten ÜCRETSİZ!</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Güvenli Ödeme</h3>
              <p className="text-gray-600">Stripe entegrasyonu ile dünya standardında güvenlik</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Anında Kurulum</h3>
              <p className="text-gray-600">5 dakikada mağazanız hazır, hosting otomatik</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Package className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Sınırsız Ürün</h3>
              <p className="text-gray-600">İstediğiniz kadar ürün ekleyin, limit yok</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">SEO Optimizasyonu</h3>
              <p className="text-gray-600">Google'da otomatik görünün, reklam gerektirmez</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600">Binlerce satıcıdan milyonlarca ürün</p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="mx-auto mb-4 text-gray-400" size={64} />
              <h3 className="text-2xl font-bold mb-2">Henüz Ürün Yok</h3>
              <p className="text-gray-600 mb-6">İlk satıcı siz olun!</p>
              <Link href="/seller" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700">
                Ürün Ekle
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-6">Hemen Başlayın!</h2>
          <p className="text-xl mb-8 opacity-90">
            Kredi kartı gerektirmez. Kurulum ücreti yok. Aylık ücret yok. Sadece satış yaptığınızda küçük bir komisyon.
          </p>
          <Link href="/seller" className="inline-block bg-white text-purple-600 px-12 py-5 rounded-xl font-black text-xl hover:bg-yellow-300 hover:text-purple-700 transition-all shadow-2xl hover:scale-105">
            ÜCRETSİZ MAĞAZA AÇ 🎉
          </Link>
          <p className="mt-6 text-sm opacity-75">30 saniyede kayıt olun, 5 dakikada satışa başlayın</p>
        </div>
      </section>
    </div>
  );
}
