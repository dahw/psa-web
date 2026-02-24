'use client';

import clsx from 'clsx';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function Card({ children, className, hover = true, gradient = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 transition-all duration-300',
        hover && 'hover:border-[#6B8E23] hover:shadow-lg hover:shadow-[#6B8E23]/10',
        gradient && 'bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]',
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatBox({ label, value, unit, icon, className }: StatBoxProps) {
  return (
    <Card className={clsx('flex items-start justify-between', className)}>
      <div>
        <p className="text-[#9CA3AF] text-sm font-medium mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-white">{value}</p>
          {unit && <span className="text-[#9CA3AF] text-sm">{unit}</span>}
        </div>
      </div>
      {icon && <div className="text-[#6B8E23]">{icon}</div>}
    </Card>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer';

  const variants = {
    primary: 'bg-[#6B8E23] text-white hover:bg-[#4A5D23] active:scale-95',
    secondary: 'bg-[#1A1A1A] text-white border border-[#2A2A2A] hover:border-[#6B8E23] hover:text-[#6B8E23]',
    outline: 'border border-[#6B8E23] text-[#6B8E23] hover:bg-[#6B8E23]/10',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-[#6B8E23]/20 text-[#6B8E23]',
    secondary: 'bg-[#2A2A2A] text-[#9CA3AF]',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
