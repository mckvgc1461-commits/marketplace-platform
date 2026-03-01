'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';

export default function StorePage() {
  const searchParams = useSearchParams();
  const subdomain = searchParams.get('subdomain');
  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subdomain) {
      loadStore();
    }
  }, [subdomain]);

  async function loadStore() {
    // Mağazayı bul
    const { data: storeData } = await supabase
      .from('stores')
      .select('*')
      .eq('subdomain', subdomain)
      .eq('status', 'active')
      .single();

    if (!storeData) {
      setLoading(false);
      return;
    }

    setStore(storeData);

    // Ürünleri yükle
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', storeData.id)
      .eq('status', 'active');

    setProducts(productsData || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Mağaza Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Bu mağaza mevcut değil veya kapatılmış.</p>
          <a href="https://ai-dukkan.vercel.app" className="text-blue-600 hover:underline">
            Ana sayfaya dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold" style={{ color: store.theme_color }}>
            {store.store_name}
          </h1>
          {store.description && (
            <p className="text-gray-600 mt-2">{store.description}</p>
          )}
        </div>
      </header>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {products.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Henüz Ürün Yok</h2>
            <p className="text-gray-600">Bu mağazada henüz ürün bulunmuyor.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>{store.store_name} - Powered by AI Dükkan</p>
          {store.contact_email && (
            <p className="text-sm text-gray-400 mt-2">İletişim: {store.contact_email}</p>
          )}
        </div>
      </footer>
    </div>
  );
}
