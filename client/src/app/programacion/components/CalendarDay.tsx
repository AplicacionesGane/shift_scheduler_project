import { memo } from 'react';
import { ShiftCard } from './ShiftCard';
import type { WorkSchedule } from '@/types/Interfaces';

interface CalendarDayProps {
  dayNumber: number;
  isCurrentMonth: boolean;
  schedules: WorkSchedule[];
}

export const CalendarDay = memo(({ dayNumber, isCurrentMonth, schedules }: CalendarDayProps) => {
  return (
    <div
      className={`
        min-h-[120px] p-2 border rounded-lg relative
        ${isCurrentMonth
          ? 'bg-white border-gray-200'
          : 'bg-gray-50 border-gray-100 text-gray-400'
        }
        ${schedules.length > 0 ? 'border-blue-300 bg-blue-50' : ''}
      `}
    >
      {/* Número del día */}
      <div className={`
        text-sm font-medium mb-1
        ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
      `}>
        {dayNumber}
      </div>

      {/* Programaciones del día */}
      <div className="space-y-1">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <ShiftCard key={schedule.id} shiftId={schedule.shiftId} employee={schedule.employee} />
          ))
        ) : (
          <div className="text-xs text-gray-500">No hay programaciones</div>
        )}
      </div>

      {/* Indicador de múltiples programaciones */}
      {schedules.length > 2 && (
        <div className="absolute bottom-1 right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {schedules.length}
        </div>
      )}
    </div>
  );
});

CalendarDay.displayName = 'CalendarDay';
