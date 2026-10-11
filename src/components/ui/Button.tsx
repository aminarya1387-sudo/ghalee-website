import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      external,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-7 py-3 gap-2.5 font-semibold',
    };

    const variantStyles = {
      primary:
        'bg-[#0066cc] text-white hover:bg-[#0077ed] shadow-sm hover:shadow-md hover:shadow-[#0066cc]/20',
      secondary:
        'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] border border-black/5',
      dark:
        'bg-white text-black hover:bg-white/90 shadow-sm hover:shadow-white/20',
      outline:
        'border border-[#d2d2d7] text-[#1d1d1f] hover:border-[#1d1d1f] bg-transparent',
      ghost:
        'text-[#0066cc] hover:text-[#0077ed] bg-transparent hover:bg-[#0066cc]/5',
      glow:
        'bg-[#0066cc] text-white hover:bg-[#0077ed] shadow-[0_0_25px_rgba(0,102,204,0.4)] hover:shadow-[0_0_35px_rgba(0,102,204,0.6)]',
    };

    const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
