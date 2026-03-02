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
  const [products, setProducts] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image_url: ''
  });

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

    // Ürünleri yükle
    if (storeData) {
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', storeData.id)
        .order('created_at', { ascending: false });
      
      setProducts(productsData || []);
    }

    setLoading(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('products').insert([{
      store_id: store.id,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      stock: parseInt(newProduct.stock),
      image_url: newProduct.image_url,
      is_active: true
    }]);

    if (!error) {
      setShowAddProduct(false);
      setNewProduct({ name: '', price: '', description: '', stock: '', image_url: '' });
      checkUser(); // Yenile
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Ürünü silmek istediğinize emin misiniz?')) {
      await supabase.from('products').delete().eq('id', id);
      checkUser(); // Yenile
    }
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
              <div className="font-bold text-lg">{store?.name}</div>
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
            <div className="text-3xl font-bold mb-2">{products.length}</div>
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

        {/* ÜRÜN YÖNETİMİ */}
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Ürünlerim</h2>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {showAddProduct ? 'İptal' : '+ Yeni Ürün Ekle'}
            </button>
          </div>

          {/* ÜRÜN EKLEME FORMU */}
          {showAddProduct && (
            <form onSubmit={handleAddProduct} className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ürün Adı</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fiyat (TL)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stok</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Resim URL</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://..."
                    value={newProduct.image_url}
                    onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700"
              >
                Ürünü Kaydet
              </button>
            </form>
          )}

          {/* ÜRÜN LİSTESİ */}
          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p>Henüz ürün eklemediniz</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} className="w-full h-32 object-cover rounded mb-3" />
                  )}
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-blue-600">{product.price} TL</span>
                    <span className="text-sm text-gray-500">Stok: {product.stock}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-full bg-red-100 text-red-600 py-2 rounded hover:bg-red-200"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Mağaza Bilgileri</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mağaza Adı</label>
              <div className="text-lg">{store?.name}</div>
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
        </div>
      </div>
    </div>
  );
}
