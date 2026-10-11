'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Database,
  Cpu,
  Server,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Building,
  User,
  Phone,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { toFaDigits } from '@/lib/utils';

interface KpiData {
  total: number;
  newCount: number;
  inProgressCount: number;
  closedCount: number;
  castleBackupCount: number;
  psiCount: number;
  sqlCompareCount: number;
}

interface RecentSubmission {
  id: string;
  name: string;
  company: string;
  phone: string;
  productSlug?: string | null;
  status: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
  message: string;
}

interface RecentAudit {
  id: string;
  userId?: string | null;
  action: string;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [kpis, setKpis] = useState<KpiData>({
    total: 0,
    newCount: 0,
    inProgressCount: 0,
    closedCount: 0,
    castleBackupCount: 0,
    psiCount: 0,
    sqlCompareCount: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);
  const [recentAuditLogs, setRecentAuditLogs] = useState<RecentAudit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setKpis(data.kpis);
        setRecentSubmissions(data.recentSubmissions || []);
        setRecentAuditLogs(data.recentAuditLogs || []);
      }
    } catch (err) {
      console.error('Fetch stats error', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 text-start">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>مرکز کنترل و رهگیری استعلام‌های سازمانی</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-normal">
            پیشخوان مدیریت قلعه فناوران هیمن
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            وضعیت لحظه‌ای درخواست‌های پیش‌فاکتور، سلامت سرورها و رویدادهای بازرسی سیستم
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>بروزرسانی آمار</span>
          </button>

          <Link
            href="/admin/quotations"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0066cc] hover:bg-[#0077ed] text-white shadow-lg shadow-[#0066cc]/30 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>مدیریت پیش‌فاکتورها</span>
          </Link>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Inquiries */}
        <div className="p-6 rounded-2xl bg-[#121217] border border-white/10 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">کل درخواست‌ها و استعلام‌ها</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sky-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-3xl font-black font-mono text-white">
            {toFaDigits(kpis.total)}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">ثبت‌شده از پرتال خرید و تماس</p>
        </div>

        {/* New Pending */}
        <div className="p-6 rounded-2xl bg-[#121217] border border-amber-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300">در انتظار بررسی (جدید)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-3xl font-black font-mono text-amber-400">
            {toFaDigits(kpis.newCount)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>نیازمند تماس کارشناس فروش</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="p-6 rounded-2xl bg-[#121217] border border-white/10 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">در حال پیگیری و دمو</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-3xl font-black font-mono text-sky-400">
            {toFaDigits(kpis.inProgressCount)}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">جلسات آنلاین یا ارسال نمونه</p>
        </div>

        {/* Closed */}
        <div className="p-6 rounded-2xl bg-[#121217] border border-white/10 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">تکمیل‌شده / آرشیو</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-3xl font-black font-mono text-emerald-400">
            {toFaDigits(kpis.closedCount)}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">صدور فاکتور و لایسنس نهایی</p>
        </div>
      </div>

      {/* Product Demand Breakdown */}
      <div className="p-6 rounded-3xl bg-[#121217] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <span>تفکیک استعلام‌های سازمانی بر اساس محصولات</span>
          </h2>
          <span className="text-xs text-neutral-400 font-mono">توزیع تقاضای بازار</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Castle Backup */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Castle Backup</div>
              <div className="text-[11px] text-neutral-400">پشتیبان‌گیری دیتابیس و ESXi</div>
              <div className="text-lg font-bold font-mono text-sky-400 mt-1">
                {toFaDigits(kpis.castleBackupCount)} پرونده
              </div>
            </div>
          </div>

          {/* PSI */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">سامانه پایش PSI</div>
              <div className="text-[11px] text-neutral-400">مانیتورینگ سخت‌افزار کلاینت‌ها</div>
              <div className="text-lg font-bold font-mono text-indigo-400 mt-1">
                {toFaDigits(kpis.psiCount)} پرونده
              </div>
            </div>
          </div>

          {/* SQL Compare */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">SQL Server Compare</div>
              <div className="text-[11px] text-neutral-400">ابزار مقایسه دیتابیس (رایگان)</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                {toFaDigits(kpis.sqlCompareCount)} پرونده
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Submissions + Security Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Right (8 Cols): Recent Submissions */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#121217] border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0066cc]" />
                <span>جدیدترین درخواست‌های پیش‌فاکتور و استعلام</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                سازمان‌ها و ادارات ثبت‌شده در پرتال
              </p>
            </div>
            <Link
              href="/admin/quotations"
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>مشاهده همه</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentSubmissions.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              در حال حاضر پرونده‌ای ثبت نشده است.
            </div>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((sub) => {
                const isNew = sub.status === 'NEW';
                const isInProgress = sub.status === 'IN_PROGRESS';

                return (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-white">{sub.company}</span>
                        {isNew && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            جدید
                          </span>
                        )}
                        {isInProgress && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                            در حال پیگیری
                          </span>
                        )}
                        {sub.status === 'CLOSED' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            تکمیل‌شده
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{sub.name}</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono" dir="ltr">
                          <Phone className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{toFaDigits(sub.phone)}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/admin/quotations"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-center transition-all self-start sm:self-auto shrink-0"
                    >
                      بررسی پرونده
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Left (5 Cols): Live Security Audit Stream */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#121217] border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>رویدادهای امنیتی و بازرسی (Audit Log)</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                ثبت کلیه دسترسی‌ها و تراکنش‌های مدیریتی
              </p>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>مشاهده لاگ‌ها</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAuditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px]">
                  <span className="text-sky-300 font-bold">{log.action}</span>
                  <span>{new Date(log.createdAt).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-neutral-300 text-[11px] leading-relaxed line-clamp-2">
                  {log.details || 'بدون جزئیات'}
                </p>
                <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1 font-mono">
                  <span>کاربر: {log.userId || 'سیستم'}</span>
                  <span>IP: {log.ipAddress || '127.0.0.1'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
