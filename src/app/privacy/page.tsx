import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, Building } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'سیاست حفظ حریم خصوصی و امنیت داده‌ها | قلعه فناوران هیمن',
  description:
    'بیانیه رسمی شرکت قلعه فناوران هیمن در خصوص محرمانگی، حفظ اطلاعات سازمانی و عدم دسترسی به داده‌های پایگاه داده مشتریان.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f] text-start">
      {/* Hero Header */}
      <section className="relative pt-14 pb-20 bg-[#09090b] text-white border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="dark" className="border-white/15 bg-white/5 text-emerald-400 mb-4 px-4 py-1.5 mx-auto">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>امنیت اطلاعات و استانداردهای ISMS</span>
          </Badge>

          <h1 className="hero-title text-white tracking-normal mb-4">
            سیاست حفظ حریم خصوصی و محرمانگی داده‌ها
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            تعهد رسمی شرکت دانش‌بنیان قلعه فناوران هیمن در قبال حفاظت ۱۰۰ درصدی از داده‌های حیاتی نهادها و سازمان‌های طرف قرارداد
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 leading-relaxed">
        {/* Pillar 1: On-Premise Operation */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              ۱. عملکرد کاملاً محلی و ایزوله (On-Premise)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
            کلیه نرم‌افزارهای توسعه داده‌شده توسط شرکت قلعه فناوران هیمن (شامل Castle Backup، سامانه پایش PSI و ابزار مقایسه SQL) به صورت کاملاً مستقل و روی زیرساخت داخلی سازمان شما (شبکه ایزوله / LAN / اینترانت) مستقر می‌گردند. هیچ‌یک از نرم‌افزارها برای فرآیندهای پشتیبان‌گیری، رمزنگاری یا مقایسه دیتابیس نیاز به اتصال به اینترنت نداشته و هیچ ترافیک خارجی برقرار نمی‌کنند.
          </p>
        </div>

        {/* Pillar 2: Zero Telemetry */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              ۲. عدم دسترسی به محتوای پایگاه‌های داده و فایل‌ها
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
            شرکت قلعه فناوران تحت هیچ شرایطی به اطلاعات، جداول، پرسنل یا داده‌های محرمانه سازمان دسترسی ندارد. موتور پشتیبان‌گیری از طریق APIهای استاندارد SQL Server و VMware ESXi اقدام به تهیه فایل پشتیبان با رمزنگاری استاندارد AES-256 می‌نماید و کلیدهای رمزنگاری منحصراً در اختیار مدیر پایگاه داده (DBA) سازمان قرار دارد.
          </p>
        </div>

        {/* Pillar 3: Lead Confidentiality */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-600/10 text-[#0066cc] flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              ۳. محرمانگی اطلاعات استعلام و پیش‌فاکتور
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
            اطلاعات هویتی و فنی که در بخش استعلام قیمت یا درخواست دموی پرتال ثبت می‌فرمایید (شامل نام رابط، شماره تماس، نام اداره و مشخصات تقریبی سرورها) صرفاً به منظور صدور پیش‌فاکتور رسمی شرکتی و ارائه خدمات فنی مورد استفاده قرار گرفته و تحت الزامات محرمانگی سازمانی هرگز در اختیار هیچ شخص یا نهاد ثالثی قرار نخواهد گرفت.
          </p>
        </div>

        {/* Legal Contact Box */}
        <div className="p-6 rounded-2xl bg-black/[0.02] border border-black/[0.08] text-xs text-[#6e6e73] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#1d1d1f]">
            <FileText className="w-4 h-4 text-[#0066cc]" />
            <span>واحد امور حقوقی و حراست IT شرکت قلعه فناوران هیمن</span>
          </div>
          <p>
            در صورت نیاز به تبادل توافق‌نامه رسمی عدم افشای اطلاعات (NDA) پیش از برگزاری جلسه فنی یا استقرار دمو، با واحد امور قراردادها به شماره ۰۱۳-۳۳۶۶۳۳۵۵ مکاتبه فرمایید.
          </p>
        </div>
      </section>
    </div>
  );
}
