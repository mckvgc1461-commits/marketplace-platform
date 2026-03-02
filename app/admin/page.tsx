'use client';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Her 30 saniyede güncelle
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Stats fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Users className="text-blue-600 mb-4" size={40} />
            <div className="text-3xl font-bold mb-2">{stats?.totalStores || 0}</div>
            <div className="text-gray-600">Toplam Mağaza</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TrendingUp className="text-green-600 mb-4" size={40} />
            <div className="text-3xl font-bold mb-2">{stats?.activeStores || 0}</div>
            <div className="text-gray-600">Aktif Mağaza</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Clock className="text-yellow-600 mb-4" size={40} />
            <div className="text-3xl font-bold mb-2">{stats?.pendingStores || 0}</div>
            <div className="text-gray-600">Bekleyen Ödeme</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <DollarSign className="text-purple-600 mb-4" size={40} />
            <div className="text-3xl font-bold mb-2">{stats?.totalRevenue?.toLocaleString('tr-TR') || 0} TL</div>
            <div className="text-gray-600">Toplam Gelir</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Sistem Durumu</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sunucu</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Çalışıyor</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Bağlı</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">PayTR</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Aktif</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Son Güncelleme</span>
              <span className="text-gray-600">{new Date(stats?.timestamp).toLocaleString('tr-TR')}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">💡 Performans İpuçları</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Render ücretsiz plan: 15 dakika inaktivite sonrası uyur</li>
            <li>• Supabase ücretsiz plan: 500 MB database, 50K kullanıcı</li>
            <li>• PayTR komisyon: %2.9 + 0.25 TL</li>
            <li>• Subdomain routing: Sınırsız müşteri</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
