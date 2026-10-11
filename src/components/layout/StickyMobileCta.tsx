'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall, FileText } from 'lucide-react';

export function StickyMobileCta() {
  const pathname = usePathname();

  // Hide on admin routes or already on purchase page
  if (pathname && (pathname.startsWith('/admin') || pathname === '/purchase')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-2.5 bg-white/90 backdrop-blur-xl border-t border-black/[0.08] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] font-sans">
      <div className="flex items-center gap-2">
        <a
          href="tel:01333663355"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#1d1d1f] text-white shadow-md active:scale-95 transition-transform"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>تماس فوری (۰۱۳-۳۳۶۶۳۳۵۵)</span>
        </a>

        <Link
          href="/purchase"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#0066cc] text-white shadow-md active:scale-95 transition-transform"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>استعلام پیش‌فاکتور</span>
        </Link>
      </div>
    </div>
  );
}
