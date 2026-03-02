import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const merchant_oid = formData.get('merchant_oid') as string;
    const status = formData.get('status') as string;
    const total_amount = formData.get('total_amount') as string;
    const hash = formData.get('hash') as string;
    
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || '';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || '';
    
    // Hash kontrolü
    const hashSTR = merchant_oid + merchant_salt + status + total_amount;
    const calculatedHash = crypto.createHmac('sha256', merchant_key).update(hashSTR).digest('base64');
    
    if (hash !== calculatedHash) {
      return new NextResponse('OK', { status: 200 });
    }
    
    // Ödeme başarılı
    if (status === 'success') {
      const { data: pendingStores } = await supabase
        .from('stores')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (pendingStores && pendingStores.length > 0) {
        const store = pendingStores[0];
        
        await supabase
          .from('stores')
          .update({ 
            status: 'active',
            plan: 'professional'
          })
          .eq('id', store.id);
      }
    }
    
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('PayTR Callback Error:', error);
    return new NextResponse('OK', { status: 200 });
  }
}
