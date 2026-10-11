'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  RefreshCw,
  Terminal,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toFaDigits } from '@/lib/utils';

interface ArchitecturePillar {
  id: string;
  categoryBadge: string;
  navLabel: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  features: string[];
}

export function CastleBackupStory() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const pillars: ArchitecturePillar[] = [
    {
      id: 'database-engine',
      categoryBadge: 'پایداری پایگاه داده',
      navLabel: 'بانک اطلاعاتی بدون توقف',
      title: 'معماری بلادرنگ بدون توقف پایگاه داده',
      tagline: 'پشتیبان‌گیری زنده در سطح سرویس بومی بدون قفل شدن جداول (Zero Table Lock)',
      description:
        'بهره‌گیری مستقیم از استانداردهای درونی موتور پایگاه داده بدون تحمیل بار پردازشی. کلیه تراکنش‌های حیاتی سازمان بدون کوچک‌ترین وقفه، افت سرعت یا مسدودسازی دسترسی کاربران (Locking) پردازش می‌شوند.',
      icon: Database,
      accentColor: '#0066cc',
      features: [
        'انطباق کامل با تراکنش‌های آنلاین با مصرف کمتر از ۲٪ پردازنده',
        'پشتیبانی استاندارد از Full Backup، Differential و Transaction Log',
        'سازگار با تمامی نسخه‌های Microsoft SQL Server (از ۲۰۰۵ تا ۲۰۲۲)',
        'پشتیبان‌گیری خودکار طبق سیاست‌های تعیین‌شده بدون نیاز به مداخله دستی',
      ],
    },
    {
      id: 'virtualization-cluster',
      categoryBadge: 'لایه مجازی‌سازی',
      navLabel: 'مجازی‌سازی VMware ESXi',
      title: 'حفاظت مستقیم از سطح هایپروایزر VMware',
      tagline: 'ارتباط مستقیم با هسته vSphere و پشتیبان‌گیری بدون خاموش کردن ماشین‌های مجازی',
      description:
        'نرم‌افزار قلعه به صورت مستقل از سیستم‌عامل‌های مهمان، با سطح هسته VMware ESXi تبادل داده انجام می‌دهد و به لطف فناوری CBT، تنها بلوک‌های تغییریافته را با بالاترین سرعت منتقل می‌نماید.',
      icon: Layers,
      accentColor: '#00d2ff',
      features: [
        'پشتیبان‌گیری مستقل از سیستم‌عامل مهمان (Windows / Linux)',
        'پشتیبانی از فناوری بومی CBT (Changed Block Tracking)',
        'تهیه Snapshot بدون ایجاد افت کارایی در ماشین‌های حساس',
        'قابلیت بازگردانی اضطراری کل ماشین مجازی (Disaster Recovery)',
      ],
    },
    {
      id: 'data-integrity',
      categoryBadge: 'یکپارچگی و سلامت داده',
      navLabel: 'فشرده‌سازی و سلامت هش',
      title: 'موتور فشرده‌سازی و ارزیابی بایت به بایت',
      tagline: 'کاهش تا ۸۰٪ حجم داده همراه با صدور گواهی سلامت هش نظامی SHA-512',
      description:
        'تقسیم هوشمند دیتابیس‌های چندصد گیگابایتی به قطعات قابل مدیریت (Split)، کاهش چشمگیر ترافیک شبکه و اعتبارسنجی دقیق سلامت ساختار فایل پیش و پس از انتقال به مقصد.',
      icon: HardDrive,
      accentColor: '#10b981',
      features: [
        'اعتبارسنجی با الگوریتم‌های هش استاندارد: SHA-512, SHA-256, CRC32',
        'امکان تقطیع فایل‌های بزرگ به قطعات دلخواه جهت سهولت انتقال',
        'فشرده‌سازی چند جریانی هوشمند و صرفه‌جویی اساسی در فضای ذخیره‌سازی',
        'تست خودکار خوانایی و بازیابی فایل‌های آرشیو در دوره‌های زمانی منظم',
      ],
    },
    {
      id: 'security-vault',
      categoryBadge: 'امنیت و پدافند سایبری',
      navLabel: 'خزانه امن و رمزنگاری',
      title: 'خزانه ایزوله و همگام‌سازی چند مقصده',
      tagline: 'رمزنگاری استاندارد AES-256 و انتقال موازی به شبکه محلی، NAS و بستر ابری',
      description:
        'حفاظت نفوذناپذیر در برابر تهدیدات باج‌افزاری از طریق جداسازی سطوح دسترسی، ارسال هم‌زمان به فضاهای ذخیره‌سازی ابری و محلی و تحقق استاندارد پدافند غیرعامل ۱-۲-۳.',
      icon: ShieldCheck,
      accentColor: '#f59e0b',
      features: [
        'رمزنگاری قدرتمند نظامی ۲۵۶ بیتی با کلید اختصاصی سازمان',
        'پشتیبانی از شبکه محلی (UNC), FTPS, Google Drive و Amazon S3',
        'پشتیبانی از جداسازی فیزیکی (Air-Gap) بر روی حافظه‌های جانبی',
        'عدم دسترسی کاربران ویندوز به مقاصد نهایی جهت مقابله با باج‌افزارها',
      ],
    },
  ];

  // Auto-cycle through pillars
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % pillars.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, pillars.length]);

  const current = pillars[activeTab];
  const PillarIcon = current.icon;

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#0066cc]/20 via-[#00d2ff]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-40 end-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="dark" className="border-white/15 bg-white/5 text-sky-300 mb-4 px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>معماری هسته نرم‌افزار • Core Engine Architecture</span>
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-normal text-white mb-5">
            ستون‌های مهندسی{' '}
            <span className="bg-gradient-to-l from-[#00d2ff] via-[#0099ff] to-[#0066cc] bg-clip-text text-transparent">
              Castle Backup
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            چهار سازوکار بنیادین و بومی برای تضمین ۱۰۰ درصدی تداوم کارایی سازمان و بازیابی مطمئن در شرایط بحران.
          </p>
        </div>

        {/* Architecture Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {pillars.map((pillar, idx) => {
            const isActive = idx === activeTab;
            const Icon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => {
                  setActiveTab(idx);
                  setIsAutoPlaying(false);
                }}
                className={`relative px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-white/15 text-white shadow-lg border border-white/25 backdrop-blur-md'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon
                  className="w-4 h-4 shrink-0 transition-colors"
                  style={{ color: isActive ? pillar.accentColor : '#86868b' }}
                />
                <span>{pillar.navLabel}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePillarIndicator"
                    className="absolute inset-0 rounded-2xl border-2 border-[#00d2ff]/40 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Description & Key Highlights */}
          <div className="lg:col-span-6 space-y-6 text-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/15 shadow-inner"
                    style={{ backgroundColor: `${current.accentColor}20` }}
                  >
                    <PillarIcon className="w-6 h-6" style={{ color: current.accentColor }} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-sky-400 tracking-wider">
                      معماری لایه: {current.categoryBadge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-normal">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-medium text-sky-200/90 leading-snug">
                  {current.tagline}
                </p>

                <p className="text-sm sm:text-base text-neutral-300/80 leading-relaxed">
                  {current.description}
                </p>

                {/* Key feature checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {current.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5 text-xs text-neutral-200"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: current.accentColor }}
                      />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Button
                    href="/products/castle-backup"
                    variant="glow"
                    size="md"
                    className="shadow-lg"
                  >
                    <span>بررسی معماری فنی کامل</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>

                  <Button
                    href="/contact?type=demo"
                    variant="outline"
                    size="md"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    درخواست تست روی سرور شما
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Stage & Live Telemetry Simulator */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#121217] p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Window Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-neutral-300 font-mono">
                    CastleCore Engine v3.4 • Server Telemetry
                  </span>
                </div>
              </div>

              {/* Dynamic Interactive Stage Content */}
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  /* Pillar 1: Zero Downtime & SQL Server */
                  <motion.div
                    key="pillar-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-5 h-5 text-[#0066cc]" />
                          <span className="text-sm font-bold text-white">
                            Microsoft SQL Server Instance
                          </span>
                        </div>
                        <Badge variant="success" className="text-[11px]">
                          تراکنش‌ها فعال (Zero Lock)
                        </Badge>
                      </div>

                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between text-neutral-400">
                          <span>مصرف پردازنده سرور (CPU Overhead):</span>
                          <span className="text-emerald-400 font-bold">{toFaDigits(1.4)}٪</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '18%' }}
                            transition={{ duration: 1 }}
                            className="bg-emerald-400 h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[11px] text-neutral-400 mb-1">نوع پشتیبان‌گیری</div>
                        <div className="text-sm font-semibold text-sky-300">Differential & Log</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[11px] text-neutral-400 mb-1">وضعیت قفل دیتابیس</div>
                        <div className="text-sm font-semibold text-emerald-400">بدون اختلال کاربر</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0066cc]/10 border border-[#0066cc]/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#00d2ff] animate-pulse" />
                        <span className="text-neutral-200">هماهنگ با زمان‌بندی بومی سرور</span>
                      </div>
                      <span className="text-[#00d2ff] font-mono">Active</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  /* Pillar 2: VMware ESXi */
                  <motion.div
                    key="pillar-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-5 h-5 text-sky-400" />
                          <span className="text-sm font-bold text-white">
                            VMware ESXi Hypervisor
                          </span>
                        </div>
                        <Badge variant="accent" className="text-[11px]">
                          VADP Snapshot
                        </Badge>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-neutral-300">
                          <span className="flex items-center gap-1.5">
                            <Server className="w-3.5 h-3.5 text-neutral-400" />
                            <span>ماشین مجازی اصلی (ERP-Server-01)</span>
                          </span>
                          <span className="text-emerald-400 font-mono">Running (No Freeze)</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-300">
                          <span className="flex items-center gap-1.5">
                            <Server className="w-3.5 h-3.5 text-neutral-400" />
                            <span>پایگاه داده (DB-Cluster-PROD)</span>
                          </span>
                          <span className="text-emerald-400 font-mono">Running (Streamed)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between text-xs">
                      <span className="text-sky-200">ردگیری بلوک‌های تغییریافته (CBT)</span>
                      <span className="font-mono text-emerald-400 font-bold">Enabled</span>
                    </div>

                    <div className="text-[11px] text-neutral-400 text-center">
                      بدون نیاز به خاموش شدن یا مکث لحظه‌ای در ماشین‌های مجازی سازمانی
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  /* Pillar 3: Compression & Checksums */
                  <motion.div
                    key="pillar-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-5 h-5 text-emerald-400" />
                          <span className="text-sm font-bold text-white">موتور فشرده‌سازی و تقسیم فایل</span>
                        </div>
                        <span className="text-xs text-emerald-400 font-mono font-bold">
                          ۷۸٪ کاهش حجم
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-neutral-400">
                          <span>حجم خام اولیه:</span>
                          <span className="text-neutral-200 font-mono">{toFaDigits(450)} GB</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>حجم نهایی فشرده‌شده:</span>
                          <span className="text-emerald-400 font-bold font-mono">{toFaDigits(99)} GB</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '22%' }}
                            transition={{ duration: 1 }}
                            className="bg-emerald-400 h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-neutral-400 text-[11px] mb-1">الگوریتم هشینگ</div>
                        <div className="font-mono text-emerald-300">SHA-512 & CRC32</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-neutral-400 text-[11px] mb-1">صحت ساختار بایت‌ها</div>
                        <div className="text-emerald-400 font-bold">۱۰۰٪ تاییدشده</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 3 && (
                  /* Pillar 4: Military Encryption & Multi-Destination */
                  <motion.div
                    key="pillar-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="w-6 h-6 text-amber-400" />
                        <div>
                          <div className="text-sm font-bold text-white">رمزنگاری نظامی چندلایه</div>
                          <div className="text-xs text-neutral-400 font-mono">
                            AES-256 Bit • Anti-Ransomware Shield
                          </div>
                        </div>
                      </div>
                      <Badge variant="dark" className="border-amber-500/30 text-amber-300 text-[11px]">
                        ایزوله و امن
                      </Badge>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-neutral-200">
                          <HardDrive className="w-4 h-4 text-sky-400" />
                          <span>فضای ذخیره‌سازی تحت شبکه (NAS / SAN)</span>
                        </span>
                        <span className="text-emerald-400 font-mono">انتقال تکمیل شد</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-neutral-200">
                          <Cloud className="w-4 h-4 text-amber-400" />
                          <span>Google Drive / سرور راه دور امن FTPS</span>
                        </span>
                        <span className="text-emerald-400 font-mono">همگام‌سازی موفق</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Console status footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                  <span>معماری فعال: {current.categoryBadge}</span>
                </span>
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isAutoPlaying ? 'animate-spin' : ''}`}
                    style={{ animationDuration: '6s' }}
                  />
                  <span>{isAutoPlaying ? 'پایش مداوم فعال' : 'توقف چرخش'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
