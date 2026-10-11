import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره ما | تاریخچه، مجوزها و مأموریت سازمانی',
  description:
    'معرفی شرکت دانش‌بنیان قلعه فناوران هیمن، مستقر در پارک علم و فناوری گیلان. بیش از ۹ سال توسعه تخصصی نرم‌افزارهای بومی امنیت داده و ISMS.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
