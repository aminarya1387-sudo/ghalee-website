'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Database,
  ArrowRightLeft,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { toFaDigits } from '@/lib/utils';

export function SqlCompareVisualizer() {
  const [mode, setMode] = useState<'schema' | 'data'>('schema');
  const [copied, setCopied] = useState<boolean>(false);

  const sampleSqlScript = `-- ========================================================
-- Castle SQL Compare Studio - Auto-Generated Sync Script
-- Source: SQL-PROD-SRV (192.168.1.10)
-- Target: SQL-STAGE-SRV (Localhost)
-- Generated: 2026-09-30 | Engine: Castle Compare v2.4
-- ========================================================

SET XACT_ABORT ON;
BEGIN TRANSACTION;

-- 1. Synchronize Column Definition
IF NOT EXISTS (
    SELECT 1 FROM sys.columns 
    WHERE object_id = OBJECT_ID(N'dbo.tbl_Users') 
    AND name = 'NationalCode'
)
BEGIN
    ALTER TABLE dbo.tbl_Users ADD NationalCode VARCHAR(10) NOT NULL DEFAULT '';
    PRINT N'Column [NationalCode] added to [dbo].[tbl_Users]';
END;

-- 2. Synchronize Stored Procedure
IF OBJECT_ID(N'dbo.sp_CalculateAuditHash', N'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_CalculateAuditHash;
GO

CREATE PROCEDURE dbo.sp_CalculateAuditHash
    @UserId INT,
    @EntityName NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT HASHBYTES('SHA2_512', CONCAT(@UserId, @EntityName, GETDATE())) AS AuditToken;
END;
GO

-- 3. Synchronize Non-Clustered Query Index
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes 
    WHERE object_id = OBJECT_ID(N'dbo.tbl_Transactions') 
    AND name = 'IX_Transactions_Date'
)
BEGIN
    CREATE NONCLUSTERED INDEX IX_Transactions_Date 
    ON dbo.tbl_Transactions(TrxDate DESC);
    PRINT N'Index [IX_Transactions_Date] created on [dbo].[tbl_Transactions]';
END;

COMMIT TRANSACTION;
PRINT N'SUCCESS: Target Database synchronized completely with 0 errors.';`;

  const handleCopy = async () => {
    let success = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(sampleSqlScript);
        success = true;
      } catch {
        // Continue to fallback
      }
    }

    if (!success && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = sampleSqlScript;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (err) {
        console.error('Fallback copy error:', err);
      }
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl bg-[#0e1015] border border-white/10 shadow-2xl overflow-hidden text-white text-start">
      {/* Visualizer Top Bar */}
      <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">SQL Data & Schema Compare Studio</span>
              <Badge variant="success" className="text-[10px] py-0 px-2">
                نسخه ۱۰۰٪ رایگان
              </Badge>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              مقایسه فوق سریع پایگاه‌های داده راه دور و محلی بدون توجه به نسخه سرور
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMode('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'schema'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            تفاوت ساختار (Schema Diff)
          </button>
          <button
            onClick={() => setMode('data')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'data'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            مغایرت رکوردها (Row Data)
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Source vs Target Connection Pills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Database className="w-4 h-4 text-sky-400" />
              <span className="text-neutral-300">مبدأ:</span>
              <span className="font-mono text-white font-bold">SQL-PROD-SRV (192.168.1.10)</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">SQL 2019</span>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </div>

          <div className="md:col-span-5 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Database className="w-4 h-4 text-amber-400" />
              <span className="text-neutral-300">مقصد:</span>
              <span className="font-mono text-white font-bold">SQL-STAGE-SRV (Localhost)</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">SQL 2022</span>
          </div>
        </div>

        {/* Diff View Area */}
        <AnimatePresence mode="wait">
          {mode === 'schema' ? (
            <motion.div
              key="schema-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="text-xs text-neutral-400 flex items-center justify-between">
                <span>تغییرات ساختاری کشف‌شده ({toFaDigits(3)} مورد نیازمند همگام‌سازی):</span>
                <span className="text-[11px] text-emerald-400 font-mono">Auto-Sync Script Ready</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {/* Diff Item 1 */}
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      + COLUMN
                    </span>
                    <span className="text-emerald-200">
                      ALTER TABLE tbl_Users ADD NationalCode VARCHAR(10) NOT NULL
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">موجود در مبدأ، فاقد در مقصد</span>
                </div>

                {/* Diff Item 2 */}
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      ~ MODIFY
                    </span>
                    <span className="text-amber-200">
                      ALTER PROCEDURE sp_CalculateAuditHash ... (Version 2.4 vs 2.1)
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">تغییر بدنه پروسیجر</span>
                </div>

                {/* Diff Item 3 */}
                <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">
                      + INDEX
                    </span>
                    <span className="text-sky-200">
                      CREATE NONCLUSTERED INDEX IX_Transactions_Date ON tbl_Transactions(TrxDate)
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">بهینه‌سازی سرعت کوئری</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="data-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="text-xs text-neutral-400 flex items-center justify-between">
                <span>مقایسه رکوردهای جداول (Data Rows Diff):</span>
                <span className="text-[11px] text-sky-400 font-mono">Primary Key Alignment</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10 font-mono text-xs">
                <table className="w-full text-start">
                  <thead className="bg-white/5 text-neutral-300 border-b border-white/10">
                    <tr>
                      <th className="p-2.5 text-start">وضعیت رکورد</th>
                      <th className="p-2.5 text-start">شناسه (ID)</th>
                      <th className="p-2.5 text-start">نام شرکت / شخص</th>
                      <th className="p-2.5 text-start">مقدار در مبدأ (Source)</th>
                      <th className="p-2.5 text-start">مقدار در مقصد (Target)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-200">
                    <tr className="bg-emerald-500/5">
                      <td className="p-2.5 text-emerald-400 font-bold">+ درج ردیف جدید</td>
                      <td className="p-2.5 font-bold">10492</td>
                      <td className="p-2.5">بنیاد مسکن گیلان</td>
                      <td className="p-2.5 text-emerald-300">Active (لایسنس فعال)</td>
                      <td className="p-2.5 text-neutral-500">[ناموجود]</td>
                    </tr>
                    <tr className="bg-amber-500/5">
                      <td className="p-2.5 text-amber-400 font-bold">~ ویرایش فیلد</td>
                      <td className="p-2.5 font-bold">10381</td>
                      <td className="p-2.5">شهرداری رشت</td>
                      <td className="p-2.5 text-sky-300">Cluster 4 Nodes</td>
                      <td className="p-2.5 text-amber-300">Single Node</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <a
              href="/downloads/Castle_SQL_Compare_FreeEdition.zip"
              download="Castle_SQL_Compare_FreeEdition.zip"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>دانلود رایگان نرم‌افزار مقایسه SQL (نسخه کامل)</span>
            </a>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="md"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'اسکریپت کپی شد!' : 'کپی نمونه اسکریپت همگام‌ساز'}</span>
            </Button>
          </div>

          <span className="text-xs text-neutral-400">
            بدون هیچ‌گونه محدودیت زمانی یا تعداد رکورد در نسخه رایگان
          </span>
        </div>
      </div>
    </div>
  );
}
