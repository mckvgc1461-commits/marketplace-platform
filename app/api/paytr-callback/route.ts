import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://khlremgxaifqxnspaemf.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtobHJlbWd4YWlmcXhuc3BhZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTYzNjgsImV4cCI6MjA4Nzk3MjM2OH0.oO45X8NlXNA77qVD1fm8wZC-y_evl8-l98EcPFHzdd8';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const merchant_oid = formData.get('merchant_oid') as string;
    const status = formData.get('status') as string;
    const total_amount = formData.get('total_amount') as string;
    const hash = formData.get('hash') as string;
    const failed_reason_code = formData.get('failed_reason_code') as string;
    const failed_reason_msg = formData.get('failed_reason_msg') as string;
    
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || '';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '';
    
    // Hash kontrolü - GÜVENLİK ÖNEMLİ!
    const hashSTR = merchant_oid + merchant_salt + status + total_amount;
    const calculatedHash = crypto.createHmac('sha256', merchant_key).update(hashSTR).digest('base64');
    
    // Hash eşleşmiyorsa sahte istek olabilir
    if (hash !== calculatedHash) {
      console.error('PayTR Callback: Hash mismatch! Possible fraud attempt.');
      return new NextResponse('OK', { status: 200 }); // PayTR'ye OK dönmeliyiz
    }
    
    // Ödeme başarılı
    if (status === 'success') {
      // merchant_oid ile store'u bul ve aktifleştir
      const { data: stores } = await supabase
        .from('stores')
        .select('*')
        .eq('merchant_oid', merchant_oid)
        .eq('status', 'pending');
      
      if (stores && stores.length > 0) {
        const store = stores[0];
        
        // Store'u aktifleştir
        await supabase
          .from('stores')
          .update({ 
            status: 'active',
            activated_at: new Date().toISOString()
          })
          .eq('id', store.id);
        
        console.log(`✅ Store activated: ${store.subdomain} - Payment: ${Number(total_amount)/100} TL`);
        
        // TODO: Burada email gönderimi yapılabilir
        // - Müşteriye "Siteniz hazır" maili
        // - Admin'e "Yeni satış" bildirimi
      }
    } else {
      // Ödeme başarısız
      console.error(`❌ Payment failed: ${merchant_oid} - Reason: ${failed_reason_msg} (${failed_reason_code})`);
      
      // Başarısız ödemeyi logla
      const { data: stores } = await supabase
        .from('stores')
        .select('*')
        .eq('merchant_oid', merchant_oid);
      
      if (stores && stores.length > 0) {
        await supabase
          .from('stores')
          .update({ 
            status: 'failed',
            failed_reason: failed_reason_msg
          })
          .eq('id', stores[0].id);
      }
    }
    
    // PayTR'ye MUTLAKA "OK" dönmeliyiz
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('PayTR Callback Error:', error);
    // Hata olsa bile PayTR'ye OK dönmeliyiz
    return new NextResponse('OK', { status: 200 });
  }
}
