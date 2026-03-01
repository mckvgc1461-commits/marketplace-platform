'use client';
import { useStore } from '../store/useStore';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useStore();

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    });

    const { paymentPageUrl } = await response.json();
    if (paymentPageUrl) {
      window.location.href = paymentPageUrl;
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sepetiniz Boş</h2>
          <a href="/" className="text-blue-600 hover:underline">Alışverişe devam et</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Sepetim</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
              <img src={item.images[0]} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-blue-600 font-bold">{item.price.toFixed(2)} TL</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 border rounded hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 border rounded hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between mb-4">
            <span className="text-lg">Ara Toplam:</span>
            <span className="text-lg font-semibold">{total().toFixed(2)} TL</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg">Kargo:</span>
            <span className="text-lg font-semibold text-green-600">ÜCRETSİZ</span>
          </div>
          <div className="border-t pt-4 flex justify-between mb-6">
            <span className="text-xl font-bold">Toplam:</span>
            <span className="text-xl font-bold text-blue-600">{total().toFixed(2)} TL</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Ödemeye Geç
          </button>
        </div>
      </div>
    </div>
  );
}
