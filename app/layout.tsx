import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Ticaret SaaS Platform - Gerçek Ödeme Sistemi",
  description: "Tek seferlik ödeme ile ömür boyu e-ticaret siteniz. Gerçek ödeme sistemi, test modu yok!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-lg mb-2">© 2026 E-Ticaret SaaS Platform</p>
            <p className="text-gray-400">Gerçek ödeme sistemi ile çalışır. Test modu değil!</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
