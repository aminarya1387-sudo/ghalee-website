import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Castle Backup | پشتیبان‌گیری بدون توقف SQL Server و VMware ESXi',
  description:
    'سامانه بومی پشتیبان‌گیری، فشرده‌سازی تا ۸۰٪، رمزنگاری ۲۵۶ بیتی و بازیابی سریع پایگاه‌های داده SQL Server و ماشین‌های مجازی هایپروایزر VMware ESXi.',
};

export default function CastleBackupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
