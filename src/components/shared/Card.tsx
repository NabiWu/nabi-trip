import { classNames } from '../../utils/classNames';
import { ui } from '../../constants/ui';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hoverable = true, onClick }: CardProps) {
  const baseClasses = classNames(
    ui.background.card,
    ui.radius.lg,
    'overflow-hidden',
    ui.border.default,
    hoverable && ui.transition.slow,
    hoverable && 'hover:border-white/[0.3] hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1',
    onClick && 'cursor-pointer'
  );

  return (
    <div className={classNames(baseClasses, className)} onClick={onClick}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={classNames('relative overflow-hidden', className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={classNames(ui.padding.md, 'flex-1 flex flex-col', className)}>
      {children}
    </div>
  );
}

