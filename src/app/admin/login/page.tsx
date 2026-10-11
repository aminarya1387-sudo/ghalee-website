'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  Server,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toFaDigits } from '@/lib/utils';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'خطا در احراز هویت. اطلاعات ورود را مجدداً بررسی فرمایید.');
        if (typeof data.remainingAttempts === 'number') {
          setRemainingAttempts(data.remainingAttempts);
        }
      }
    } catch {
      setError('خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#0066cc]/25 to-sky-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 end-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#121217]/90 border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        {/* Brand Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo-white.png"
                alt="قلعه فناوران هیمن"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-sky-400 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>پرتال مدیریت امنیتی و سازمانی</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
              شرکت قلعه فناوران هیمن
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              ورود اعضای ارشد فاوا، پشتیبانی و امور قراردادها
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{error}</p>
              {remainingAttempts !== null && remainingAttempts > 0 && (
                <p className="text-[11px] text-neutral-400">
                  پس از ۵ تلاش ناموفق، دسترسی به مدت ۱۵ دقیقه مسدود می‌شود.
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5 text-start">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              نام کاربری:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-neutral-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="مثال: admin"
                className="w-full ps-10 pe-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent transition-all"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">
              رمز عبور امنیتی:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-neutral-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full ps-10 pe-11 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent transition-all"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full justify-center"
              disabled={isLoading}
            >
              <span>{isLoading ? 'در حال تایید اعتبار امنیتی...' : 'ورود به داشبورد مدیریت'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Security Quick Credentials Tip for Development */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-2">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-neutral-300 font-semibold">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>مشخصات پیش‌فرض ورود سازمانی:</span>
            </div>
            <p className="font-mono text-xs text-sky-300">
              admin <span className="text-neutral-500">/</span> Admin@Castle2026!
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors pt-2"
          >
            <span>بازگشت به وب‌سایت اصلی قلعه فناوران</span>
          </a>
        </div>
      </motion.div>

      {/* Footer Security Badges */}
      <div className="relative z-10 mt-8 text-center text-xs text-neutral-500 space-y-1">
        <p>کلیه تلاش‌های ورود به همراه شناسه شبکه (IP) در لاگ امنیتی سیستم ثبت می‌گردد.</p>
        <p className="font-mono text-[11px] text-neutral-600">ISMS High-Security Protocol • AES-256 / SHA-512</p>
      </div>
    </div>
  );
}
