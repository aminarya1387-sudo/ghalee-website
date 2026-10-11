'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Database,
  Layers,
  ShieldCheck,
  HardDrive,
  Cloud,
  CheckCircle2,
  Lock,
  Cpu,
  ArrowLeft,
  Sparkles,
  Server,
  Activity,
  FileCheck,
  Zap,
  Download,
  Sliders,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toFaDigits } from '@/lib/utils';

export default function CastleBackupPage() {
  const [dbSizeGb, setDbSizeGb] = useState<number>(250);
  const [compressionRatio, setCompressionRatio] = useState<number>(0.75); // 75% reduction

  const compressedSize = Math.round(dbSizeGb * (1 - compressionRatio));
  const savedSpace = dbSizeGb - compressedSize;
  const estimatedTransferMinutes = Math.max(1, Math.round((compressedSize * 1024) / (80 * 60))); // assuming ~80MB/s network

  const specs = [
    {
      category: 'پایگاه‌های داده تحت پوشش',
      items: [
        { title: 'نسخه‌های SQL Server', value: 'تمامی نسخه‌های ۲۰۰۵ تا ۲۰۲۲ (Standard, Enterprise, Express)' },
        { title: 'روش‌های پشتیبان‌گیری', value: 'Full Backup، Differential Backup و Transaction Log' },
        { title: 'سیاست دسترسی', value: 'بدون قفل جداول (Zero Table Lock) و بدون نیاز به ورود به سرور' },
      ],
    },
    {
      category: 'مجازی‌سازی VMware',
      items: [
        { title: 'نسخه‌های هایپروایزر', value: 'VMware ESXi و vSphere نسخه ۶.۰ تا ۸.۰' },
        { title: 'حالت پشتیبان‌گیری', value: 'زنده در حالت روشن (Live Hot Backup) از سطح هسته' },
        { title: 'فناوری ردگیری', value: 'پشتیبانی از فناوری بومی CBT (Changed Block Tracking)' },
      ],
    },
    {
      category: 'فشرده‌سازی و یکپارچگی داده',
      items: [
        { title: 'تکه‌تکه‌کردن (Split)', value: 'تقسیم فایل‌های عظیم به قطعات دلخواه جهت سهولت انتقال' },
        { title: 'الگوریتم‌های اعتبارسنجی', value: 'CRC32, MD5, SHA-1, SHA-256 و نظامی SHA-512' },
        { title: 'تایید دو مرحله‌ای', value: 'تست یکپارچگی پیش از ارسال و تایید مجدد در مقصد' },
      ],
    },
    {
      category: 'مقاصد ذخیره‌سازی و امنیت',
      items: [
        { title: 'مقاصد مجاز', value: 'بستر شبکه محلی (UNC), FTP/FTPS, Google Drive, Amazon S3, USB' },
        { title: 'رمزنگاری داده‌ها', value: 'رمزنگاری نظامی استاندارد ۲۵۶ بیتی (AES-256)' },
        { title: 'محافظت در برابر باج‌افزار', value: 'جداسازی مقاصد و عدم دسترسی کاربر ویندوز به فایل مقصد' },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f]">
      {/* ----------------- 1. PRODUCT HERO ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#09090b] text-white border-b border-white/10 overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0066cc]/30 to-[#00d2ff]/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="dark" className="border-white/15 bg-white/5 text-sky-300 mb-4 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>محصول پرچمدار قلعه • راهکار جامع بکاپ سازمانی</span>
            </Badge>

            <h1 className="hero-title text-white tracking-normal mb-6">
              Castle Backup
            </h1>

            <p className="text-lg sm:text-xl font-medium text-sky-200/90 mb-4">
              پشتیبان‌گیری هوشمند، فشرده‌سازی و انتقال امن بانک‌های اطلاعاتی و ماشین‌های مجازی
            </p>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-8">
              طراحی‌شده برای مدیران فناوری اطلاعات و مهندسان پایگاه داده که پایداری ۱۰۰ درصدی، سرعت فشرده‌سازی فوق‌العاده و رمزنگاری نفوذناپذیر را بدون ایجاد وقفه در عملیات روزمره می‌خواهند.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Button href="/contact?type=demo" variant="glow" size="lg">
                <Sparkles className="w-4 h-4" />
                <span>درخواست مشاوره و نصب آزمایشی</span>
              </Button>
              <Button href="/purchase?product=castle-backup" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <span>استعلام قیمت و پیش‌فاکتور</span>
              </Button>
            </div>
          </div>

          {/* Key metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">{toFaDigits(75)}٪+</div>
              <div className="text-xs text-neutral-400 mt-1">میانگین کاهش حجم داده</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">{toFaDigits(0)}</div>
              <div className="text-xs text-neutral-400 mt-1">ثانیه توقف سرویس (Zero Downtime)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">AES-256</div>
              <div className="text-xs text-neutral-400 mt-1">رمزنگاری نظامی استاندارد</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">SHA-512</div>
              <div className="text-xs text-neutral-400 mt-1">تایید سلامت بایت به بایت</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 2. INTERACTIVE STORAGE & ROI CALCULATOR ----------------- */}
      <section className="py-20 bg-[#f5f5f7] border-b border-black/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="accent" className="mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>محاسبه‌گر هوشمند بازدهی و صرفه‌جویی</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-normal mb-3">
              محاسبه صرفه‌جویی در حجم دیتابیس و زمان انتقال
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73]">
              حجم پایگاه داده سازمان خود را مشخص کنید تا میزان صرفه‌جویی در فضای ذخیره‌سازی و زمان پشتیبان‌گیری را به صورت زنده ببینید.
            </p>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-black/[0.08] shadow-apple text-start">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders Area */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-[#1d1d1f]">
                      حجم اولیه دیتابیس یا ماشین مجازی:
                    </label>
                    <span className="text-base font-mono font-bold text-[#0066cc]">
                      {toFaDigits(dbSizeGb)} گیگابایت
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={dbSizeGb}
                    onChange={(e) => setDbSizeGb(Number(e.target.value))}
                    className="w-full accent-[#0066cc] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#86868b] mt-1 font-mono">
                    <span>{toFaDigits(10)} GB</span>
                    <span>{toFaDigits(500)} GB</span>
                    <span>{toFaDigits(1000)} GB (۱ ترابایت)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-[#1d1d1f]">
                      سطح فشرده‌سازی چند جریانی قلعه:
                    </label>
                    <span className="text-sm font-semibold text-emerald-600">
                      {toFaDigits(Math.round(compressionRatio * 100))}٪ فشرده‌سازی
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setCompressionRatio(0.6)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        compressionRatio === 0.6
                          ? 'bg-[#0066cc] text-white border-[#0066cc]'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-neutral-200'
                      }`}
                    >
                      استاندارد (۶۰٪)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompressionRatio(0.75)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        compressionRatio === 0.75
                          ? 'bg-[#0066cc] text-white border-[#0066cc]'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-neutral-200'
                      }`}
                    >
                      پیشرفته (۷۵٪)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompressionRatio(0.85)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        compressionRatio === 0.85
                          ? 'bg-[#0066cc] text-white border-[#0066cc]'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-neutral-200'
                      }`}
                    >
                      حداکثری (۸۵٪)
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-[#09090b] text-white border border-white/10 space-y-4">
                <div className="text-xs text-neutral-400 font-mono flex items-center justify-between border-b border-white/10 pb-3">
                  <span>خروجی تخمینی Castle Engine</span>
                  <span className="text-emerald-400 font-bold">بسیار بهینه</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-300">حجم نهایی فایل آرشیو:</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">
                      {toFaDigits(compressedSize)} GB
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-300">صرفه‌جویی در فضای ذخیره‌سازی:</span>
                    <span className="text-base font-semibold font-mono text-sky-300">
                      {toFaDigits(savedSpace)} GB صرفه‌جویی
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-300">زمان تخمینی ارسال در شبکه:</span>
                    <span className="text-sm font-semibold font-mono text-amber-300">
                      حدود {toFaDigits(estimatedTransferMinutes)} دقیقه
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <Button href="/contact?type=demo" variant="glow" size="sm" className="w-full justify-center">
                    درخواست اجرای تست رایگان روی دیتابیس شما
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 3. TECHNICAL SPECIFICATIONS ----------------- */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-start">
        <div className="max-w-3xl mb-16">
          <Badge variant="neutral" className="mb-3">مشخصات جامع فنی</Badge>
          <h2 className="section-title text-[#1d1d1f] mb-4">
            معماری قدرتمند، بدون وابستگی خارجی
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73]">
            تمام مراحل پردازش، فشرده‌سازی و رمزنگاری به صورت بومی و بدون تکیه بر ابزارهای ثانویه انجام می‌پذیرد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specs.map((group, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-apple space-y-4"
            >
              <h3 className="text-lg font-bold text-[#1d1d1f] border-b border-black/[0.06] pb-3">
                {group.category}
              </h3>
              <div className="space-y-3.5">
                {group.items.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                    <span className="font-semibold text-[#1d1d1f] shrink-0">{item.title}:</span>
                    <span className="text-[#6e6e73] text-start sm:text-end">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- 4. CTA BANNER ----------------- */}
      <section className="py-16 bg-[#1d1d1f] text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold">
            آماده برقراری بالاترین سطح امنیت پشتیبان‌گیری هستید؟
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            کارشناسان قلعه فناوران آماده‌اند تا در یک جلسه حضوری یا آنلاین، سناریوی پشتیبان‌گیری سازمان شما را تحلیل و نسخه دمو را مستقر نمایند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact?type=demo" variant="glow" size="lg">
              درخواست نسخه آزمایشی سازمانی
            </Button>
            <Button href="/purchase?product=castle-backup" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              مشاهده پلن‌های لایسنس
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
