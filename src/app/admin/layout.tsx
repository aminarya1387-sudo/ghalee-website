'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ShieldAlert,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Clock,
  User,
  Database,
  CheckCircle,
} from 'lucide-react';
import { toFaDigits } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [adminUser, setAdminUser] = useState<{ username: string; name: string } | null>(null);

  // If on login page, render without sidebar layout
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;

    // Fetch current user
    fetch('/api/admin/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
        }
      })
      .catch(() => {});

    // Clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    {
      title: 'داشبورد و پیشخوان',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: 'استعلام‌ها و پیش‌فاکتورها',
      href: '/admin/quotations',
      icon: FileText,
      badge: 'سازمانی',
    },
    {
      title: 'لاگ‌های امنیتی (Audit Logs)',
      href: '/admin/audit-logs',
      icon: ShieldAlert,
    },
    {
      title: 'تنظیمات عمومی سایت',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f5f7] flex flex-col md:flex-row antialiased font-sans">
      {/* ----------------- MOBILE TOP BAR ----------------- */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#121217] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/images/logo-white.png"
              alt="Castleco"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-bold text-white">پنل مدیریت قلعه</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ----------------- SIDEBAR ----------------- */}
      <aside
        className={`fixed inset-y-0 start-0 z-40 w-64 bg-[#121217] border-e border-white/10 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Brand */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3.5">
            <div className="relative w-10 h-10 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Image
                src="/images/logo-white.png"
                alt="قلعه فناوران"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>سامانه مدیریت فاوا</span>
              </div>
              <h2 className="text-sm font-bold text-white tracking-wide mt-0.5">
                قلعه فناوران هیمن
              </h2>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            <div className="text-[11px] font-semibold text-neutral-400 px-3 py-2 uppercase tracking-wider">
              بخش‌های مدیریتی
            </div>

            {navLinks.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0066cc] text-white shadow-lg shadow-[#0066cc]/30'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    <span>{link.title}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/5">
              <div className="text-[11px] font-semibold text-neutral-400 px-3 py-2 uppercase tracking-wider">
                دسترسی سریع
              </div>

              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span>مشاهده وب‌سایت عمومی</span>
                </div>
              </Link>
            </div>
          </nav>

          {/* User Profile & Logout Bottom Box */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {adminUser?.name || 'مدیر ارشد سیستم'}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono truncate">
                    @{adminUser?.username || 'admin'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="خروج از سیستم"
                className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ----------------- MAIN CONTENT WRAPPER ----------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#121217]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>سیستم پایدار و عملیاتی (Status: OK)</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Live Clock */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentTime || '۰۰:۰۰:۰۰'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3.5 py-1.5 rounded-xl transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج امن</span>
            </button>
          </div>
        </header>

        {/* Child Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
