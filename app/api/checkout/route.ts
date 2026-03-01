import { NextResponse } from 'next/server';
import Iyzipay from 'iyzipay';

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || 'sandbox-your-api-key',
  secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-your-secret-key',
  uri: 'https://sandbox-api.iyzipay.com' // Canlı için: https://api.iyzipay.com
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    
    const total = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: Date.now().toString(),
      price: total.toFixed(2),
      paidPrice: total.toFixed(2),
      currency: Iyzipay.CURRENCY.TRY,
      basketId: Date.now().toString(),
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-callback`,
      enabledInstallments: [1, 2, 3, 6, 9],
      buyer: {
        id: 'BY789',
        name: 'Müşteri',
        surname: 'Adı',
        gsmNumber: '+905350000000',
        email: 'musteri@email.com',
        identityNumber: '74300864791',
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
      },
      shippingAddress: {
        contactName: 'Müşteri Adı',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34732'
      },
      billingAddress: {
        contactName: 'Müşteri Adı',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34732'
      },
      basketItems: items.map((item: any) => ({
        id: item.id,
        name: item.title,
        category1: item.category || 'Genel',
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: (item.price * item.quantity).toFixed(2)
      }))
    };

    return new Promise((resolve) => {
      iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
        if (err) {
          resolve(NextResponse.json({ error: err }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ 
            paymentPageUrl: result.paymentPageUrl,
            token: result.token 
          }));
        }
      });
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
