'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, X } from 'lucide-react';

export function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if on admin page or if already accepted
    if (pathname && pathname.startsWith('/admin')) {
      setVisible(false);
      return;
    }

    try {
      const consent = localStorage.getItem('castleco_cookie_consent');
      if (!consent) {
        // Show after a brief delay
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(false);
    }
  }, [pathname]);

  const handleAccept = () => {
    try {
      localStorage.setItem('castleco_cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:end-6 z-40 max-w-md animate-fade-in font-sans">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121217]/95 backdrop-blur-xl border border-white/15 text-white shadow-2xl space-y-3 text-start">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>حفظ حریم خصوصی و امنیت نشست</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-neutral-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          وب‌سایت قلعه فناوران به منظور حفظ امنیت تراکنش‌ها و احراز هویت سازمانی از کوکی‌های ضروری فنی استفاده می‌نماید.{' '}
          <Link href="/privacy" className="text-sky-400 hover:underline">
            مطالعه سیاست حریم خصوصی
          </Link>
        </p>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0066cc] hover:bg-[#0077ed] text-white shadow-md transition-all"
          >
            موافقم و تایید می‌کنم
          </button>
        </div>
      </div>
    </div>
  );
}
