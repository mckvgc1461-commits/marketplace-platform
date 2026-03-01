'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Plus } from 'lucide-react';

export default function SellerPanel() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Elektronik',
    stock: '1',
    images: [] as string[],
    seller_name: '',
    seller_phone: '',
    seller_email: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        urls.push(reader.result as string);
        if (urls.length === files.length) {
          setForm({ ...form, images: urls });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('products').insert([{
      title: form.title,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      stock: parseInt(form.stock),
      images: form.images,
      seller_name: form.seller_name,
      seller_phone: form.seller_phone,
      seller_email: form.seller_email,
      status: 'active',
      seller_id: form.seller_email // Email'i ID olarak kullan
    }]);

    if (!error) {
      alert('Ürün başarıyla eklendi!');
      setForm({ 
        title: '', 
        description: '', 
        price: '', 
        category: 'Elektronik', 
        stock: '1', 
        images: [],
        seller_name: '',
        seller_phone: '',
        seller_email: ''
      });
    } else {
      alert('Hata: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ürün Ekle
            </h1>
            <p className="text-gray-600">Ürününüzü ekleyin, anında satışa başlayın!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-4 text-purple-900">Satıcı Bilgileri</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Adınız Soyadınız</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={form.seller_name}
                    onChange={(e) => setForm({ ...form, seller_name: e.target.value })}
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={form.seller_phone}
                    onChange={(e) => setForm({ ...form, seller_phone: e.target.value })}
                    placeholder="Örn: 0532 123 45 67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={form.seller_email}
                    onChange={(e) => setForm({ ...form, seller_email: e.target.value })}
                    placeholder="Örn: ahmet@email.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ürün Başlığı</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Örn: iPhone 15 Pro Max 256GB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Açıklama</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Ürün detaylarını yazın..."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Fiyat (TL)</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option>Elektronik</option>
                  <option>Moda</option>
                  <option>Ev & Yaşam</option>
                  <option>Spor</option>
                  <option>Kitap</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stok</label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ürün Görselleri</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                  Görsel Yükle (Çoklu seçim yapabilirsiniz)
                </label>
                {form.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {form.images.map((img, i) => (
                      <img key={i} src={img} className="w-full h-24 object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Ürünü Yayınla
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
