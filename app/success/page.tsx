'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, Store, Globe, Rocket } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://khlremgxaifqxnspaemf.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobHJlbWd4YWlmcXhuc3BhZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTYzNjgsImV4cCI6MjA4Nzk3MjM2OH0.oO45X8NlXNA77qVD1fm8wZC-y_evl8-l98EcPFHzdd8'
);

export default function SuccessPage() {
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: stores } = await supabase
            .from('stores')
            .select('*')
            .eq('owner_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);
          
          if (stores && stores.length > 0) {
            setStoreInfo(stores[0]);
          }
        }
      } catch (error) {
        console.error('Store fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Mağazanız hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-2xl">
        <CheckCircle className="mx-auto mb-6 text-green-500" size={100} />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tebrikler! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          E-ticaret siteniz başarıyla oluşturuldu!
        </p>

        {storeInfo && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="grid gap-4 text-left">
              <div className="flex items-center gap-3">
                <Store className="text-blue-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600">Mağaza Adı</div>
                  <div className="font-bold text-lg">{storeInfo.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-purple-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600">Subdomain</div>
                  <div className="font-bold text-lg">{storeInfo.subdomain}.ai-dukkan.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Rocket className="text-pink-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600">Durum</div>
                  <div className="font-bold text-lg text-green-600">
                    {storeInfo.status === 'active' ? 'Aktif ✓' : 'Hazırlanıyor...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Panelime Git
          </Link>
          <Link
            href="/"
            className="block bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 transition-all"
          >
            Ana Sayfaya Dön
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">
            📧 Giriş bilgileriniz e-posta adresinize gönderildi.
          </p>
        </div>
      </div>
    </div>
  );
}
