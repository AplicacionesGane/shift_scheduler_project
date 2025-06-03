import { memo, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { CalendarNavigation } from './CalendarNavigation';
import { CalendarDayCell } from './CalendarDayCell';
import { generateCalendarGrid } from './calendarUtils';
import type { DayCalendar, WorkSchedule } from '../types';

interface CalendarGridProps {
  daysCalendar: DayCalendar[];
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
  getWorkSchedulesForDay: (year: number, month: number, day: number) => WorkSchedule[];
  getShiftName: (shiftId: string) => string;
}

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const CalendarGrid = memo(({
  daysCalendar,
  canNavigatePrev,
  canNavigateNext,
  onNavigatePrev,
  onNavigateNext,
  getWorkSchedulesForDay,
  getShiftName
}: CalendarGridProps) => {
  // Memoizar la grilla del calendario para evitar recalculos innecesarios
  const renderDay = useMemo(() => generateCalendarGrid(daysCalendar), [daysCalendar]);

  // Memoizar el título para evitar recalculos
  const title = useMemo(() => {
    if (daysCalendar.length > 0) {
      return `${daysCalendar[0].nameMonth} ${daysCalendar[0].year}`;
    }
    return '';
  }, [daysCalendar]);

  if (daysCalendar.length === 0) {
    return (
      <Card className="p-6 shadow-lg">
        <div className="text-center text-gray-500">
          Selecciona un año y mes para ver el calendario
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-lg">
      <CalendarNavigation
        title={title}
        canNavigatePrev={canNavigatePrev}
        canNavigateNext={canNavigateNext}
        onNavigatePrev={onNavigatePrev}
        onNavigateNext={onNavigateNext}
      />

      {/* Encabezados de días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {WEEKDAYS.map((day, i) => (
          <div
            key={i}
            className="h-14 flex items-center justify-center text-sm font-bold text-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grilla de días del calendario */}
      <div className="grid grid-cols-7 gap-2">
        {renderDay.map((day, index) => {
          // Obtener los horarios de trabajo para este día
          const dayWorkSchedules = day?.days ? getWorkSchedulesForDay(day.year, day.month, day.days) : [];
          
          return (
            <CalendarDayCell
              key={day?.id || index}
              day={day}
              dayWorkSchedules={dayWorkSchedules}
              getShiftName={getShiftName}
            />
          );
        })}
      </div>
    </Card>
  );
});

CalendarGrid.displayName = 'CalendarGrid';
