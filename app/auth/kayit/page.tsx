'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, User, Store, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function KayitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    storeName: '',
    subdomain: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Kullanıcı kaydı
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            store_name: form.storeName,
            subdomain: form.subdomain
          }
        }
      });

      if (authError) throw authError;

      // 2. Mağaza oluştur
      const { error: storeError } = await supabase
        .from('stores')
        .insert([{
          owner_id: authData.user?.id,
          store_name: form.storeName,
          subdomain: form.subdomain.toLowerCase(),
          contact_email: form.email,
          status: 'pending'
        }]);

      if (storeError) throw storeError;

      // 3. Ödeme sayfasına yönlendir
      router.push('/musteri/odeme?subdomain=' + form.subdomain);

    } catch (err: any) {
      setError(err.message || 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  const checkSubdomain = (value: string) => {
    const clean = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setForm({ ...form, subdomain: clean });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Store size={20} />
            <span className="font-semibold">Ücretsiz Dene</span>
          </div>
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hemen Başla
          </h1>
          <p className="text-gray-600">5 dakikada siteniz hazır!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Mağaza Adı</label>
              <div className="relative">
                <Store className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Ahmet'in Dükkanı"
                  value={form.storeName}
                  onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Site Adresi</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="ahmet"
                  value={form.subdomain}
                  onChange={(e) => checkSubdomain(e.target.value)}
                />
                <span className="absolute right-3 top-3 text-gray-400 text-sm">
                  .ai-dukkan.com
                </span>
              </div>
              {form.subdomain && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ {form.subdomain}.ai-dukkan.com
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="En az 6 karakter"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Oluşturuluyor...
                </>
              ) : (
                <>
                  Devam Et
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Zaten hesabınız var mı?{' '}
            <Link href="/auth/giris" className="text-blue-600 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Kayıt olarak{' '}
          <a href="#" className="underline">Kullanım Koşulları</a>
          {' '}ve{' '}
          <a href="#" className="underline">Gizlilik Politikası</a>
          'nı kabul etmiş olursunuz.
        </div>
      </div>
    </div>
  );
}
