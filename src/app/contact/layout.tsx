import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تماس و پشتیبانی | استعلام، دمو و مشاوره فنی',
  description:
    'ارتباط با مهندسان ارشد زیرساخت و واحد فروش شرکت قلعه فناوران هیمن در پارک علم و فناوری گیلان. پشتیبانی ۲۴ ساعته و پاسخگویی کمتر از ۲ ساعت.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
