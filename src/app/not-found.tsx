import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { toFaDigits } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-36 px-4 max-w-xl mx-auto text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mx-auto">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <span className="text-xs font-semibold text-[#86868b] tracking-wider">
        خطای {toFaDigits(404)}
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f]">
        صفحه مورد نظر یافت نشد
      </h1>
      <p className="text-sm text-[#6e6e73] leading-relaxed">
        آدرسی که به دنبال آن هستید ممکن است تغییر کرده باشد یا موقتاً در دسترس نباشد.
      </p>
      <div className="pt-2">
        <Button href="/" variant="primary" size="md">
          <span>بازگشت به صفحه اصلی</span>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
