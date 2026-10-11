'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Award,
  Shield,
  CheckCircle2,
  Building2,
  Users,
  Compass,
  Sparkles,
  ChevronLeft,
  MapPin,
  Lock,
  HeartHandshake,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toFaDigits } from '@/lib/utils';

export default function AboutPage() {
  const milestones = [
    {
      year: '۱۳۹۴',
      title: 'تأسیس شرکت در پارک علم و فناوری',
      description:
        'آغاز به کار شرکت قلعه فناوران هیمن در پارک علم و فناوری گیلان توسط جمعی از نخبگان دانشگاهی و مهندسان باسابقه زیرساخت با هدف خلق نرم‌افزارهای بومی امنیت داده.',
    },
    {
      year: '۱۳۹۶',
      title: 'رونمایی از سامانه مانیتورینگ PSI',
      description:
        'توسعه و استقرار سامانه جامع شناسنامه سخت‌افزاری و پایش سلامت قطعات در نهادهای دولتی، بیمارستان‌ها و شرکت‌های بزرگ استانی.',
    },
    {
      year: '۱۳۹۷',
      title: 'احراز صلاحیت دانش‌بنیان',
      description:
        'تأیید رسمی شرکت توسط معاونت علمی و فناوری ریاست جمهوری به عنوان شرکت دانش‌بنیان تولیدی در حوزه فناوری اطلاعات و ارتباطات.',
    },
    {
      year: '۱۳۹۹',
      title: 'معماری هسته قدرتمند Castle Backup',
      description:
        'خلق راهکار پشتیبان‌گیری زنده و بدون وقفه از سرورهای پایگاه داده SQL Server و زیرساخت مجازی‌سازی VMware ESXi با استاندارد رمزنگاری AES-256.',
    },
    {
      year: '۱۴۰۲ تا کنون',
      title: 'توسعه ملی و عرضه رایگان ابزارهای DBA',
      description:
        'گسترش دامنه مشتریان سازمانی به دستگاه‌های اجرایی کشور و انتشار رایگان ابزار تخصصی مقایسه دیتابیس به جامعه مهندسان IT ایران.',
    },
  ];

  const values = [
    {
      title: 'امنیت بومی و بدون در پشتی (Zero Backdoor)',
      description:
        'تمام خطوط کد نرم‌افزارهای قلعه توسط مهندسان داخلی نوشته شده و مستقل از هرگونه سرویس یا لایسنس خارجی کار می‌کنند.',
    },
    {
      title: 'تداوم ۱۰۰٪ کسب‌وکار (Zero Downtime)',
      description:
        'معماری تمامی محصولات به گونه‌ای است که فرآیندهای حیاتی سازمان بدون کوچک‌ترین وقفه یا افت کارایی به کار خود ادامه می‌دهند.',
    },
    {
      title: 'پشتیبانی بی‌واسطه و متعهدانه سازمانی',
      description:
        'ارتباط مستقیم تیم فنی با مهندسان توسعه نرم‌افزار جهت رفع چالش‌های اختصاصی و انطباق با سیاست‌های امنیت داخلی سازمان.',
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f]">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#09090b] text-white border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0066cc]/25 to-sky-500/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="border-white/15 bg-white/5 text-sky-300 mb-4 px-4 py-1.5 mx-auto">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span>شرکت قلعه فناوران هیمن (شماره ثبت: ۱۹۹۹۸)</span>
          </Badge>

          <h1 className="hero-title text-white tracking-normal mb-6">
            پاسداری از شریان حیاتی داده‌های سازمانی
          </h1>

          <p className="text-lg sm:text-xl font-medium text-neutral-200 mb-4">
            توسعه‌دهنده راهکارهای بومی پشتیبان‌گیری، پایش و امنیت اطلاعات در کشور
          </p>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-8">
            بیش از ۹ سال فعالیت مستمر در پارک علم و فناوری گیلان با تکیه بر متخصصان دانشگاهی نخبه، دقت ریاضی در محاسبات و تعهد بی‌قیدوشرط به امنیت داده‌های مشتریان.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">{toFaDigits(1394)}</div>
              <div className="text-xs text-neutral-400 mt-1">سال تاسیس شرکت</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">{toFaDigits(100)}٪</div>
              <div className="text-xs text-neutral-400 mt-1">توسعه بومی و مستقل</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">{toFaDigits(9)}+</div>
              <div className="text-xs text-neutral-400 mt-1">سال سابقه استقرار در مراکز دولتی</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">ISMS</div>
              <div className="text-xs text-neutral-400 mt-1">منطبق بر استانداردهای امنیت</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- STORY & MISSION ----------------- */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="accent">داستان ما</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-normal">
              چرا شرکت قلعه فناوران پایه‌گذاری شد؟
            </h2>
            <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
              وابستگی زیرساخت‌های فناوری اطلاعات سازمان‌های کشور به نرم‌افزارهای خارجی کرک‌شده، علاوه بر تهدیدات امنیتی و احتمال وجود بدافزارها و باج‌افزارها، عدم پاسخگویی و نبود پشتیبانی اختصاصی در زمان بحران‌های واقعی را به دنبال دارد.
            </p>
            <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
              ما در شرکت قلعه فناوران هیمن با هدف ارائه جایگزین‌هایی باکیفیت‌تر، سریع‌تر، ایمن‌تر و با کاربری روان‌تر از نمونه‌های خارجی کار خود را آغاز کردیم تا مدیران IT بدون نگرانی از قفل شدن یا افشای داده‌ها، روی اهداف راهبردی سازمان خود تمرکز کنند.
            </p>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] space-y-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#0066cc]" />
              <div>
                <h3 className="text-sm font-bold text-[#1d1d1f]">مستقر در پارک علم و فناوری گیلان</h3>
                <p className="text-xs text-[#6e6e73]">مرکز رشد واحدهای فناور و دانش‌بنیان</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#1d1d1f] pt-4 border-t border-black/[0.06]">
              <div className="flex justify-between py-1 border-b border-black/[0.04]">
                <span className="text-[#6e6e73]">شماره ثبت رسمی:</span>
                <span className="font-mono font-bold">{toFaDigits(19998)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/[0.04]">
                <span className="text-[#6e6e73]">شناسه ملی شرکت:</span>
                <span className="font-mono font-bold">قابل استعلام در سامانه اسناد رسمی</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6e6e73]">حوزه تخصصی:</span>
                <span className="font-bold">نرم‌افزارهای مدیریت و امنیت پایگاه داده</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-3">
              اصول راهبردی مهندسی قلعه
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73]">
              تعهداتی که در توسعه هر محصول و ارائه هر ساعت پشتیبانی سرلوحه تصمیمات ماست.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-apple flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#1d1d1f] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="neutral" className="mb-3">مسیر پیشرفت</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">
              نقاط عطف و مسیر رشد قلعه فناوران
            </h2>
          </div>

          <div className="relative border-s-2 border-[#0066cc]/30 ms-4 sm:ms-8 ps-6 sm:ps-10 space-y-10">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -start-[31px] sm:-start-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0066cc] shadow-xs group-hover:scale-125 transition-transform" />
                <div className="text-xs font-mono font-bold text-[#0066cc] mb-1">
                  سال {toFaDigits(m.year)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1d1d1f] mb-2">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed max-w-2xl">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- CALL TO ACTION ----------------- */}
      <section className="py-16 bg-[#1d1d1f] text-white text-center px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            مشتاق همکاری با سازمان و مجموعه شما هستیم
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            جهت برگزاری جلسات دمو، استعلام اصالت یا دریافت اطلاعات حقوقی شرکت با ما تماس بگیرید.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="glow" size="lg">
              ارتباط با دفتر مرکزی
            </Button>
            <Button href="/products/castle-backup" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              مشاهده محصولات
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
