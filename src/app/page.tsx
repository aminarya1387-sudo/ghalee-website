'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  Database,
  Cpu,
  Server,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Cloud,
  FileCheck,
  Zap,
  Activity,
  Award,
  Sparkles,
  Download,
  Layers,
  ChevronLeft,
  Headphones,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeroShieldGraphic } from '@/components/home/HeroShieldGraphic';
import { CastleBackupStory } from '@/components/home/CastleBackupStory';
import { PsiDiagnosticsVisualizer } from '@/components/home/PsiDiagnosticsVisualizer';
import { SqlCompareVisualizer } from '@/components/home/SqlCompareVisualizer';
import { toFaDigits } from '@/lib/utils';

export default function HomePage() {
  const clients = [
    { name: 'بنیاد مسکن انقلاب اسلامی', logo: '/images/BonyadGilan.png' },
    { name: 'شهرداری رشت (فاوا)', logo: '/images/ShRasht.png' },
    { name: 'دادگستری کل استان گیلان', logo: '/images/DadGilan.png' },
    { name: 'سازمان منطقه آزاد انزلی', logo: '/images/Anzali.png' },
    { name: 'بیمارستان تخصصی پارس', logo: '/images/HPars.png' },
    { name: 'دانشگاه علوم پزشکی گیلان', logo: '/images/OPgilan.png' },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f]">
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
        >
          <Badge variant="accent" className="text-xs py-1.5 px-4 shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>شرکت دانش‌بنیان مستقر در پارک علم و فناوری • تأسیس {toFaDigits(1394)}</span>
          </Badge>
          <Badge variant="neutral" className="text-xs py-1.5 px-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>توسعه بومی و ۱۰۰٪ مستقل</span>
          </Badge>
        </motion.div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Right Column: Hero Typography (Persian RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-start"
          >
            <h1 className="hero-title text-[#1d1d1f] tracking-normal mb-6">
              داده‌های شما <br className="hidden sm:inline" />
              <span className="bg-gradient-to-l from-[#0066cc] via-[#0099ff] to-[#00d2ff] bg-clip-text text-transparent">
                امن و قابل اتکاست.
              </span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#1d1d1f] mb-3">
              ساده. انعطاف‌پذیر. قابل اعتماد. قدرتمند.
            </p>

            <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              شرکت قلعه فناوران هیمن با تکیه بر متخصصان بومی و استانداردهای نوین امنیت اطلاعات (ISMS)، راهکارهای پیشرفته پشتیبان‌گیری پایگاه داده، مانیتورینگ سلامت سخت‌افزار و همگام‌سازی دیتابیس را برای مدیران فناوری اطلاعات سازمان‌ها فراهم آورده است.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <Button href="/contact?type=demo" variant="glow" size="lg">
                <Sparkles className="w-4 h-4" />
                <span>درخواست مشاوره و دمو</span>
              </Button>

              <Button href="/products/castle-backup" variant="secondary" size="lg">
                <span>بررسی Castle Backup</span>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* Key Feature Micro-badges */}
            <div className="grid grid-cols-3 gap-4 pt-10 mt-10 border-t border-black/[0.06] max-w-lg mx-auto lg:mx-0">
              <div className="text-start">
                <div className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">
                  {toFaDigits(100)}٪
                </div>
                <div className="text-xs text-[#6e6e73] mt-0.5">توسعه بومی و مستقل</div>
              </div>
              <div className="text-start">
                <div className="text-xl sm:text-2xl font-bold text-[#0066cc]">
                  {toFaDigits(3)}
                </div>
                <div className="text-xs text-[#6e6e73] mt-0.5">محصول راهبردی سازمانی</div>
              </div>
              <div className="text-start">
                <div className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">
                  {toFaDigits(1394)}
                </div>
                <div className="text-xs text-[#6e6e73] mt-0.5">سابقه مستمر در فناوری</div>
              </div>
            </div>
          </motion.div>

          {/* Left Column: Abstract Graphic Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <HeroShieldGraphic />
          </motion.div>
        </div>
      </section>

      {/* ----------------- 2. ENTERPRISE CLIENTS TRUST STRIP ----------------- */}
      <section className="py-12 bg-[#f5f5f7] border-y border-black/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-[#86868b] tracking-wider uppercase mb-8">
            مورد اعتماد نهادها، بیمارستان‌ها و دستگاه‌های اجرایی کشور
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-xs flex flex-col items-center justify-center gap-2.5 h-28 hover:shadow-apple transition-all group"
                title={client.name}
              >
                <div className="relative w-16 h-12 grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-medium text-[#6e6e73] text-center line-clamp-2 leading-tight group-hover:text-[#1d1d1f] transition-colors">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 3. CASTLE BACKUP APPLE-STYLE STORYTELLING ----------------- */}
      <CastleBackupStory />

      {/* ----------------- 4. PRODUCT 2: PSI DIAGNOSTICS CONSOLE ----------------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            <div className="lg:col-span-6 space-y-5 text-start">
              <Badge variant="accent">محصول سازمانی پایش</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-normal">
                مدیریت جامع سخت‌افزار و نرم‌افزار (PSI)
              </h2>
              <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
                سامانه هوشمند تحت وب جهت پایش بیش از ۳۰ شاخص سخت‌افزاری و نرم‌افزاری رایانه‌ها و سرورهای سازمان، پیش‌بینی زودهنگام خرابی هارد دیسک، گزارش تغییر قطعات و تفکیک ساختار چارت سازمانی.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#1d1d1f] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>پایش مداوم وضعیت S.M.A.R.T و سلامت ذخیره‌سازها جهت جلوگیری از سوختن دیسک</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1d1d1f] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ردگیری اتصال حافظه‌های جانبی غیرمجاز (فلش مموری، هارد اکسترنال)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1d1d1f] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تولید و چاپ شناسنامه سخت‌افزاری و گزارش جامع تفکیکی اکسل برای اموال و حراست</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button href="/products/professional-system-information" variant="secondary" size="md">
                  <span>بررسی مشخصات فنی PSI</span>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button href="/contact?type=demo" variant="outline" size="md">
                  درخواست دموی نرم‌افزار
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <PsiDiagnosticsVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 5. PRODUCT 3: SQL DATA & SCHEMA COMPARE ----------------- */}
      <section className="py-24 bg-[#f5f5f7] border-t border-black/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" className="mb-3">
              هدیه به مدیران دیتابیس و توسعه‌دهندگان
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-normal mb-4">
              مقایسه و همگام‌سازی ساختار و داده‌های SQL Server
            </h2>
            <p className="text-sm sm:text-base text-[#6e6e73]">
              ابزاری قدرتمند جهت کشف تفاوت جداول، ویوها، پروسیجرها و مقادیر رکوردها بین دو پایگاه داده با تولید خودکار اسکریپت همگام‌سازی؛ کاملاً رایگان.
            </p>
          </div>

          <SqlCompareVisualizer />
        </div>
      </section>

      {/* ----------------- 6. CALL TO ACTION SECTION ----------------- */}
      <section className="py-20 bg-[#121217] text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <Badge variant="dark" className="mx-auto border-white/20 text-sky-300">
            تضمین امنیت سازمانی
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-normal text-white">
            امنیت داده‌های سازمان را تضمین کنید.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto">
            برای دریافت دموی رایگان در شبکه سازمان یا استعلام پیش‌فاکتور رسمی، با کارشناسان فنی شرکت قلعه فناوران در ارتباط باشید.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact?type=demo" variant="glow" size="lg">
              <Sparkles className="w-4 h-4" />
              <span>درخواست دموی حضوری یا آنلاین</span>
            </Button>
            <Button href="/purchase" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <span>راهنمای خرید و پیش‌فاکتور</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
