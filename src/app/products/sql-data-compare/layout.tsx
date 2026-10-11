import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL Server Data & Schema Compare | مقایسه رایگان ساختار و داده‌ها',
  description:
    'ابزار ۱۰۰٪ رایگان و پرتابل مقایسه جداول، ویوها، پروسیجرها و داده‌های پایگاه‌های داده SQL Server با تولید خودکار اسکریپت همگام‌ساز.',
};

export default function SqlCompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
