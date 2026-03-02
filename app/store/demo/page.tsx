'use client';
import { useState } from 'react';
import { ShoppingCart, Heart, Star, Package, CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Demo ürünler
const demoProducts = [
  { id: 1, name: 'Premium Kulaklık', price: 299, image: '🎧', category: 'Elektronik', rating: 4.8 },
  { id: 2, name: 'Akıllı Saat', price: 1299, image: '⌚', category: 'Elektronik', rating: 4.9 },
  { id: 3, name: 'Bluetooth Hoparlör', price: 499, image: '🔊', category: 'Elektronik', rating: 4.7 },
  { id: 4, name: 'Laptop Çantası', price: 199, image: '💼', category: 'Aksesuar', rating: 4.6 },
  { id: 5, name: 'Wireless Mouse', price: 149, image: '🖱️', category: 'Elektronik', rating: 4.5 },
  { id: 6, name: 'Mekanik Klavye', price: 899, image: '⌨️', category: 'Elektronik', rating: 4.9 },
  { id: 7, name: 'USB-C Hub', price: 249, image: '🔌', category: 'Aksesuar', rating: 4.4 },
  { id: 8, name: 'Webcam HD', price: 399, image: '📷', category: 'Elektronik', rating: 4.7 },
  { id: 9, name: 'Telefon Kılıfı', price: 79, image: '📱', category: 'Aksesuar', rating: 4.3 },
  { id: 10, name: 'Powerbank 20000mAh', price: 299, image: '🔋', category: 'Elektronik', rating: 4.8 },
  { id: 11, name: 'Selfie Çubuğu', price: 99, image: '🤳', category: 'Aksesuar', rating: 4.2 },
  { id: 12, name: 'LED Işık Şeridi', price: 179, image: '💡', category: 'Aksesuar', rating: 4.6 },
];

export default function DemoStorePage() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setShowCart(true);
    setTimeout(() => setShowCart(false), 2000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DEMO BANNER */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package size={28} />
              <div>
                <div className="font-black text-xl">🎬 DEMO MAĞAZA</div>
                <div className="text-sm opacity-90">Bu bir örnek e-ticaret sitesidir</div>
              </div>
            </div>
            <Link href="/" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 flex items-center gap-2">
              <ArrowLeft size={20} />
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🛍️</div>
              <div>
                <h1 className="text-2xl font-black text-gray-800">Demo Mağaza</h1>
                <p className="text-sm text-gray-600">demo.ai-dukkan.com</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Sepet ({cart.length})
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sepet Popup */}
      {showCart && cart.length > 0 && (
        <div className="fixed top-24 right-4 bg-white rounded-2xl shadow-2xl p-6 z-50 w-96 border-4 border-green-500">
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <ShoppingCart size={24} />
            <span className="font-bold text-lg">Demo Sepet</span>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              🎬 Bu bir demo sitedir. Gerçek ödeme yapılmaz.
            </p>
          </div>
          <div className="space-y-2">
            {cart.slice(-3).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span>{item.image} {item.name}</span>
                <span className="font-bold">{item.price} TL</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Toplam:</span>
              <span className="text-blue-600">{totalPrice} TL</span>
            </div>
            <Link href="/musteri" className="block bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 rounded-xl font-bold hover:shadow-lg">
              Kendi Sitenizi Açın
            </Link>
          </div>
        </div>
      )}

      {/* Özellikler */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck size={32} />
              <div className="text-left">
                <div className="font-bold">Ücretsiz Kargo</div>
                <div className="text-sm opacity-90">500 TL üzeri</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield size={32} />
              <div className="text-left">
                <div className="font-bold">Güvenli Ödeme</div>
                <div className="text-sm opacity-90">SSL sertifikalı</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CreditCard size={32} />
              <div className="text-left">
                <div className="font-bold">Taksit İmkanı</div>
                <div className="text-sm opacity-90">9 taksit</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ürünler */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-black mb-8">Tüm Ürünler</h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {demoProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 group">
              <div className="text-center mb-4">
                <div className="text-7xl mb-4">{product.image}</div>
                <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                  {product.category}
                </div>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <span className="text-sm font-bold">{product.rating}</span>
                </div>
                <div className="text-3xl font-black text-blue-600 mb-4">
                  {product.price} TL
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Demo Sepete Ekle
              </button>
              <div className="mt-2 text-xs text-center text-gray-500">
                🎬 Demo - Gerçek ödeme yok
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-6">
            Sizin de Böyle Bir Siteniz Olsun! 🚀
          </h2>
          <p className="text-2xl mb-8 opacity-90">
            5 dakikada kurulum, ömür boyu kullanım
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/musteri" className="bg-white text-green-600 px-12 py-5 rounded-2xl font-black text-2xl hover:shadow-2xl hover:scale-105 transition-all">
              Hemen Başla
            </Link>
            <Link href="/" className="bg-white/20 backdrop-blur text-white px-12 py-5 rounded-2xl font-black text-2xl hover:bg-white/30 transition-all">
              Ana Sayfa
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="text-2xl font-bold mb-2">Demo Mağaza</h3>
          <p className="text-gray-400 mb-6">Bu bir örnek e-ticaret sitesidir</p>
          <div className="text-sm text-gray-500">
            © 2024 AI Dükkan - Tüm hakları saklıdır
          </div>
        </div>
      </footer>
    </div>
  );
}
