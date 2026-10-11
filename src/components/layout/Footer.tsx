'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Shield, Phone, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { toFaDigits } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const currentYear = toFaDigits(1403);

  const customerLogos = [
    { name: 'بنیاد مسکن انقلاب اسلامی', file: 'BonyadGilan.png' },
    { name: 'بیمارستان تخصصی پارس', file: 'HPars.png' },
    { name: 'شهرداری رشت (فاوا)', file: 'ShRasht.png' },
    { name: 'دانشگاه علوم پزشکی گیلان', file: 'OPgilan.png' },
    { name: 'دادگستری کل استان گیلان', file: 'DadGilan.png' },
    { name: 'سازمان منطقه آزاد انزلی', file: 'Anzali.png' },
  ];

  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]/50 pt-16 pb-12 font-sans text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Trust Strip */}
        <div className="pb-12 border-b border-black/[0.06]">
          <p className="text-center text-xs font-medium text-[#86868b] mb-8">
            مورد اعتماد سازمان‌ها و مراکز فناوری اطلاعات کشور
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {customerLogos.map((c) => (
              <div
                key={c.file}
                className="h-12 w-24 flex items-center justify-center p-1 bg-white/60 rounded-xl border border-black/[0.04] shadow-xs"
                title={c.name}
              >
                <Image
                  src={`/images/${c.file}`}
                  alt={c.name}
                  width={90}
                  height={40}
                  className="max-h-9 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0066cc] flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#1d1d1f] text-base">
                قلعه فناوران هیمن
              </span>
            </Link>
            <p className="text-xs text-[#6e6e73] leading-relaxed">
              سازنده نرم‌افزارهای بومی و تخصصی برای مدیران فناوری اطلاعات و امنیت داده‌ها (ISMS). تأسیس سال {toFaDigits(1394)} و تأییدشده به‌عنوان شرکت دانش‌بنیان.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#0066cc] font-medium pt-1">
              <Award className="w-4 h-4 shrink-0" />
              <span>تأییدیه دانش‌بنیان ریاست جمهوری</span>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#1d1d1f] tracking-wide">
              محصولات سازمانی
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/products/castle-backup"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  Castle Backup (پشتیبان‌گیری SQL و VM)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/professional-system-information"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  مدیریت سخت‌افزار و نرم‌افزار (PSI)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/sql-data-compare"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  مقایسه ساختار و داده SQL Server
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?type=trial"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  دریافت نسخه رایگان و آزمایشی
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#1d1d1f] tracking-wide">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  درباره شرکت قلعه فناوران
                </Link>
              </li>
              <li>
                <Link
                  href="/purchase"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  راهنمای خرید و قرارداد سازمانی
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  درخواست مشاوره و دمو
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#6e6e73] hover:text-[#0066cc] transition-colors"
                >
                  ارتباط با واحد فروش و پشتیبانی
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#1d1d1f] tracking-wide">
              تماس مستقیم
            </h4>
            <div className="space-y-2.5 text-xs text-[#6e6e73]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                <span>واحد فروش:</span>
                <span className="font-semibold text-[#1d1d1f] dir-ltr">
                  {toFaDigits('013-33663355')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                <span>پشتیبانی:</span>
                <span className="font-semibold text-[#1d1d1f] dir-ltr">
                  {toFaDigits('09113349852')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                <span>مستقر در پارک علم و فناوری</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-black/[0.06] text-[11px] text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>توسعه ۱۰۰٪ بومی و مستقل</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868b]">
          <p>
            تمامی حقوق این وب‌سایت متعلق به شرکت «قلعه فناوران هیمن» می‌باشد © {currentYear}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#0066cc] transition-colors">
              سیاست حریم خصوصی
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#0066cc] transition-colors">
              قوانین و ضوابط لایسنس
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
