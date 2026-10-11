'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Cpu,
  HardDrive,
  Shield,
  CheckCircle2,
  Activity,
  Usb,
  FileSpreadsheet,
  Network,
  Sparkles,
  ArrowLeft,
  FileText,
  AlertTriangle,
  Server,
  Layers,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PsiDiagnosticsVisualizer } from '@/components/home/PsiDiagnosticsVisualizer';
import { toFaDigits } from '@/lib/utils';

export default function PSIPage() {
  const capabilities = [
    {
      icon: HardDrive,
      title: 'پایش سلامت S.M.A.R.T و شمارش سکتورهای خراب',
      description:
        'مجهز به دو الگوریتم نرمال و سخت‌گیرانه جهت شناسایی خطاهای ذخیره‌ساز، Reallocated Sectors، خطاهای خواندن/نوشتن و پیش‌بینی سوختن هارد پیش از نابودی داده‌ها.',
    },
    {
      icon: Usb,
      title: 'ردگیری اتصال حافظه‌های جانبی غیرمجاز',
      description:
        'ثبت زمان دقیق اتصال هر نوع فلش‌مموری، هارد اکسترنال یا گوشی موبایل به سیستم‌ها به همراه شماره سریال قطعه و هشدار به مدیر شبکه.',
    },
    {
      icon: FileSpreadsheet,
      title: 'صدور خودکار شناسنامه سخت‌افزاری و خروجی اکسل',
      description:
        'تولید فرم استاندارد شناسنامه تجهیز برای هر رایانه، تفکیک قطعات اسقاطی یا قابل ارتقاء و استخراج گزارش جامع اکسل برای حسابداری اموال و حراست.',
    },
    {
      icon: Network,
      title: 'تفکیک چارت سازمانی و اسکن رنج شبکه',
      description:
        'دسته‌بندی خودکار کلاینت‌ها و سرورها بر اساس بخش‌ها و واحدهای اداری، اسکن محدوده آی‌پی و مانیتورینگ آنلاین سرویس‌های فعال شبکه.',
    },
  ];

  const specs = [
    { label: 'سیستم‌عامل‌های تحت پشتیبانی', value: 'تمامی نسخه‌های Windows 7، 8.1، 10، 11 و ویندوز سرور ۲۰۰۸ الی ۲۰۲۲' },
    { label: 'معماری پردازشی کلاینت', value: 'سازگار با هر دو ساختار ۳۲ بیتی (x86) و ۶۴ بیتی (x64)' },
    { label: 'معماری کنسول مدیریت', value: 'سامانه تحت وب (Web-based) بدون نیاز به نصب نرم‌افزار جانبی روی سیستم مدیران' },
    { label: 'حجم کلاینت ایجنت', value: 'فوق‌العاده سبک (کمتر از ۱۵ مگابایت) با مصرف رم زیر ۱۰ مگابایت' },
    { label: 'پروتکل ارتباطی', value: 'رمزنگاری‌شده و امن درون شبکه داخلی بدون هیچ‌گونه نیاز به دسترسی به اینترنت' },
    { label: 'بانک اطلاعاتی سرور', value: 'Microsoft SQL Server با امکان یکپارچه‌سازی با نرم‌افزارهای اموال و انبارداری' },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f]">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#09090b] text-white border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0066cc]/20 to-emerald-500/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="dark" className="border-white/15 bg-white/5 text-emerald-400 mb-4 px-4 py-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>سامانه مانیتورینگ و شناسنامه هوشمند تجهیزات</span>
            </Badge>

            <h1 className="hero-title text-white tracking-normal mb-6">
              مدیریت سخت‌افزار و نرم‌افزار (PSI)
            </h1>

            <p className="text-lg sm:text-xl font-medium text-neutral-200 mb-4">
              نرم‌افزار جامع پایش بیش از ۳۰ شاخص سلامت سیستم، امنیت پورت‌ها و شناسنامه تجهیزات
            </p>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-8">
              دیگر نیازی به باز کردن کیس رایانه‌ها یا مراجعات حضوری نیست. تمام اطلاعات سخت‌افزاری، تغییرات قطعات، پورت‌های غیرمجاز و سلامت ذخیره‌سازها را در یک داشبورد تحت وب متمرکز مشاهده کنید.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/contact?type=demo" variant="glow" size="lg">
                <Sparkles className="w-4 h-4" />
                <span>درخواست دموی تحت وب سازمانی</span>
              </Button>
              <Button href="/purchase?product=psi" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <span>استعلام قیمت و پیش‌فاکتور</span>
              </Button>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">{toFaDigits(30)}+</div>
              <div className="text-xs text-neutral-400 mt-1">شاخص فنی سخت‌افزار و نرم‌افزار</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">{toFaDigits(2)}</div>
              <div className="text-xs text-neutral-400 mt-1">الگوریتم پیش‌بینی خرابی هارد</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">USB Log</div>
              <div className="text-xs text-neutral-400 mt-1">ثبت فوری حافظه‌های غیرمجاز</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">Excel / PDF</div>
              <div className="text-xs text-neutral-400 mt-1">شناسنامه استاندارد چاپی اموال</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- INTERACTIVE TELEMETRY CONSOLE ----------------- */}
      <section className="py-20 bg-[#f5f5f7] border-b border-black/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="neutral" className="mb-3">کنسول شبیه‌ساز زنده</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-normal mb-2">
              نمای کاربری کنسول نظارت بر سلامت قطعات
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73]">
              سیستم به صورت بلادرنگ وضعیت سنسورها را خوانده و در صورت کوچک‌ترین انحراف یا خرابی، هشدار می‌دهد.
            </p>
          </div>

          <PsiDiagnosticsVisualizer />
        </div>
      </section>

      {/* ----------------- CAPABILITIES CARDS ----------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-start">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" className="mb-3">قابلیت‌های برجسته</Badge>
          <h2 className="section-title text-[#1d1d1f] mb-4">
            چرا سازمان‌ها به سامانه PSI نیاز دارند؟
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73]">
            جلوگیری از هزینه‌های سرسام‌آور سوختن تجهیزات و سرقت قطعات، همراه با ایجاد نظم کامل در اموال IT سازمان.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-black/[0.08] shadow-apple hover:shadow-apple-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specs Table */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06]">
          <h3 className="text-lg font-bold text-[#1d1d1f] mb-6 border-b border-black/[0.06] pb-4">
            مشخصات فنی و الزامات استقرار سامانه PSI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-black/[0.04] text-xs">
                <div className="font-bold text-[#1d1d1f] mb-1">{s.label}:</div>
                <div className="text-[#6e6e73] leading-relaxed">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- CALL TO ACTION ----------------- */}
      <section className="py-16 bg-[#1d1d1f] text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold">
            کنترل کامل سخت‌افزارها و تجهیزات شبکه سازمان
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            امکان نصب آزمایشی در شبکه سازمان شما ظرف کمتر از ۲۴ ساعت وجود دارد.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact?type=demo" variant="glow" size="lg">
              درخواست دموی تحت وب
            </Button>
            <Button href="/purchase?product=psi" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              استعلام لایسنس و قیمت
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
