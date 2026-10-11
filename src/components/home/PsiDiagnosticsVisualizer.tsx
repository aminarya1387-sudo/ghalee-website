'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Server,
  Usb,
  ShieldAlert,
  Layers,
  Thermometer,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { toFaDigits } from '@/lib/utils';

interface SensorItem {
  id: string;
  name: string;
  category: 'hardware' | 'health' | 'security';
  value: string;
  status: 'normal' | 'warning' | 'optimal';
  detail: string;
}

export function PsiDiagnosticsVisualizer() {
  const [activeTab, setActiveTab] = useState<'all' | 'hardware' | 'health' | 'security'>('all');

  const sensors: SensorItem[] = [
    {
      id: 'cpu',
      name: 'پردازنده مرکزی (CPU)',
      category: 'hardware',
      value: 'Intel Xeon Gold 6330 @ 2.00GHz (28 Cores)',
      status: 'optimal',
      detail: 'دمای هسته‌ها: ۳۸°C • بار پردازشی: ۱۲٪',
    },
    {
      id: 'ram',
      name: 'حافظه اصلی (ECC RAM)',
      category: 'hardware',
      value: '128 GB DDR4 Registered ECC (4x32GB)',
      status: 'optimal',
      detail: 'سلامت باس: ۱۰۰٪ • خطای تصحیح حافظه: ۰',
    },
    {
      id: 'smart-disk',
      name: 'وضعیت سلامت دیسک (S.M.A.R.T)',
      category: 'health',
      value: 'NVMe Samsung PM9A3 1.92TB Enterprise',
      status: 'optimal',
      detail: 'سکتور خراب: ۰ • طول عمر باقی‌مانده دیسک: ۹۹٪',
    },
    {
      id: 'hdd-warning',
      name: 'دیسک مکانیکی ذخیره‌ساز (SATA HDD)',
      category: 'health',
      value: 'Seagate Enterprise Capacity 4TB',
      status: 'warning',
      detail: 'هشدار: ۲ Reallocated Sector شناسایی شد (نیاز به بازبینی)',
    },
    {
      id: 'usb-audit',
      name: 'پایش اتصال حافظه‌های جانبی (USB Audit)',
      category: 'security',
      value: 'پورت‌های USB تحت نظارت لحظه‌ای',
      status: 'optimal',
      detail: 'هیچ فلش مموری یا دیسک پرتابل غیرمجازی متصل نیست',
    },
    {
      id: 'motherboard',
      name: 'مادربورد و بایوس سرور',
      category: 'hardware',
      value: 'Supermicro X12DPI-NT6 (BIOS v3.4b UEFI)',
      status: 'optimal',
      detail: 'ولتاژ تغذیه ۱۲ ولت: ۱۲.۰۸V کاملاً پایدار',
    },
  ];

  const filtered = activeTab === 'all' ? sensors : sensors.filter((s) => s.category === activeTab);

  return (
    <div className="rounded-3xl bg-white border border-black/[0.08] shadow-apple overflow-hidden">
      {/* Top Header Strip */}
      <div className="p-6 sm:p-8 bg-[#1d1d1f] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">کنسول نظارت بلادرنگ PSI</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-normal">
            پایش بیش از ۳۰ شاخص سلامت سخت‌افزار
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            جمع‌آوری جامع مشخصات و هشدار زودهنگام خرابی قطعات بدون نیاز به حضور در محل سرور
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'all' ? 'bg-[#0066cc] text-white shadow-xs' : 'text-neutral-300 hover:text-white'
            }`}
          >
            همه شاخص‌ها ({toFaDigits(sensors.length)})
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'health' ? 'bg-[#0066cc] text-white shadow-xs' : 'text-neutral-300 hover:text-white'
            }`}
          >
            سلامت و S.M.A.R.T
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'security' ? 'bg-[#0066cc] text-white shadow-xs' : 'text-neutral-300 hover:text-white'
            }`}
          >
            امنیت پورت‌ها
          </button>
        </div>
      </div>

      {/* Sensor List Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((sensor) => {
            const isWarning = sensor.status === 'warning';
            return (
              <motion.div
                key={sensor.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-2xl border transition-all text-start ${
                  isWarning
                    ? 'bg-amber-500/[0.04] border-amber-500/30 shadow-xs'
                    : 'bg-[#f5f5f7]/60 border-black/[0.05] hover:border-black/[0.12]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {sensor.category === 'hardware' && (
                      <Cpu className="w-4 h-4 text-[#0066cc] shrink-0" />
                    )}
                    {sensor.category === 'health' && (
                      <Activity
                        className={`w-4 h-4 shrink-0 ${
                          isWarning ? 'text-amber-500' : 'text-emerald-500'
                        }`}
                      />
                    )}
                    {sensor.category === 'security' && (
                      <Usb className="w-4 h-4 text-sky-600 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-[#1d1d1f]">{sensor.name}</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isWarning
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isWarning ? 'هشدار خرابی' : 'عادی و پایدار'}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#1d1d1f] font-semibold mb-1">
                  {sensor.value}
                </div>

                <div className="text-[11px] text-[#6e6e73] leading-relaxed flex items-center gap-1.5">
                  {isWarning ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  )}
                  <span>{sensor.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-4 bg-[#f5f5f7] border-t border-black/[0.05] flex flex-wrap items-center justify-between text-xs text-[#6e6e73] gap-2">
        <span>امکان خروجی شناسنامه سخت‌افزاری به اکسل و تفکیک بر اساس واحدهای سازمانی</span>
        <span className="font-mono text-[#1d1d1f] font-semibold">پشتیبانی از ۳۲ و ۶۴ بیتی</span>
      </div>
    </div>
  );
}
