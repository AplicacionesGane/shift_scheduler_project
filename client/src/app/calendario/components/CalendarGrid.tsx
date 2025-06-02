import { memo } from 'react';
import { CalendarDay } from './CalendarDay';
import type { CalendarDay as CalendarDayType } from '@/types/Interfaces';

interface CalendarGridProps {
  calendarDays: CalendarDayType[];
}

const WEEK_DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const CalendarGrid = memo(({ calendarDays }: CalendarGridProps) => {
  return (
    <>
      {/* Encabezados de días */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="p-2 text-center font-semibold text-gray-700 bg-gray-100 rounded">
            {day}
          </div>
        ))}
      </div>

      {/* Días del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={`${day.fullDate}-${index}`}
            dayNumber={day.dayNumber}
            isCurrentMonth={day.isCurrentMonth}
            schedules={day.schedules}
          />
        ))}
      </div>
    </>
  );
});

CalendarGrid.displayName = 'CalendarGrid';
