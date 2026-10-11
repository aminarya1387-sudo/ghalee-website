import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'neutral' | 'dark' | 'success';
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = 'accent',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    accent:
      'bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20',
    neutral:
      'bg-[#f5f5f7] text-[#6e6e73] border border-black/5',
    dark:
      'bg-white/10 text-white/90 border border-white/15',
    success:
      'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm tracking-normal',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
