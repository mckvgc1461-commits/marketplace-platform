import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://khlremgxaifqxnspaemf.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobHJlbWd4YWlmcXhuc3BhZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTYzNjgsImV4cCI6MjA4Nzk3MjM2OH0.oO45X8NlXNA77qVD1fm8wZC-y_evl8-l98EcPFHzdd8'
);

export async function GET() {
  try {
    // Toplam store sayısı
    const { count: totalStores } = await supabase
      .from('stores')
      .select('*', { count: 'exact', head: true });

    // Aktif store sayısı
    const { count: activeStores } = await supabase
      .from('stores')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Bekleyen ödemeler
    const { count: pendingStores } = await supabase
      .from('stores')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Toplam gelir (aktif store'ların payment_amount toplamı)
    const { data: stores } = await supabase
      .from('stores')
      .select('payment_amount')
      .eq('status', 'active');

    const totalRevenue = stores?.reduce((sum, store) => sum + (Number(store.payment_amount) || 0), 0) || 0;

    return NextResponse.json({
      totalStores: totalStores || 0,
      activeStores: activeStores || 0,
      pendingStores: pendingStores || 0,
      totalRevenue: totalRevenue,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
