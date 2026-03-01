'use client';
import Link from 'next/link';
import { ShoppingCart, User, Search, Store, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export default function Navbar() {
  const cart = useStore(state => state.cart);
  const [search, setSearch] = useState('');

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Store className="text-white" size={28} />
            </div>
            <div>
              <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MarketPlace
              </div>
              <div className="text-xs text-gray-500 -mt-1">Türkiye'nin #1 Platformu</div>
            </div>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Ne aramıştınız? (iPhone, Laptop, Ayakkabı...)"
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="absolute right-2 top-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/seller" 
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 shadow-lg"
            >
              <Sparkles size={18} />
              Satıcı Ol
            </Link>
            <Link href="/cart" className="relative group">
              <div className="p-2 hover:bg-gray-100 rounded-full transition-all">
                <ShoppingCart size={26} className="group-hover:text-purple-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/profile" className="group">
              <div className="p-2 hover:bg-gray-100 rounded-full transition-all">
                <User size={26} className="group-hover:text-purple-600" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
