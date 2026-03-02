import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "AI Dükkan - E-Ticaret Siteniz 5 Dakikada Hazır",
  description: "Tek seferlik ödeme, ömür boyu kullanım. Hosting, domain, ödeme sistemi dahil. Aylık ücret yok!",
  keywords: "e-ticaret sitesi kur, online mağaza, saas, hazır site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <Navbar />
        {children}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Dükkan</h3>
              <p className="text-gray-400 text-sm">
                E-ticaret siteniz 5 dakikada hazır. Tek seferlik ödeme, ömür boyu kullanım!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/musteri" className="hover:text-white">Paketler</a></li>
                <li><a href="/auth/kayit" className="hover:text-white">Kayıt Ol</a></li>
                <li><a href="/auth/giris" className="hover:text-white">Giriş Yap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="mailto:destek@ai-dukkan.com" className="hover:text-white">Email: destek@ai-dukkan.com</a></li>
                <li>Canlı Destek: 7/24</li>
                <li>Kurulum: 5 dakika</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Özellikler</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Bedava Hosting</li>
                <li>✓ PayTR Ödeme</li>
                <li>✓ Sınırsız Ürün</li>
                <li>✓ Mobil Uyumlu</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © 2026 AI Dükkan. Tüm hakları saklıdır. | Tek seferlik ödeme, aylık ücret yok!
          </div>
        </footer>
      </body>
    </html>
  );
}
