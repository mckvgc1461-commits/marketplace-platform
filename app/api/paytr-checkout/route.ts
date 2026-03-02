import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://khlremgxaifqxnspaemf.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobHJlbWd4YWlmcXhuc3BhZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTYzNjgsImV4cCI6MjA4Nzk3MjM2OH0.oO45X8NlXNA77qVD1fm8wZC-y_evl8-l98EcPFHzdd8'
);

export async function POST(req: Request) {
  try {
    const { package: packageType, amount, customer } = await req.json();

    // PayTR API bilgileri
    const merchant_id = process.env.PAYTR_MERCHANT_ID || '999999';
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'MERCHANT_KEY';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || 'MERCHANT_SALT';
    
    const merchant_oid = 'SAAS_' + Date.now();
    const email = customer.email;
    const payment_amount = Math.round(amount * 100); // Kuruş cinsinden
    
    // Sepet bilgisi
    const user_basket = JSON.stringify([
      [`E-Ticaret Sitesi - ${packageType}`, amount.toFixed(2), 1]
    ]);
    
    const user_name = customer.name;
    const user_address = customer.address;
    const user_phone = customer.phone;
    const merchant_ok_url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marketplace-platform-saz4.onrender.com'}/success`;
    const merchant_fail_url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marketplace-platform-saz4.onrender.com'}/musteri/odeme`;
    const user_ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const timeout_limit = '30';
    const debug_on = '1';
    const test_mode = '1'; // Test modu
    const no_installment = '0';
    const max_installment = '0';
    const currency = 'TL';
    const lang = 'tr';

    // Hash oluştur
    const hashSTR = merchant_id + user_ip + merchant_oid + email + payment_amount + 
                    user_basket + no_installment + max_installment + currency + test_mode + merchant_salt;
    const paytr_token = crypto.createHmac('sha256', merchant_key).update(hashSTR).digest('base64');

    // PayTR'ye gönderilecek form data
    const formData = new URLSearchParams({
      merchant_id,
      user_ip,
      merchant_oid,
      email,
      payment_amount: payment_amount.toString(),
      paytr_token,
      user_basket,
      debug_on,
      no_installment,
      max_installment,
      user_name,
      user_address,
      user_phone,
      merchant_ok_url,
      merchant_fail_url,
      timeout_limit,
      currency,
      test_mode,
      lang
    });

    // PayTR API'sine istek at
    const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const result = await response.json();

    if (result.status === 'success') {
      // Veritabanına pending store kaydı oluştur
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const subdomain = customer.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        
        await supabase.from('stores').insert({
          owner_id: user.id,
          name: `${customer.name} Mağazası`,
          subdomain: subdomain,
          plan: packageType,
          status: 'pending'
        });
      }

      return NextResponse.json({
        token: result.token
      });
    } else {
      return NextResponse.json({ 
        error: 'Ödeme başlatılamadı',
        reason: result.reason 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('PayTR Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
