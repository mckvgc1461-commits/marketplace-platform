import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { productName } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ description: productName }, { status: 200 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [{ role: "system", content: "Sen bir SEO uzmanısın. Türkçe yanıt ver." }, { role: "user", content: productName }],
      }),
    });
    const data = await response.json();
    return NextResponse.json({ description: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ description: "Hata!" }, { status: 500 });
  }
}