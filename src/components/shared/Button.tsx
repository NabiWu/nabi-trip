import { Link } from 'react-router-dom';
import { classNames } from '../../utils/classNames';
import { ui } from '../../constants/ui';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  as?: 'button' | 'link';
  to?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'base',
  as = 'button',
  to,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = classNames(
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    ui.transition.default
  );

  const variants = {
    primary: 'bg-black/30 hover:bg-black/50 border border-white/[0.12] hover:border-white/[0.2] text-white',
    secondary: 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.15] text-slate-300 hover:text-white',
    ghost: 'hover:bg-white/[0.05] text-slate-400 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    base: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const classes = classNames(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  if (as === 'link' && to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

