'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { Store, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/auth/giris');
      return;
    }

    setUser(user);

    const { data: storeData } = await supabase
      .from('stores')
      .select('*')
      .eq('owner_id', user.id)
      .single();

    setStore(storeData);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Store className="text-blue-600" size={32} />
            <div>
              <div className="font-bold text-lg">{store?.store_name}</div>
              <div className="text-sm text-gray-500">{store?.subdomain}.ai-dukkan.com</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut size={20} />
            Çıkış
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <Package className="text-blue-600 mb-4" size={32} />
            <div className="text-3xl font-bold mb-2">0</div>
            <div className="text-gray-600">Ürünler</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <ShoppingCart className="text-green-600 mb-4" size={32} />
            <div className="text-3xl font-bold mb-2">0</div>
            <div className="text-gray-600">Siparişler</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <Settings className="text-purple-600 mb-4" size={32} />
            <div className="text-3xl font-bold mb-2">{store?.plan}</div>
            <div className="text-gray-600">Plan</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Mağaza Bilgileri</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mağaza Adı</label>
              <div className="text-lg">{store?.store_name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Adresi</label>
              <a 
                href={`https://${store?.subdomain}.ai-dukkan.vercel.app`}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                {store?.subdomain}.ai-dukkan.vercel.app
              </a>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
              <span className={`px-3 py-1 rounded-full text-sm ${
                store?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {store?.status === 'active' ? 'Aktif' : 'Beklemede'}
              </span>
            </div>
          </div>

          {store?.status === 'pending' && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-semibold mb-2">Ödeme Bekleniyor</p>
              <p className="text-yellow-700 text-sm mb-4">
                Sitenizi aktifleştirmek için ödeme yapmanız gerekiyor.
              </p>
              <a
                href="/musteri/odeme"
                className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
              >
                Ödeme Yap
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
