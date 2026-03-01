import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { items, customer } = await req.json();
    
    const Iyzipay = require('iyzipay');
    
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || 'sandbox-your-api-key',
      secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-your-secret-key',
      uri: 'https://sandbox-api.iyzipay.com'
    });

    const total = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );

    // Telefonu temizle ve formatla
    const cleanPhone = customer.phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('0') ? '+9' + cleanPhone : '+90' + cleanPhone;

    const request = {
      locale: 'tr',
      conversationId: Date.now().toString(),
      price: total.toFixed(2),
      paidPrice: total.toFixed(2),
      currency: 'TRY',
      basketId: Date.now().toString(),
      paymentGroup: 'PRODUCT',
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-dukkan.vercel.app'}/api/payment-callback`,
      enabledInstallments: [1, 2, 3, 6, 9],
      buyer: {
        id: 'BY' + Date.now(),
        name: customer.name.split(' ')[0] || 'Müşteri',
        surname: customer.name.split(' ').slice(1).join(' ') || 'Adı',
        gsmNumber: formattedPhone,
        email: customer.email,
        identityNumber: '11111111111',
        registrationAddress: customer.address,
        ip: req.headers.get('x-forwarded-for') || '85.34.78.112',
        city: customer.city,
        country: 'Turkey',
        zipCode: '34000'
      },
      shippingAddress: {
        contactName: customer.name,
        city: customer.city,
        country: 'Turkey',
        address: customer.address,
        zipCode: '34000'
      },
      billingAddress: {
        contactName: customer.name,
        city: customer.city,
        country: 'Turkey',
        address: customer.address,
        zipCode: '34000'
      },
      basketItems: items.map((item: any) => ({
        id: item.id,
        name: item.title.substring(0, 50),
        category1: item.category || 'Genel',
        itemType: 'PHYSICAL',
        price: (item.price * item.quantity).toFixed(2)
      }))
    };

    return new Promise((resolve) => {
      iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
        if (err) {
          console.error('Iyzico Error:', err);
          resolve(NextResponse.json({ error: 'Ödeme hatası', details: err }, { status: 500 }));
        } else if (result.status === 'success') {
          resolve(NextResponse.json({ 
            paymentPageUrl: result.paymentPageUrl,
            token: result.token,
            conversationId: request.conversationId
          }));
        } else {
          console.error('Iyzico Result Error:', result);
          resolve(NextResponse.json({ error: 'Ödeme başlatılamadı', details: result }, { status: 500 }));
        }
      });
    });
  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
