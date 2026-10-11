import React from 'react';
import type { Metadata } from 'next';
import { Award, FileCheck, Headphones, Shield, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'شرایط، قوانین و تعهدات لایسنس | قلعه فناوران هیمن',
  description:
    'ضوابط بهره‌برداری از لایسنس‌های نرم‌افزاری دائمی، تعهدات پشتیبانی فنی SLA و شرایط استقرار حضوری و ریموت قلعه فناوران هیمن.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f] text-start">
      {/* Hero Header */}
      <section className="relative pt-14 pb-20 bg-[#09090b] text-white border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="dark" className="border-white/15 bg-white/5 text-sky-400 mb-4 px-4 py-1.5 mx-auto">
            <FileCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>قراردادهای رسمی و حقوقی</span>
          </Badge>

          <h1 className="hero-title text-white tracking-normal mb-4">
            قوانین و ضوابط لایسنس‌های نرم‌افزاری
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            شرایط صدور لایسنس دائمی (Lifetime)، تعهدات پشتیبانی فنی و ضوابط خدمات پس از فروش شرکت قلعه فناوران هیمن
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 leading-relaxed">
        {/* Term 1: Lifetime License */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              ۱. ماهیت لایسنس دائمی (Perpetual / Lifetime License)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
            کلیه لایسنس‌های صادره برای محصولات Castle Backup و سامانه مانیتورینگ PSI به‌صورت مادام‌العمر (بدون انقضای زمانی) برای سرورها یا تعداد کلاینت‌های قیدشده در پیش‌فاکتور صادر می‌گردند. سازمان خریدار حق استفاده دائمی از نسخه خریداری‌شده را بدون پرداخت هیچ‌گونه هزینه اجاره یا اشتراک سالانه دارا می‌باشد.
          </p>
        </div>

        {/* Term 2: SLA & Technical Support */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              ۲. تعهدات پشتیبانی فنی و SLA کمتر از ۲ ساعت
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
            تمامی بسته‌های لایسنس سازمانی همراه با یک سال خدمات پشتیبانی فنی رایگان ارائه می‌شوند. شرکت متعهد می‌گردد در روزهای کاری حداکثر ظرف مدت ۲ ساعت به تیکت‌ها و تماس‌های اضطراری مدیران شبکه پاسخ داده و در شرایط بحرانی (Disaster Recovery) کارشناسان ارشد زیرساخت را جهت رفع اختلال به صورت ریموت یا حضوری در اختیار سازمان قرار دهد.
          </p>
        </div>

        {/* Term 3: Updates & Upgrades */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/10 text-amber-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              ۳. به‌روزرسانی‌های امنیتی و ارتقای سالانه
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
            در طول دوره قرارداد پشتیبانی فعال، تمامی پچ‌های امنیتی، رفع باگ‌ها و نسخه‌های سازگار با جدیدترین ویرایش‌های SQL Server و هایپروایزر VMware ESXi به‌صورت رایگان در اختیار مشتریان قرار می‌گیرد.
          </p>
        </div>
      </section>
    </div>
  );
}
