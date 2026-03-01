'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, CreditCard } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QdVVvP8example');

function CheckoutForm({ total, customerInfo }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { clearCart } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Ödeme başarısız');
      setLoading(false);
    } else {
      clearCart();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm opacity-80">Ödenecek Tutar</span>
          <CreditCard size={32} />
        </div>
        <div className="text-4xl font-bold">{total.toFixed(2)} TL</div>
        <div className="text-sm opacity-80 mt-2">{customerInfo.name}</div>
      </div>

      <PaymentElement />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            İşleniyor...
          </>
        ) : (
          <>
            <Lock size={20} />
            {total.toFixed(2)} TL Öde
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        🔒 256-bit SSL şifreleme ile güvenli ödeme
      </p>
    </form>
  );
}

export default function PaymentPage() {
  const { cart, total } = useStore();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [customerInfo, setCustomerInfo] = useState<any>(null);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const customer = {
      name: params.get('name') || '',
      phone: params.get('phone') || '',
      email: params.get('email') || '',
      address: params.get('address') || '',
      city: params.get('city') || ''
    };
    setCustomerInfo(customer);

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total(),
        customer
      })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret || !customerInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Lock className="text-green-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Güvenli Ödeme</h1>
            <p className="text-gray-600">Stripe ile güvenli ödeme - TC kimlik gerekmez</p>
          </div>

          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm total={total()} customerInfo={customerInfo} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
