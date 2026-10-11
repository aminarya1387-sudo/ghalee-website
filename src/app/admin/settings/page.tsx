'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Save,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck,
  Bell,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SettingItem {
  key: string;
  value: string;
  description?: string | null;
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Record<string, SettingItem>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form fields
  const [salesPhone, setSalesPhone] = useState('');
  const [salesMobile, setSalesMobile] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [supportMobileSecondary, setSupportMobileSecondary] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [systemAlert, setSystemAlert] = useState('');

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        const s = data.settings || {};
        setSettings(s);

        setSalesPhone(s.sales_phone?.value || '013-33663355');
        setSalesMobile(s.sales_mobile?.value || '09113349852');
        setSupportPhone(s.support_phone?.value || '09113349852');
        setSupportMobileSecondary(s.support_mobile_secondary?.value || '09118297437');
        setCompanyAddress(s.company_address?.value || 'استان گیلان، مستقر در پارک علم و فناوری گیلان');
        setCompanyEmail(s.company_email?.value || 'info@castleco.ir');
        setSystemAlert(s.system_alert?.value || 'کلیه پشتیبان‌گیری‌ها و پایش‌های سرورهای دیتاسنتر در وضعیت نرمال قرار دارند.');
      }
    } catch (err) {
      console.error('Fetch settings error', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);

    const payload = {
      sales_phone: salesPhone,
      sales_mobile: salesMobile,
      support_phone: supportPhone,
      support_mobile_secondary: supportMobileSecondary,
      company_address: companyAddress,
      company_email: companyEmail,
      system_alert: systemAlert,
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: payload }),
      });

      if (res.ok) {
        setSuccessMessage('تنظیمات عمومی شرکت با موفقیت در دیتابیس ثبت و بروزرسانی شد.');
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        alert('خطا در ذخیره تنظیمات.');
      }
    } catch {
      alert('خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-start max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-1">
            <Settings className="w-4 h-4" />
            <span>پیکربندی اطلاعات پایه و ارتباطی</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-normal">
            تنظیمات عمومی سایت و شرکت
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            تغییر شماره‌های تماس، نشانی پستی و اعلانات فوری بدون نیاز به تغییر در کد برنامه
          </p>
        </div>

        <button
          onClick={fetchSettings}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all self-start sm:self-auto"
          title="بارگذاری مجدد"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Numbers Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121217] border border-white/10 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <Phone className="w-5 h-5 text-[#0066cc]" />
            <h2 className="text-base font-bold text-white">شماره‌های تماس رسمی و پشتیبانی</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                تلفن ثابت واحد فروش و قراردادها:
              </label>
              <input
                type="text"
                value={salesPhone}
                onChange={(e) => setSalesPhone(e.target.value)}
                placeholder="013-33663355"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                تلفن همراه کارشناس فروش:
              </label>
              <input
                type="text"
                value={salesMobile}
                onChange={(e) => setSalesMobile(e.target.value)}
                placeholder="09113349852"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                تلفن مرکز پشتیبانی فنی:
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                placeholder="09113349852"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                تلفن کشیک پشتیبانی زیرساخت:
              </label>
              <input
                type="text"
                value={supportMobileSecondary}
                onChange={(e) => setSupportMobileSecondary(e.target.value)}
                placeholder="09118297437"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Address and Email Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121217] border border-white/10 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <Building className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">نشانی پستی و پست الکترونیکی رسمی</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                نشانی پستی شرکت:
              </label>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="استان گیلان، مستقر در پارک علم و فناوری گیلان"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-2">
                رایانامه رسمی شرکت (Email):
              </label>
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="info@castleco.ir"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Urgent System Alert Announcement */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121217] border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <Bell className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">پیام وضعیت و اطلاعیه سامانه</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-2">
              متن اطلاعیه / وضعیت سرورهای دیتاسنتر:
            </label>
            <textarea
              rows={2}
              value={systemAlert}
              onChange={(e) => setSystemAlert(e.target.value)}
              placeholder="کلیه سرویس‌ها و بک‌آپ‌های دیتاسنتر در وضعیت کاملاً پایدار قرار دارند..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
            />
          </div>
        </div>

        {/* Save Button & Status Notification */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div>
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="glow"
            size="lg"
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'در حال ذخیره‌سازی...' : 'ذخیره و اعمال تنظیمات سازمانی'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
