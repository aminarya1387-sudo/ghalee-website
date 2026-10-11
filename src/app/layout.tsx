import type { Metadata } from 'next';
import { vazirmatn } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { StickyMobileCta } from '@/components/layout/StickyMobileCta';
import './globals.css';

const baseUrl = process.env.NEXTAUTH_URL || 'https://castleco.ir';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'قلعه فناوران هیمن | سامانه یکپارچه حفاظت و مدیریت داده‌های سازمانی',
    template: '%s | قلعه فناوران هیمن',
  },
  description:
    'شرکت دانش‌بنیان قلعه فناوران هیمن - تولیدکننده نرم‌افزارهای تخصصی مدیران IT: نرم‌افزار پشتیبان‌گیری بدون قطعی Castle Backup، مانیتورینگ سخت‌افزار (PSI) و مقایسه داده‌های SQL Server.',
  keywords: [
    'قلعه فناوران هیمن',
    'Castle Backup',
    'پشتیبان گیری SQL Server',
    'بک آپ ماشین مجازی ESXi',
    'مدیریت سخت افزار شبکه',
    'سامانه PSI',
    'مقایسه دیتابیس SQL',
    'ISMS',
    'شرکت دانش بنیان',
  ],
  authors: [{ name: 'شرکت قلعه فناوران هیمن', url: baseUrl }],
  creator: 'شرکت قلعه فناوران هیمن',
  publisher: 'شرکت قلعه فناوران هیمن',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/Logo.png',
    shortcut: '/images/Logo.png',
    apple: '/images/Logo.png',
  },
  openGraph: {
    title: 'شرکت قلعه فناوران هیمن | راهکارهای امنیت و مدیریت داده‌های سازمانی',
    description:
      'تولیدکننده نرم‌افزارهای تخصصی مدیران فاوا و دیتابیس: Castle Backup، مانیتورینگ سخت‌افزار و ابزار مقایسه رایگان SQL Server.',
    url: baseUrl,
    siteName: 'قلعه فناوران هیمن',
    images: [
      {
        url: '/images/Catalog.png',
        width: 1200,
        height: 630,
        alt: 'کاتالوگ رسمی شرکت قلعه فناوران هیمن',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شرکت قلعه فناوران هیمن',
    description: 'راهکارهای بومی پشتیبان‌گیری زنده و مانیتورینگ سخت‌افزار سازمانی',
    images: ['/images/Catalog.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased bg-white text-[#1d1d1f] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <CookieBanner />
        <StickyMobileCta />
      </body>
    </html>
  );
}
