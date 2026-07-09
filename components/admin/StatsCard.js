import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card';

export default function StatsCard({ title, value, icon: Icon, color }) {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  const iconBg =
    colorClasses[color] || colorClasses.green;

  return (
    <Card className="flex items-center gap-4">
      {Icon && (
        <div className={cn('rounded-lg p-3', iconBg)}>
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </Card>
  );
}
