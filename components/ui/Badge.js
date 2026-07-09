import { cn } from '@/lib/utils';

const variantStyles = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-orange-100 text-orange-800',
  info: 'bg-blue-100 text-blue-800',
  danger: 'bg-red-100 text-red-800',
};

export default function Badge({ children, variant = 'info', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant] || variantStyles.info,
        className
      )}
    >
      {children}
    </span>
  );
}
