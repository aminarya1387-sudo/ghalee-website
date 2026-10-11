'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowLeft,
  Server,
  PhoneCall,
  Cpu,
  Download,
  Check,
  Database,
  CheckCircle2,
  HardDrive,
  Layers,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toFaDigits } from '@/lib/utils';

type ProductType = 'castle-backup' | 'psi' | 'sql-compare';

interface PlanDetail {
  id: string;
  name: string;
  tag: string;
  desc: string;
  features: string[];
  recommended?: boolean;
}

interface ProductInfo {
  title: string;
  subtitle: string;
  tagline: string;
  plans: PlanDetail[];
}

const productPlans: Record<ProductType, ProductInfo> = {
  'castle-backup': {
    title: 'Castle Backup',
    subtitle: 'پشتیبان‌گیری بومی بدون توقف از پایگاه‌های داده SQL Server و هایپروایزر VMware ESXi',
    tagline: 'پیش‌فاکتور رسمی لایسنس دائمی (Lifetime) با یک سال پشتیبانی و به‌روزرسانی رایگان',
    plans: [
      {
        id: 'cb-single',
        name: 'تک سرور پایگاه داده (Single Server)',
        tag: 'پایگاه داده مستقل',
        desc: 'مناسب سازمان‌ها با یک سرور اصلی پایگاه داده SQL Server',
        features: [
          'پشتیبان‌گیری نامحدود از کلیه دیتابیس‌های روی یک سرور',
          'پشتیبانی جامع از Full، Differential و Transaction Log',
          'فشرده‌سازی تا ۸۰٪ و تقسیم فایل‌های سنگین (Split)',
          'رمزنگاری نظامی استاندارد ۲۵۶ بیتی (AES-256)',
          'انتقال خودکار به شبکه محلی، FTP، Google Drive و USB',
          'یک سال پشتیبانی فنی و به‌روزرسانی سالانه رایگان',
        ],
      },
      {
        id: 'cb-cluster',
        name: 'کلاستر مجازی‌سازی VMware ESXi',
        tag: 'محبوب‌ترین پلن',
        desc: 'راهکار جامع پشتیبان‌گیری زنده از ماشین‌های مجازی و دیتابیس‌ها',
        features: [
          'تمامی قابلیت‌های نسخه تک‌سرور پایگاه داده',
          'پشتیبان‌گیری بومی از هایپروایزر VMware ESXi و vSphere',
          'پشتیبانی از فناوری CBT و اسنپ‌شات زنده بدون توقف ماشین‌ها',
          'پشتیبان‌گیری هم‌زمان به چند مقصد ایزوله (قاعده ۱-۲-۳)',
          'استقرار و راه‌اندازی حضوری یا ریموت توسط مهندسان ارشد',
          'تعهد SLA پاسخگویی فنی کمتر از ۲ ساعت',
        ],
        recommended: true,
      },
      {
        id: 'cb-enterprise',
        name: 'سازمانی نامحدود (Enterprise SLA)',
        tag: 'دیتاسنتر بزرگ',
        desc: 'ویژه نهادها، وزارت‌خانه‌ها، بیمارستان‌ها و شرکت‌های چند شعبه‌ای',
        features: [
          'لایسنس نامحدود هاست‌های ESXi و سرورهای پایگاه داده',
          'انطباق با الزامات امنیتی حراست و چک‌لیست‌های افتا/فاوا',
          'پشتیبانی اختصاصی ۲۴ ساعته در تمامی روزهای سال (24/7)',
          'آموزش تخصصی حضوری به تیم زیرساخت و DBA سازمان',
          'قرارداد رسمی شرکتی با کد اقتصادی و شناسه ملی',
        ],
      },
    ],
  },
  'psi': {
    title: 'سامانه پایش سخت‌افزار و نرم‌افزار (PSI)',
    subtitle: 'کنسول متمرکز تحت وب جهت پایش ۳۰+ شاخص سخت‌افزاری، سلامت دیسک و امنیت پورت‌ها',
    tagline: 'صدور پیش‌فاکتور بر اساس تعداد کلاینت‌ها و سرورهای تحت پوشش شبکه سازمان',
    plans: [
      {
        id: 'psi-50',
        name: 'بسته ۵۰ کلاینت (شبکه متوسط)',
        tag: 'تا ۵۰ رایانه',
        desc: 'مناسب شرکت‌ها و ادارات با حداکثر ۵۰ رایانه و کاربر فعال',
        features: [
          'پایش ۳۰+ سنسور سلامت سخت‌افزار و قطعات',
          'تشخیص خطاهای S.M.A.R.T و پیش‌بینی خرابی هارد دیسک',
          'ردگیری اتصال حافظه‌های جانبی غیرمجاز (فلش و هارد اکسترنال)',
          'صدور شناسنامه استاندارد چاپی سخت‌افزار رایانه‌ها',
          'خروجی کامل گزارش‌ها به فرمت اکسل (XLSX)',
          'کنسول متمرکز تحت وب بدون نیاز به ابزار جانبی',
        ],
      },
      {
        id: 'psi-250',
        name: 'بسته ۵۰ تا ۲۵۰ کلاینت (شبکه سازمانی)',
        tag: 'تا ۲۵۰ سیستم',
        desc: 'ایده‌آل برای ادارات کل، بیمارستان‌ها و کارخانجات بزرگ',
        features: [
          'تمامی امکانات بسته ۵۰ کلاینت',
          'تفکیک چارت سازمانی و واحدها بر اساس رنج شبکه و IP',
          'اسکن خودکار پورت‌های باز و سرویس‌های در حال اجرا',
          'گزارش خودکار تغییر قطعات کیس به مدیر شبکه',
          'سیستم اعلام هشدار زودهنگام سوختن هارد به کارشناسان فاوا',
          'یک سال پشتیبانی فنی و ارتقای سالانه رایگان',
        ],
        recommended: true,
      },
      {
        id: 'psi-unlimited',
        name: 'سازمانی نامحدود (Enterprise PSI)',
        tag: 'نامحدود کلاینت',
        desc: 'ویژه دستگاه‌های اجرایی، دانشگاه‌ها و هلدینگ‌های کشوری',
        features: [
          'لایسنس نامحدود تعداد کلاینت‌ها و سرورها',
          'اتصال به نرم‌افزارهای حسابداری اموال و انبارداری سازمان',
          'ماژول اختصاصی ثبت و تایید اسقاط اموال IT',
          'استقرار سرور کنسول روی شبکه داخلی سازمان بدون اتصال به اینترنت',
          'آموزش جامع به کارشناسان حراست، اموال و شبکه',
        ],
      },
    ],
  },
  'sql-compare': {
    title: 'SQL Server Data & Schema Compare',
    subtitle: 'ابزار تخصصی مقایسه و همگام‌سازی ساختار و داده‌های بانک‌های اطلاعاتی',
    tagline: 'نسخه عمومی رایگان برای دانلود؛ سفارشی‌سازی اختصاصی برای دیتابیس‌های ابَر بزرگ',
    plans: [
      {
        id: 'sql-free',
        name: 'نسخه عمومی و رایگان (Community)',
        tag: '۱۰۰٪ رایگان',
        desc: 'هدیه قلعه به جامعه برنامه‌نویسان، مدیران پایگاه داده و مهندسان نرم‌افزار',
        features: [
          'مقایسه کامل ساختار جداول، ویوها، پروسیجرها و توابع',
          'مقایسه رکوردهای جداول بر اساس کلیدهای اصلی (PK)',
          'تولید خودکار اسکریپت همگام‌سازی با یک کلیک',
          'بدون در نظر گرفتن نسخه SQL Server (از ۲۰۰۵ تا ۲۰۲۲)',
          'خروجی کامل تفاوت‌ها به فرمت اکسل',
          'دانلود مستقیم و فوری بدون نیاز به پرداخت یا ثبت لایسنس',
        ],
        recommended: true,
      },
      {
        id: 'sql-custom',
        name: 'پشتیبانی سازمانی و سفارشی‌سازی',
        tag: 'قرارداد سازمانی',
        desc: 'یکپارچه‌سازی ابزار مقایسه با فرآیندهای CI/CD و اتوماسیون داده سازمان',
        features: [
          'نسخه سفارشی‌سازی شده برای پایگاه‌های داده با بیش از ۱۰۰ میلیون رکورد',
          'اسکریپت‌نویسی خودکار جاب‌های زمان‌بندی‌شده (Automated Sync Jobs)',
          'یکپارچه‌سازی با نرم‌افزارهای جامع ERP سازمانی',
          'پشتیبانی مستقیم و مشاوره اختصاصی از معماران ارشد دیتابیس قلعه',
        ],
      },
    ],
  },
};

function parseProductParam(param: string | null): ProductType {
  if (!param) return 'castle-backup';
  const clean = param.toLowerCase().trim();
  if (clean === 'psi' || clean.includes('psi') || clean.includes('monitor') || clean.includes('system')) {
    return 'psi';
  }
  if (clean === 'sql-compare' || clean.includes('sql') || clean.includes('compare')) {
    return 'sql-compare';
  }
  return 'castle-backup';
}

function PurchaseContent() {
  const searchParams = useSearchParams();
  const rawProduct = searchParams.get('product');
  const rawPlan = searchParams.get('plan');

  const initialProd = parseProductParam(rawProduct);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(initialProd);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    if (rawPlan && productPlans[initialProd].plans.some((p) => p.id === rawPlan)) {
      return rawPlan;
    }
    const rec = productPlans[initialProd].plans.find((p) => p.recommended);
    return rec ? rec.id : productPlans[initialProd].plans[0].id;
  });

  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [spec1, setSpec1] = useState('');
  const [spec2, setSpec2] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state whenever URL query params change
  useEffect(() => {
    const prodParam = searchParams.get('product');
    if (prodParam) {
      const parsed = parseProductParam(prodParam);
      setSelectedProduct(parsed);
      const planParam = searchParams.get('plan');
      if (planParam && productPlans[parsed].plans.some((p) => p.id === planParam)) {
        setSelectedPlanId(planParam);
      } else {
        const rec = productPlans[parsed].plans.find((p) => p.recommended);
        setSelectedPlanId(rec ? rec.id : productPlans[parsed].plans[0].id);
      }
    }
  }, [searchParams]);

  const currentProductData = productPlans[selectedProduct];
  const activePlan = currentProductData.plans.find((p) => p.id === selectedPlanId) || currentProductData.plans[0];

  const handleProductChange = (prod: ProductType) => {
    setSelectedProduct(prod);
    const rec = productPlans[prod].plans.find((p) => p.recommended);
    setSelectedPlanId(rec ? rec.id : productPlans[prod].plans[0].id);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    const formElement = document.getElementById('quotation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payloadSubject = `درخواست پیش‌فاکتور رسمی: ${currentProductData.title} [پلن: ${activePlan.name}]`;
      const payloadMessage = `
محصول انتخابی: ${currentProductData.title}
پلن انتخابی: ${activePlan.name} (${activePlan.tag})
نام سازمان / شرکت: ${orgName}
شخص رابط: ${contactName}
تلفن تماس: ${phone}
پست الکترونیکی: ${email || 'ثبت نشده'}
مشخصات فنی اعلامی ۱: ${spec1 || 'ذکر نشده'}
مشخصات فنی اعلامی ۲: ${spec2 || 'ذکر نشده'}
توضیحات تکمیلی: ${additionalNotes || 'ندارد'}
      `.trim();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone,
          email,
          organization: orgName,
          subject: payloadSubject,
          message: payloadMessage,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert('خطا در ارسال درخواست. لطفاً مستقیماً با تلفن ۰۱۳-۳۳۶۶۳۳۵۵ تماس حاصل فرمایید.');
      }
    } catch {
      alert('خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#1d1d1f]">
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-[#09090b] text-white border-b border-white/10 overflow-hidden text-center">
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0066cc]/25 to-sky-500/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="dark" className="border-white/15 bg-white/5 text-sky-300 mb-4 px-4 py-1.5 mx-auto">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>راهنمای خرید، پلن‌های تفکیکی و پیش‌فاکتور رسمی</span>
          </Badge>

          <h1 className="hero-title text-white tracking-normal mb-5">
            پلن‌های لایسنس سازمانی به تفکیک محصول
          </h1>

          <p className="text-lg sm:text-xl font-medium text-neutral-200 mb-4">
            هر محصول متناسب با نیاز زیرساخت سازمان شما فرمول‌بندی شده است
          </p>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-10">
            برای هر نرم‌افزار، لایسنس به صورت دائمی (Lifetime) به همراه قرارداد پشتیبانی و فاکتور رسمی با شناسه ملی و کد اقتصادی صادر می‌گردد.
          </p>

          {/* Product Tabs Selector */}
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 gap-1.5">
            <button
              onClick={() => handleProductChange('castle-backup')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedProduct === 'castle-backup'
                  ? 'bg-[#0066cc] text-white shadow-lg'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Castle Backup</span>
            </button>

            <button
              onClick={() => handleProductChange('psi')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedProduct === 'psi'
                  ? 'bg-[#0066cc] text-white shadow-lg'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>سامانه مانیتورینگ PSI</span>
            </button>

            <button
              onClick={() => handleProductChange('sql-compare')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedProduct === 'sql-compare'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>SQL Server Compare</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-mono">رایگان</span>
            </button>
          </div>
        </div>
      </section>

      {/* ----------------- 2. DISTINCT PRODUCT PLANS GRID ----------------- */}
      <section className="py-20 bg-[#f5f5f7] border-b border-black/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-2">
              پلن‌های {currentProductData.title}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-normal mb-2">
              انتخاب پلن مناسب سازمان شما
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73]">
              {currentProductData.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProductData.plans.map((p) => {
              const isSelected = p.id === selectedPlanId;
              return (
                <div
                  key={p.id}
                  className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-[#121217] text-white shadow-2xl ring-4 ring-[#0066cc] border-transparent'
                      : 'bg-white text-[#1d1d1f] border border-black/[0.08] shadow-apple hover:shadow-apple-hover'
                  }`}
                >
                  {p.recommended && (
                    <div className="absolute -top-3.5 end-8 bg-[#0066cc] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>پیشنهاد کارشناسان</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono px-2.5 py-1 rounded-lg ${
                        isSelected ? 'bg-white/10 text-sky-300' : 'bg-black/5 text-[#6e6e73]'
                      }`}>
                        {p.tag}
                      </span>
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-[#0066cc]" />
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                    <p className={`text-xs leading-relaxed mb-6 ${isSelected ? 'text-neutral-400' : 'text-[#6e6e73]'}`}>
                      {p.desc}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-black/[0.05] dark:border-white/10 mb-8">
                      {p.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          <span className="leading-relaxed">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedProduct === 'sql-compare' && p.id === 'sql-free' ? (
                    <a
                      href="/downloads/Castle_SQL_Compare_FreeEdition.zip"
                      download="Castle_SQL_Compare_FreeEdition.zip"
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>دانلود مستقیم نسخه رایگان (بدون نیاز به پیش‌فاکتور)</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(p.id)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-[#0066cc] text-white shadow-lg shadow-[#0066cc]/30'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-neutral-200'
                      }`}
                    >
                      <span>{isSelected ? '✓ این پلن انتخاب شده است' : 'انتخاب این پلن جهت استعلام'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 3. DYNAMIC QUOTATION FORM TAILORED TO USER CHOICE ----------------- */}
      <section id="quotation-form" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-start">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.08] shadow-apple">
          {/* Header clearly identifies the selected product and plan */}
          <div className="border-b border-black/[0.06] pb-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-[#0066cc]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">
                  {selectedProduct === 'castle-backup' && `درخواست پیش‌فاکتور رسمی لایسنس Castle Backup`}
                  {selectedProduct === 'psi' && `استعلام قیمت و پیش‌فاکتور سامانه مانیتورینگ PSI`}
                  {selectedProduct === 'sql-compare' && `درخواست سفارشی‌سازی و استعلام SQL Compare`}
                </h2>
              </div>
              <Badge variant="accent" className="font-mono text-xs">
                {currentProductData.title}
              </Badge>
            </div>

            {/* Dynamic context alert box */}
            <div className="mt-4 p-4 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-sky-800 block">پلن فعال انتخابی شما:</span>
                <span className="text-sm font-bold text-[#0066cc]">
                  {activePlan.name} ({activePlan.tag})
                </span>
              </div>
              <div className="text-xs text-neutral-600 bg-white/80 px-3 py-1.5 rounded-lg border border-sky-100/50">
                <span>تعهد پاسخگویی SLA: </span>
                <strong className="text-emerald-700">کمتر از ۲ ساعت کاری</strong>
              </div>
            </div>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold">
                درخواست پیش‌فاکتور برای «{activePlan.name}» ثبت شد
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                پیش‌فاکتور رسمی با مهر و سربرگ شرکت قلعه فناوران هیمن صادر شده و کارشناسان فروش با شماره {toFaDigits(phone)} تماس حاصل خواهند نمود.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-semibold text-[#0066cc] underline pt-2 block mx-auto"
              >
                ثبت درخواست جدید برای محصول یا پلن دیگر
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] mb-2">
                    نام اداره، سازمان یا شرکت: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="مثال: شرکت آب و فاضلاب / بیمارستان پارس"
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] mb-2">
                    نام و سمت شخص رابط: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="مثال: مهندس حسینی (مدیر زیرساخت و شبکه)"
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] mb-2">
                    شماره همراه یا تلفن مستقیم رابط: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۱۳-۳۳۶۶۳۳۵۵"
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] mb-2">
                    پست الکترونیکی سازمانی (اختیاری):
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="it@organization.ir"
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  />
                </div>
              </div>

              {/* Product-Specific Tailored Fields */}
              {selectedProduct === 'castle-backup' && (
                <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
                    <Database className="w-4 h-4 text-[#0066cc]" />
                    <span>مشخصات فنی زیرساخت دیتابیس و مجازی‌سازی سازمان:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#6e6e73] block mb-1 font-medium">نسخه SQL Server فعال:</span>
                      <input
                        type="text"
                        value={spec1}
                        onChange={(e) => setSpec1(e.target.value)}
                        placeholder="مثال: SQL Server 2019 / 2022 Enterprise"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] bg-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                      />
                    </div>
                    <div>
                      <span className="text-[#6e6e73] block mb-1 font-medium">تعداد هاست‌های ESXi یا سرورهای فیزیکی:</span>
                      <input
                        type="text"
                        value={spec2}
                        onChange={(e) => setSpec2(e.target.value)}
                        placeholder="مثال: ۳ هاست فیزیکی ESXi، ۲۵ ماشین مجازی"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] bg-white focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedProduct === 'psi' && (
                <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <span>مشخصات کلاینت‌ها و تجهیزات تحت پوشش سامانه PSI:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#6e6e73] block mb-1 font-medium">تعداد تقریبی رایانه‌های کلاینت:</span>
                      <input
                        type="text"
                        value={spec1}
                        onChange={(e) => setSpec1(e.target.value)}
                        placeholder="مثال: ۱۲۰ کیس اداری در ۳ ساختمان"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                    <div>
                      <span className="text-[#6e6e73] block mb-1 font-medium">تعداد سرورهای فیزیکی و اتاق سرور:</span>
                      <input
                        type="text"
                        value={spec2}
                        onChange={(e) => setSpec2(e.target.value)}
                        placeholder="مثال: ۶ سرور رک‌مونت"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedProduct === 'sql-compare' && (
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                    <Server className="w-4 h-4 text-emerald-600" />
                    <span>مشخصات پایگاه داده جهت سفارشی‌سازی SQL Compare:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#6e6e73] block mb-1 font-medium">تعداد رکورد یا حجم بزرگترین دیتابیس:</span>
                      <input
                        type="text"
                        value={spec1}
                        onChange={(e) => setSpec1(e.target.value)}
                        placeholder="مثال: جدول تراکنش با ۵۰ میلیون رکورد"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <span className="text-[#6e6e73] block mb-1 font-medium">محیط پیاده‌سازی و یکپارچه‌سازی:</span>
                      <input
                        type="text"
                        value={spec2}
                        onChange={(e) => setSpec2(e.target.value)}
                        placeholder="مثال: پایپ‌لاین CI/CD یا جاب‌های هفتگی خودکار"
                        className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1d1d1f] mb-2">
                  توضیحات و نیازمندی‌های اختصاصی سازمان:
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="در صورت داشتن الزامات خاص حراست، نیاز به حضور کارشناس در محل یا خرید از سامانه ستاد ایران در این قسمت ذکر فرمایید..."
                  className="w-full px-4 py-2.5 rounded-xl border border-black/[0.1] bg-[#f5f5f7]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  disabled={isLoading}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isLoading
                      ? 'در حال پردازش درخواست...'
                      : `استعلام پیش‌فاکتور برای «${activePlan.name}»`}
                  </span>
                </Button>

                <div className="flex items-center gap-2 text-xs text-[#6e6e73]">
                  <PhoneCall className="w-4 h-4 text-[#0066cc]" />
                  <span>تلفن تماس فوری فروش: {toFaDigits('013-33663355')}</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default function PurchasePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-center p-8">
          <div className="space-y-3">
            <div className="w-8 h-8 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#6e6e73]">در حال بارگذاری پلن‌های لایسنس...</p>
          </div>
        </div>
      }
    >
      <PurchaseContent />
    </Suspense>
  );
}
