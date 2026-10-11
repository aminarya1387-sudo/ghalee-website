'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Headphones,
  Briefcase,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Send,
  Building,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toFaDigits } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    requestType: 'demo',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const typeLabel =
        formData.requestType === 'demo'
          ? 'درخواست دموی سازمانی'
          : formData.requestType === 'price'
          ? 'استعلام قیمت و پیش‌فاکتور'
          : formData.requestType === 'support'
          ? 'پشتیبانی فنی'
          : 'مشاوره عمومی';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          organization: formData.organization,
          subject: `${typeLabel} - ${formData.organization || formData.name}`,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.error || 'خطا در ثبت پیام.');
      }
    } catch (err) {
      setErrorMessage('خطای اتصال به سرور. لطفاً با شماره تلفن دفتر تماس حاصل فرمایید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f]">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#09090b] text-white border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0066cc]/25 to-sky-500/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="border-white/15 bg-white/5 text-sky-300 mb-4 px-4 py-1.5 mx-auto">
            <Headphones className="w-3.5 h-3.5 text-sky-400" />
            <span>میز خدمت و ارتباط با مشتریان</span>
          </Badge>

          <h1 className="hero-title text-white tracking-normal mb-6">
            همراه شما در حفظ امنیت داده‌ها
          </h1>

          <p className="text-lg sm:text-xl font-medium text-neutral-200 mb-4">
            پاسخگویی سریع مهندسان فنی و کارشناسان فروش شرکت قلعه فناوران هیمن
          </p>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-8">
            برای برگزاری جلسه پرزنت و دموی حضوری، استعلام پیش‌فاکتور رسمی، یا دریافت مشاوره فنی با ما تماس بگیرید یا فرم زیر را تکمیل نمایید.
          </p>
        </div>
      </section>

      {/* ----------------- MAIN CONTACT CONTENT ----------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Right Column: Direct Contact Cards (Persian RTL) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold text-[#1d1d1f] tracking-normal mb-6">
              واحدهای پاسخگویی مستقیم
            </h2>

            {/* Support Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-apple space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1d1d1f]">واحد پشتیبانی فنی و بازیابی</h3>
                  <span className="text-xs text-emerald-600 font-medium">پاسخگویی مستقیم مهندسان</span>
                </div>
              </div>

              <p className="text-xs text-[#6e6e73] leading-relaxed">
                راهنمایی در استقرار، تست سناریوهای بازیابی بحران و رفع ابهامات فنی پایگاه داده و سرورها.
              </p>

              <div className="space-y-3 pt-3 border-t border-black/[0.06] text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#6e6e73]">تلفن همراه پشتیبانی فنی:</span>
                  <a href="tel:09113349852" className="font-mono font-bold text-[#0066cc] hover:underline">
                    {toFaDigits('09113349852')}
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6e6e73]">شماره تماس کارشناس ارشد:</span>
                  <a href="tel:09118297437" className="font-mono font-bold text-[#0066cc] hover:underline">
                    {toFaDigits('09118297437')}
                  </a>
                </div>
              </div>
            </div>

            {/* Sales Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-apple space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1d1d1f]">واحد فروش و قراردادها</h3>
                  <span className="text-xs text-[#6e6e73]">استعلام و صدور پیش‌فاکتور</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-black/[0.06] text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#6e6e73]">تلفن دفتر مرکزی فروش:</span>
                  <a href="tel:01333663355" className="font-mono font-bold text-[#1d1d1f] hover:text-[#0066cc]">
                    {toFaDigits('013-33663355')}
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6e6e73]">پست الکترونیکی رسمی:</span>
                  <a href="mailto:info@castleco.ir" className="font-mono text-[#0066cc] hover:underline">
                    info@castleco.ir
                  </a>
                </div>
              </div>
            </div>

            {/* Science Park Office Info */}
            <div className="p-6 rounded-3xl bg-[#f5f5f7] border border-black/[0.05] space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0066cc] mt-0.5 shrink-0" />
                <div className="text-xs text-[#1d1d1f] space-y-1">
                  <span className="font-bold block">موقعیت دفتر مرکزی:</span>
                  <p className="text-[#6e6e73] leading-relaxed">
                    استان گیلان، رشت، مستقر در پارک علم و فناوری گیلان، شرکت قلعه فناوران هیمن
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6e6e73] pt-2 border-t border-black/[0.05]">
                <Clock className="w-4 h-4 text-[#86868b]" />
                <span>ساعات پاسخگویی اداری: شنبه تا چهارشنبه از ساعت ۸:۰۰ الی ۱۶:۰۰</span>
              </div>
            </div>
          </div>

          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.08] shadow-apple">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-[#0066cc]" />
                <h2 className="text-2xl font-bold text-[#1d1d1f]">
                  فرم ارتباط آنلاین و درخواست مشاوره
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6e6e73] mb-8">
                درخواست شما به طور مستقیم به کارشناس مربوطه ارجاع شده و در کمتر از ۲ ساعت اداری پاسخ داده خواهد شد.
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 text-center space-y-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold">پیام شما با موفقیت ارسال گردید</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    سپاس از تماس شما. کارشناسان فنی شرکت قلعه فناوران هیمن درخواست شما را بررسی کرده و به زودی با شما تماس خواهند گرفت.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                        نام و نام خانوادگی: <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: علی رضایی"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                        سازمان یا شرکت:
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="مثال: بیمارستان / شهرداری / شرکت ..."
                        className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                        شماره همراه یا تلفن تماس: <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                        پست الکترونیکی (اختیاری):
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.ir"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                      موضوع درخواست:
                    </label>
                    <select
                      value={formData.requestType}
                      onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                    >
                      <option value="demo">درخواست دموی حضوری یا آنلاین روی سرورهای سازمان</option>
                      <option value="price">استعلام قیمت و پیش‌فاکتور رسمی</option>
                      <option value="support">پشتیبانی فنی و بازیابی اطلاعات</option>
                      <option value="other">سایر امور یا همکاری پژوهشی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] mb-1.5">
                      متن پیام یا توضیحات سرورها:
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="تعداد سرورها، نسخه پایگاه داده، یا هر سوال فنی که دارید بنویسید..."
                      className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="glow"
                      size="lg"
                      disabled={isLoading}
                      className="w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isLoading ? 'در حال ارسال پیام...' : 'ارسال درخواست به کارشناسان قلعه'}</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
