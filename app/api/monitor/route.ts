import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://khlremgxaifqxnspaemf.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobHJlbWd4YWlmcXhuc3BhZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTYzNjgsImV4cCI6MjA4Nzk3MjM2OH0.oO45X8NlXNA77qVD1fm8wZC-y_evl8-l98EcPFHzdd8'
);

export async function GET() {
  const checks = {
    server: false,
    database: false,
    memory: false,
    timestamp: new Date().toISOString()
  };

  try {
    // Server check
    checks.server = true;

    // Database check
    const { error } = await supabase.from('stores').select('id').limit(1);
    checks.database = !error;

    // Memory check (Node.js)
    const memUsage = process.memoryUsage();
    const memUsageMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    checks.memory = memUsageMB < 400; // Alert if > 400MB

    const allHealthy = checks.server && checks.database && checks.memory;

    return NextResponse.json({
      status: allHealthy ? 'healthy' : 'degraded',
      checks,
      memoryUsageMB: Math.round(memUsage.heapUsed / 1024 / 1024),
      uptime: process.uptime()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      checks,
      error: 'System check failed'
    }, { status: 500 });
  }
}
