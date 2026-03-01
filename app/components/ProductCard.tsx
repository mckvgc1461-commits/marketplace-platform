'use client';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore(state => state.addToCart);

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'}
          alt={product.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          YENİ
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.8)</span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-purple-600 line-clamp-2 min-h-[56px]">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-black text-purple-600">
              ₺{product.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 line-through">₺{(product.price * 1.3).toFixed(2)}</div>
          </div>
          <div className="text-green-600 text-sm font-semibold">
            Ücretsiz Kargo
          </div>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <ShoppingCart size={20} />
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}
