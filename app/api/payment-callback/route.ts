import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://khlremgxaifqxnspaemf.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobHJlbWd4YWlmcXhuc3BhZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTYzNjgsImV4cCI6MjA4Nzk3MjM2OH0.oO45X8NlXNA77qVD1fm8wZC-y_evl8-l98EcPFHzdd8'
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const token = formData.get('token') as string;

    const Iyzipay = require('iyzipay');
    
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || 'sandbox-your-api-key',
      secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-your-secret-key',
      uri: 'https://sandbox-api.iyzipay.com'
    });

    return new Promise((resolve) => {
      iyzipay.checkoutForm.retrieve({ 
        locale: 'tr',
        conversationId: Date.now().toString(),
        token 
      }, async (err: any, result: any) => {
        if (err || result.status !== 'success') {
          resolve(NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-dukkan.vercel.app'}/cart`));
        } else {
          // Ödeme başarılı - Siparişi kaydet
          try {
            const orderData = {
              user_id: result.buyer?.id || 'guest',
              products: result.basketItems || [],
              total: parseFloat(result.paidPrice || '0'),
              status: 'paid',
              payment_intent_id: result.paymentId,
              customer_name: result.shippingAddress?.contactName,
              customer_phone: result.buyer?.gsmNumber,
              customer_email: result.buyer?.email,
              customer_address: result.shippingAddress?.address,
              customer_city: result.shippingAddress?.city
            };

            await supabase.from('orders').insert([orderData]);
          } catch (dbError) {
            console.error('Database error:', dbError);
          }

          resolve(NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-dukkan.vercel.app'}/success`));
        }
      });
    });
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-dukkan.vercel.app'}/cart`);
  }
}
