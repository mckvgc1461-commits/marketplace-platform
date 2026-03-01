import { NextResponse } from 'next/server';
import Iyzipay from 'iyzipay';

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || 'sandbox-your-api-key',
  secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-your-secret-key',
  uri: 'https://sandbox-api.iyzipay.com'
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const token = formData.get('token') as string;

    return new Promise((resolve) => {
      iyzipay.checkoutForm.retrieve({ 
        locale: Iyzipay.LOCALE.TR,
        conversationId: Date.now().toString(),
        token 
      }, (err: any, result: any) => {
        if (err || result.status !== 'success') {
          resolve(NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/cart`));
        } else {
          resolve(NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/success`));
        }
      });
    });
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/cart`);
  }
}
