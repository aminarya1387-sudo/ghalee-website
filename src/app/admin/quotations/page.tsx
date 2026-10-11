'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Phone,
  Mail,
  Building,
  User,
  Trash2,
  Save,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { toFaDigits } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Submission {
  id: string;
  name: string;
  company: string;
  phone: string;
  email?: string | null;
  productSlug?: string | null;
  requestType: 'DEMO' | 'CONTACT' | 'TRIAL' | 'PURCHASE';
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
  adminNotes?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function QuotationsAdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEW' | 'IN_PROGRESS' | 'CLOSED'>('ALL');
  const [productFilter, setProductFilter] = useState<'ALL' | 'castle-backup' | 'psi' | 'sql-compare'>('ALL');

  // Selected for Modal
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [editStatus, setEditStatus] = useState<'NEW' | 'IN_PROGRESS' | 'CLOSED'>('NEW');
  const [editNotes, setEditNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (productFilter !== 'ALL') params.set('product', productFilter);

      const res = await fetch(`/api/admin/quotations?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error('Fetch submissions error', err);
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, productFilter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions();
  };

  const openDetailModal = (sub: Submission) => {
    setSelectedSub(sub);
    setEditStatus(sub.status);
    setEditNotes(sub.adminNotes || '');
  };

  const handleSaveModal = async () => {
    if (!selectedSub) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/quotations/${selectedSub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: editStatus, adminNotes: editNotes }),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissions((prev) =>
          prev.map((s) => (s.id === selectedSub.id ? data.submission : s))
        );
        setSelectedSub(data.submission);
        alert('تغییرات با موفقیت ذخیره شد.');
      } else {
        alert('خطا در ذخیره تغییرات.');
      }
    } catch {
      alert('خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این استعلام اطمینان دارید؟ این عملیات در لاگ امنیتی ثبت خواهد شد.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/quotations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub(null);
        }
      } else {
        alert('خطا در حذف آیتم.');
      }
    } catch {
      alert('خطا در حذف.');
    }
  };

  // Export to Excel / CSV with UTF-8 BOM
  const exportToCSV = () => {
    const headers = ['شناسه', 'تاریخ', 'نام سازمان', 'شخص رابط', 'تلفن', 'ایمیل', 'وضعیت', 'یادداشت ادمین', 'متن پیام'];
    const rows = submissions.map((s) => [
      s.id,
      new Date(s.createdAt).toLocaleDateString('fa-IR'),
      `"${s.company.replace(/"/g, '""')}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.phone}"`,
      `"${s.email || ''}"`,
      s.status === 'NEW' ? 'جدید' : s.status === 'IN_PROGRESS' ? 'در حال پیگیری' : 'تکمیل‌شده',
      `"${(s.adminNotes || '').replace(/"/g, '""')}"`,
      `"${s.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Castleco_Quotation_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-start">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-normal">
            مدیریت استعلام‌ها و پیش‌فاکتورهای سازمانی
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            مشاهده، پیگیری و تعیین وضعیت پرونده‌های فروش و دمو
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSubmissions}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all"
            title="بروزرسانی لیست"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>خروجی اکسل (CSV)</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-4 rounded-2xl bg-[#121217] border border-white/10 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute inset-y-0 start-3 my-auto pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در نام سازمان، رابط، شماره تماس یا متن پیام..."
              className="w-full ps-9 pe-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#0066cc] hover:bg-[#0077ed] text-white transition-all shrink-0"
          >
            جستجو
          </button>
        </form>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5 text-xs">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/5">
            <span className="text-neutral-500 text-[11px] px-2 font-medium">وضعیت:</span>
            {(['ALL', 'NEW', 'IN_PROGRESS', 'CLOSED'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-[#0066cc] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {st === 'ALL' && 'همه'}
                {st === 'NEW' && 'جدید (بررسی‌نشده)'}
                {st === 'IN_PROGRESS' && 'در حال پیگیری'}
                {st === 'CLOSED' && 'تکمیل‌شده'}
              </button>
            ))}
          </div>

          {/* Product Filter */}
          <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/5">
            <span className="text-neutral-500 text-[11px] px-2 font-medium">محصول:</span>
            {(['ALL', 'castle-backup', 'psi', 'sql-compare'] as const).map((pr) => (
              <button
                key={pr}
                onClick={() => setProductFilter(pr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  productFilter === pr
                    ? 'bg-white/15 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {pr === 'ALL' && 'همه محصولات'}
                {pr === 'castle-backup' && 'Castle Backup'}
                {pr === 'psi' && 'سامانه PSI'}
                {pr === 'sql-compare' && 'SQL Compare'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table of Submissions */}
      <div className="rounded-3xl bg-[#121217] border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10 text-neutral-400 font-semibold">
                <th className="p-4 text-start">سازمان / شرکت</th>
                <th className="p-4 text-start">شخص رابط</th>
                <th className="p-4 text-start">شماره تماس</th>
                <th className="p-4 text-start">محصول / نوع درخواست</th>
                <th className="p-4 text-start">وضعیت</th>
                <th className="p-4 text-start">تاریخ ثبت</th>
                <th className="p-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-neutral-500">
                    استعلامی با این فیلترها یافت نشد.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => {
                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4">
                        <div className="font-bold text-white">{sub.company}</div>
                        {sub.email && (
                          <div className="text-[11px] text-neutral-500 mt-0.5" dir="ltr">
                            {sub.email}
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-neutral-300 font-medium">
                        {sub.name}
                      </td>

                      <td className="p-4 font-mono text-neutral-300" dir="ltr">
                        {toFaDigits(sub.phone)}
                      </td>

                      <td className="p-4">
                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 font-medium">
                          {sub.productSlug === 'castle-backup'
                            ? 'Castle Backup'
                            : sub.productSlug === 'psi'
                            ? 'سامانه PSI'
                            : sub.productSlug === 'sql-compare'
                            ? 'SQL Compare'
                            : 'استعلام عمومی'}
                        </span>
                      </td>

                      <td className="p-4">
                        {sub.status === 'NEW' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                            <span>جدید</span>
                          </span>
                        )}
                        {sub.status === 'IN_PROGRESS' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                            <Clock className="w-3 h-3" />
                            <span>در حال پیگیری</span>
                          </span>
                        )}
                        {sub.status === 'CLOSED' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>تکمیل‌شده</span>
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-[11px] text-neutral-400 font-mono">
                        {new Date(sub.createdAt).toLocaleDateString('fa-IR')}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openDetailModal(sub)}
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#0066cc] text-neutral-300 hover:text-white border border-white/10 transition-all font-semibold"
                          >
                            بررسی جزئیات
                          </button>
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="حذف پرونده"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------- DETAIL MODAL ----------------- */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#121217] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#0066cc]" />
                  <h3 className="text-lg font-bold text-white">{selectedSub.company}</h3>
                </div>
                <p className="text-xs text-neutral-400">
                  شناسه پرونده: <span className="font-mono">{selectedSub.id}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedSub(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-neutral-500">نام و سمت رابط:</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{selectedSub.name}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-500">تلفن تماس مستقیم:</span>
                <div className="font-bold text-sky-400 flex items-center gap-1.5 font-mono" dir="ltr">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{toFaDigits(selectedSub.phone)}</span>
                </div>
              </div>

              {selectedSub.email && (
                <div className="space-y-1">
                  <span className="text-neutral-500">پست الکترونیکی:</span>
                  <div className="text-neutral-300 font-mono" dir="ltr">
                    {selectedSub.email}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-neutral-500">آدرس شبکه (IP ثبت‌کننده):</span>
                <div className="text-neutral-400 font-mono" dir="ltr">
                  {selectedSub.ipAddress || '127.0.0.1'}
                </div>
              </div>
            </div>

            {/* Customer Message & Specs */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-300">
                مشخصات فنی و درخواست ارسالی مشتری:
              </label>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedSub.message}
              </div>
            </div>

            {/* Status Changer & Internal Notes */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2">
                  تغییر وضعیت چرخه فروش:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['NEW', 'IN_PROGRESS', 'CLOSED'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setEditStatus(s)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        editStatus === s
                          ? s === 'NEW'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : s === 'IN_PROGRESS'
                            ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                            : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {s === 'NEW' && 'در انتظار بررسی'}
                      {s === 'IN_PROGRESS' && 'در حال پیگیری / دمو'}
                      {s === 'CLOSED' && 'تکمیل و ارسال پیش‌فاکتور'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2">
                  یادداشت داخلی کارشناسان قلعه (محرمانه):
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="نتیجه مکالمه با مشتری، زمان جلسه دمو یا شماره پیش‌فاکتور رسمی صادرشده را اینجا ثبت کنید..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleDelete(selectedSub.id)}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 px-3 py-2 rounded-xl hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف این استعلام</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  انصراف
                </button>
                <Button
                  onClick={handleSaveModal}
                  variant="glow"
                  size="md"
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات پرونده'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
