'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Server,
  Database,
  Cpu,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  children?: {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const navItems: NavItem[] = [
  {
    label: 'محصولات',
    href: '/products',
    children: [
      {
        title: 'Castle Backup',
        description: 'سامانه پشتیبان‌گیری و بازیابی هوشمند SQL Server و VMware',
        href: '/products/castle-backup',
        icon: Database,
        badge: 'پرچمدار',
      },
      {
        title: 'مدیریت سخت‌افزار و نرم‌افزار (PSI)',
        description: 'پایش هوشمند قطعات، سلامت دیسک و کنسول تحت وب سازمانی',
        href: '/products/professional-system-information',
        icon: Cpu,
      },
      {
        title: 'مقایسه داده‌های SQL Server',
        description: 'ابزار تخصصی مقایسه ساختار و همگام‌سازی دیتابیس',
        href: '/products/sql-data-compare',
        icon: Server,
        badge: 'رایگان',
      },
    ],
  },
  { label: 'درباره قلعه', href: '/about' },
  { label: 'نحوه خرید', href: '/purchase' },
  { label: 'تماس و پشتیبانی', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 font-sans',
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
          : 'bg-white/70 backdrop-blur-md border-b border-black/[0.04]'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0066cc] to-[#004a99] shadow-sm">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col text-start">
            <span className="text-sm sm:text-base font-bold text-[#1d1d1f] leading-tight">
              قلعه فناوران
            </span>
            <span className="text-[10px] text-[#86868b] leading-tight font-medium">
              هیمن • دانش‌بنیان
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const hasChildren = !!item.children;
            const isActive = pathname === item.href || (hasChildren && pathname.startsWith(item.href));

            if (hasChildren) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors select-none',
                      isActive || productsOpen
                        ? 'text-[#0066cc] bg-[#0066cc]/5'
                        : 'text-[#1d1d1f] hover:text-[#0066cc] hover:bg-black/[0.03]'
                    )}
                    onClick={() => setProductsOpen(!productsOpen)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        productsOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute end-0 top-full pt-2 w-80 z-50"
                      >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl border border-black/[0.08] divide-y divide-black/[0.04]">
                          {item.children?.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f5f5f7] transition-colors group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#0066cc]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0066cc] group-hover:text-white transition-colors text-[#0066cc]">
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 text-start">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">
                                      {sub.title}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#0066cc]/10 text-[#0066cc] font-medium">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#6e6e73] leading-relaxed line-clamp-1 mt-0.5">
                                    {sub.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors',
                  isActive
                    ? 'text-[#0066cc] bg-[#0066cc]/5 font-semibold'
                    : 'text-[#1d1d1f] hover:text-[#0066cc] hover:bg-black/[0.03]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            href="/contact?type=demo"
            variant="primary"
            size="sm"
            className="text-xs font-medium shadow-none hover:shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>درخواست دمو</span>
          </Button>

          <Button
            href="/contact?type=trial"
            variant="secondary"
            size="sm"
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>نسخه رایگان</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            href="/contact?type=demo"
            variant="primary"
            size="sm"
            className="text-[11px] px-2.5 py-1"
          >
            دمو
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1d1d1f] hover:bg-black/5"
            aria-label="باز کردن منو"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-black/[0.08] bg-white/98 backdrop-blur-2xl overflow-hidden px-4 py-4"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#86868b] px-3 py-1">محصولات</span>
              {navItems[0].children?.map((sub) => {
                const SubIcon = sub.icon;
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#f5f5f7] text-xs text-[#1d1d1f]"
                  >
                    <SubIcon className="w-4 h-4 text-[#0066cc]" />
                    <span className="font-medium">{sub.title}</span>
                  </Link>
                );
              })}

              <div className="my-2 border-t border-black/[0.06]" />

              <Link
                href="/about"
                className="px-3 py-2 rounded-xl hover:bg-[#f5f5f7] text-xs font-medium text-[#1d1d1f]"
              >
                درباره قلعه
              </Link>
              <Link
                href="/purchase"
                className="px-3 py-2 rounded-xl hover:bg-[#f5f5f7] text-xs font-medium text-[#1d1d1f]"
              >
                نحوه خرید
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-xl hover:bg-[#f5f5f7] text-xs font-medium text-[#1d1d1f]"
              >
                تماس با ما
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
