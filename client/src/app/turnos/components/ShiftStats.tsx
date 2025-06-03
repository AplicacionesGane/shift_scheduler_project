import { Card, CardContent } from '@/components/ui/card';
import { type Shift } from '@/hooks/useShiftsManagement';
import { Clock, Calendar, Timer } from 'lucide-react';
import { memo } from 'react';

interface ShiftStatsProps {
  shifts: Shift[];
}

export const ShiftStats = memo(({ shifts }: ShiftStatsProps) => {
  const calculateAverageHours = () => {
    if (shifts.length === 0) return '0h';
    
    const totalHours = shifts.reduce((acc, shift) => {
      const start = new Date(`2000-01-01T${shift.startTime}`);
      const end = new Date(`2000-01-01T${shift.endTime}`);
      return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    }, 0);
    
    return Math.round(totalHours / shifts.length) + 'h';
  };

  const stats = [
    {
      title: 'Total Turnos',
      value: shifts.length,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Turnos Activos',
      value: shifts.length,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Promedio Horas',
      value: calculateAverageHours(),
      icon: Timer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});

ShiftStats.displayName = 'ShiftStats';
