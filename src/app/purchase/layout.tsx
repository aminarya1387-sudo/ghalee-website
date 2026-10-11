import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'راهنمای خرید، پلن‌های لایسنس و پیش‌فاکتور رسمی',
  description:
    'استعلام قیمت و صدور پیش‌فاکتور رسمی شرکتی با کد اقتصادی و شناسه ملی برای نرم‌افزارهای Castle Backup، سامانه پایش PSI و ابزار SQL Compare.',
};

export default function PurchaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
