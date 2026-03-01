import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "MarketPlace - Türkiye'nin E-Ticaret Platformu",
  description: "Binlerce ürün, güvenli ödeme, hızlı kargo. Türkiye'nin en güvenilir online alışveriş sitesi.",
  keywords: "e-ticaret, online alışveriş, güvenli ödeme, hızlı kargo",
  openGraph: {
    title: "MarketPlace - Online Alışveriş",
    description: "Türkiye'nin en güvenilir e-ticaret platformu",
    type: "website",
  },
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
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">MarketPlace</h3>
              <p className="text-gray-400 text-sm">
                Türkiye'nin en güvenilir e-ticaret platformu
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kurumsal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Hakkımızda</li>
                <li>İletişim</li>
                <li>Kariyer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yardım</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>SSS</li>
                <li>Kargo Takibi</li>
                <li>İade & Değişim</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Satıcı</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Satıcı Ol</li>
                <li>Satıcı Paneli</li>
                <li>Komisyon Oranları</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2026 MarketPlace. Tüm hakları saklıdır.
          </div>
        </footer>
      </body>
    </html>
  );
}
