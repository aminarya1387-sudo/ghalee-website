'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Search,
  Filter,
  User,
  Clock,
  Terminal,
  Activity,
} from 'lucide-react';
import { toFaDigits } from '@/lib/utils';

interface AuditLog {
  id: string;
  userId?: string | null;
  action: string;
  entity?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export default function AuditLogsAdminPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs?limit=100');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Fetch logs error', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filterAction !== 'ALL' && !log.action.startsWith(filterAction)) {
      return false;
    }
    if (search) {
      const s = search.toLowerCase();
      return (
        log.action.toLowerCase().includes(s) ||
        (log.details || '').toLowerCase().includes(s) ||
        (log.userId || '').toLowerCase().includes(s) ||
        (log.ipAddress || '').includes(s)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>نظارت یکپارچه بر رویدادهای امنیتی (Audit Logging)</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-normal">
            لاگ‌های بازرسی و امنیت سیستم
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            ردگیری کلیه ورودها، تغییرات استعلام‌ها و آدرس‌های IP طبق الزامات امنیت داده
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>بروزرسانی لاگ‌ها</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#121217] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-500 absolute inset-y-0 start-3 my-auto pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در رویدادها، جزئیات، کاربر یا IP..."
            className="w-full ps-9 pe-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
          />
        </div>

        {/* Action Type Filters */}
        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/5 text-xs">
          {[
            { id: 'ALL', label: 'همه وقایع' },
            { id: 'AUTH_', label: 'احراز هویت و لاگین' },
            { id: 'QUOTATION_', label: 'پیش‌فاکتورها' },
            { id: 'SETTINGS_', label: 'تنظیمات سایت' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterAction(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterAction === item.id
                  ? 'bg-[#0066cc] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#121217] border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs font-sans">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10 text-neutral-400 font-semibold">
                <th className="p-4 text-start">زمان ثبت رویداد</th>
                <th className="p-4 text-start">نوع رویداد (Action)</th>
                <th className="p-4 text-start">بخش / موجودیت</th>
                <th className="p-4 text-start">شرح کامل واقعه</th>
                <th className="p-4 text-start">کاربر مجری</th>
                <th className="p-4 text-start">آدرس IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-neutral-500">
                    رویدادی با این مشخصات یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isAuthSuccess = log.action === 'AUTH_SUCCESSFUL_LOGIN';
                  const isAuthFail = log.action.includes('FAILED') || log.action.includes('BLOCKED');
                  const isQuotation = log.action.startsWith('QUOTATION_') || log.action.startsWith('NEW_');

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 text-neutral-400 font-mono text-[11px]" dir="ltr">
                        {new Date(log.createdAt).toLocaleString('fa-IR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </td>

                      <td className="p-4">
                        <span
                          className={`font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                            isAuthSuccess
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : isAuthFail
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : isQuotation
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                              : 'bg-white/5 text-neutral-300 border-white/10'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>

                      <td className="p-4 text-neutral-400">
                        {log.entity || 'General'}
                      </td>

                      <td className="p-4 text-neutral-200 max-w-md leading-relaxed">
                        {log.details || '—'}
                      </td>

                      <td className="p-4 text-neutral-300 font-medium">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{log.userId || 'سیستم'}</span>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-neutral-400 text-[11px]" dir="ltr">
                        {log.ipAddress || '127.0.0.1'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
