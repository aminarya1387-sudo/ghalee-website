'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Database,
  CheckCircle2,
  Download,
  Sparkles,
  ArrowRightLeft,
  FileCode,
  Layers,
  ArrowLeft,
  Shield,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SqlCompareVisualizer } from '@/components/home/SqlCompareVisualizer';
import { toFaDigits } from '@/lib/utils';

export default function SqlDataComparePage() {
  const schemaFeatures = [
    'مقایسه ساختار جداول، نوع فیلدها، طول کاراکترها و کلیدهای اصلی (PK/FK)',
    'شناسایی تغییرات در ویوها (Views)، توابع محاسباتی (Functions) و تریگرها (Triggers)',
    'تطبیق تفاوت‌های پروسیجرهای ذخیره‌شده (Stored Procedures) و اسکریپت بدنه آن‌ها',
    'ردگیری ایندکس‌های کلاستر و غیرکلاستر جهت بهبود عملکرد کوئری‌ها',
    'تولید خودکار اسکریپت هماهنگ‌ساز با قابلیت اعمال یک‌کلیکی تغییرات در مقصد',
    'بدون در نظر گرفتن نسخه SQL Server (امکان مقایسه نسخه ۲۰۰۸ با ۲۰۱۹ و ۲۰۲۲)',
  ];

  const dataFeatures = [
    'مقایسه رکوردهای موجود بر اساس کلیدهای اصلی به صورت تفکیک‌شده',
    'نمایش رکوردهای جدید در مبدأ، رکوردهای حذف‌شده و فیلدهای تغییریافته',
    'تبدیل رکوردهای هر جدول به اسکریپت‌های استاندارد INSERT، UPDATE و DELETE',
    'امکان خروجی مستقیم کلیه تفاوت‌های رکوردی به فرمت اکسل (XLSX)',
    'سرعت بسیار بالا در پردازش جداول با بیش از چند میلیون رکورد داده',
    'فیلتر کردن جداول و ستون‌های خاص جهت کاهش حجم مقایسه',
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f]">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#09090b] text-white border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-emerald-500/20 via-[#0066cc]/20 to-teal-500/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="dark" className="border-white/15 bg-white/5 text-emerald-400 mb-4 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>هدیه شرکت قلعه فناوران به جامعه توسعه‌دهندگان و مدیران دیتابیس</span>
            </Badge>

            <h1 className="hero-title text-white tracking-normal mb-6">
              SQL Server Data & Schema Compare
            </h1>

            <p className="text-lg sm:text-xl font-medium text-emerald-200/90 mb-4">
              ابزار تخصصی و فوق‌سریع مقایسه ساختار و داده‌های بانک‌های اطلاعاتی SQL Server
            </p>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-8">
              دیگر نیازی به اسکریپت‌نویسی دستی برای انتقال تغییرات بین محیط توسعه (Development) و محیط عملیاتی (Production) نیست. تفاوت ساختار و داده‌ها را با یک کلیک کشف و همگام‌سازی کنید.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Button href="#download-box" variant="glow" size="lg" className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20">
                <Download className="w-4 h-4" />
                <span>دانلود رایگان نرم‌افزار (نسخه کامل)</span>
              </Button>
              <Button href="/contact?type=support" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <span>پشتیبانی و راهنمای نصب</span>
              </Button>
            </div>
          </div>

          {/* Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">۱۰۰٪</div>
              <div className="text-xs text-neutral-400 mt-1">رایگان و بدون محدودیت</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">Any Ver</div>
              <div className="text-xs text-neutral-400 mt-1">سازگار با تمامی نسخه‌های SQL</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">۱ کلیک</div>
              <div className="text-xs text-neutral-400 mt-1">تولید اسکریپت همگام‌ساز</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">Excel</div>
              <div className="text-xs text-neutral-400 mt-1">خروجی کامل تفاوت‌ها</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- INTERACTIVE DIFF STUDIO ----------------- */}
      <section className="py-20 bg-[#f5f5f7] border-b border-black/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="neutral" className="mb-3">محیط کاربری شبیه‌ساز</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-normal mb-2">
              استودیوی مقایسه ساختار و داده‌ها در عمل
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73]">
              تفاوت‌های هر جدول و پروسیجر را قبل از اعمال، با ریزه‌کاری‌های کامل بررسی و تایید کنید.
            </p>
          </div>

          <SqlCompareVisualizer />
        </div>
      </section>

      {/* ----------------- DUAL BREAKDOWN: SCHEMA VS DATA ----------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-start">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schema Section */}
          <div className="p-8 rounded-3xl bg-white border border-black/[0.08] shadow-apple flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mb-6">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                مقایسه هوشمند ساختار (Schema Compare)
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] mb-6 leading-relaxed">
                ابزاری ایده‌آل برای مهاجرت به نسخه‌های جدید، بررسی تغییرات نسخه‌های مختلف یک نرم‌افزار و همگام‌سازی کدهای بانک اطلاعاتی.
              </p>
              <div className="space-y-3">
                {schemaFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#1d1d1f]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Section */}
          <div className="p-8 rounded-3xl bg-white border border-black/[0.08] shadow-apple flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                مقایسه هوشمند داده‌ها (Data Compare)
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] mb-6 leading-relaxed">
                بررسی مغایرت اطلاعات پایه، ردیابی تغییرات داده‌ها در جداول مالی و مشتریان و تهیه اسکریپت الحاقی سریع.
              </p>
              <div className="space-y-3">
                {dataFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#1d1d1f]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- DOWNLOAD BOX ----------------- */}
      <section id="download-box" className="py-20 bg-[#121217] text-white text-center px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Badge variant="dark" className="border-emerald-500/30 text-emerald-400">
            لینک مستقیم و فوری دانلود
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold">
            دریافت رایگان نرم‌افزار SQL Server Data Compare
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            شامل بسته کامل اجرایی ویندوز، راهنمای فارسی و کاتالوگ رسمی شرکت قلعه فناوران؛ بدون نیاز به لایسنس یا کرک.
          </p>

          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-start max-w-lg mx-auto space-y-3 font-mono text-xs">
            <div className="flex justify-between text-neutral-300">
              <span>نام بسته:</span>
              <span className="text-emerald-400 font-bold">Castle_SQL_Compare_FreeEdition.zip</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>حجم فایل:</span>
              <span className="text-neutral-200">۵۶ کیلوبایت (سبک و پرتابل)</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>نوع لایسنس:</span>
              <span className="text-emerald-400 font-bold">۱۰۰٪ رایگان و نامحدود</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/downloads/Castle_SQL_Compare_FreeEdition.zip"
              download="Castle_SQL_Compare_FreeEdition.zip"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              <span>دانلود رایگان بسته نرم‌افزار (Castle_SQL_Compare.zip)</span>
            </a>

            <a
              href="/downloads/CastleCo_Catalog.png"
              download="CastleCo_Catalog.png"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-semibold border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>دانلود کاتالوگ شرکت</span>
            </a>

            <Button href="/purchase?product=sql-compare" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              سفارشی‌سازی و استعلام سازمانی
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
