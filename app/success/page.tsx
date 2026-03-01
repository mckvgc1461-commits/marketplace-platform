'use client';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const clearCart = useStore(state => state.clearCart);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-md">
        <CheckCircle className="mx-auto mb-6 text-green-500" size={80} />
        <h1 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h1>
        <p className="text-gray-600 mb-8">
          Siparişiniz alındı. Kargo takip numaranız e-posta adresinize gönderilecektir.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Alışverişe Devam Et
        </Link>
      </div>
    </div>
  );
}
