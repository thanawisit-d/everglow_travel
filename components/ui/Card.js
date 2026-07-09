import { cn } from '@/lib/utils';

export default function Card({ children, className }) {
  return (
    <div className={cn('bg-white rounded-lg shadow p-6', className)}>
      {children}
    </div>
  );
}
