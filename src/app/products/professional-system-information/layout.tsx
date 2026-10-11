import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سامانه مانیتورینگ سخت‌افزار و نرم‌افزار (PSI)',
  description:
    'کنسول متمرکز تحت وب جهت پایش ۳۰+ شاخص سخت‌افزاری و نرم‌افزاری رایانه‌ها، سلامت دیسک S.M.A.R.T، کشف تغییر قطعات و ردگیری حافظه‌های غیرمجاز.',
};

export default function PsiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
