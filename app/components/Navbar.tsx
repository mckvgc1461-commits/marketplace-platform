'use client';
import Link from 'next/link';
import { Store, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80">
          <Store size={32} className="text-blue-600" />
          AI Dükkan
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/musteri" className="text-gray-700 hover:text-blue-600 font-semibold">
            Paketler
          </Link>
          <Link href="/auth/giris" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold">
            <LogIn size={20} />
            Giriş
          </Link>
          <Link href="/musteri" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg">
            <UserPlus size={20} />
            Hemen Başla
          </Link>
        </div>
      </div>
    </nav>
  );
}
