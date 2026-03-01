import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { items, customer } = await req.json();
    
    const total = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );

    // PayTR API bilgileri
    const merchant_id = process.env.PAYTR_MERCHANT_ID || 'MERCHANT_ID';
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'MERCHANT_KEY';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || 'MERCHANT_SALT';
    
    const merchant_oid = 'ORDER_' + Date.now();
    const email = customer.email;
    const payment_amount = Math.round(total * 100); // Kuruş cinsinden
    const user_basket = JSON.stringify(items.map((item: any) => [
      item.title,
      item.price.toFixed(2),
      item.quantity
    ]));
    
    const user_name = customer.name;
    const user_address = customer.address;
    const user_phone = customer.phone;
    const merchant_ok_url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-dukkan.vercel.app'}/success`;
    const merchant_fail_url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-dukkan.vercel.app'}/cart`;
    const user_ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
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
      return NextResponse.json({
        token: result.token,
        paymentUrl: `https://www.paytr.com/odeme/guvenli/${result.token}`
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
