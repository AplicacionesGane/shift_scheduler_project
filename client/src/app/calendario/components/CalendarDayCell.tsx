import { memo } from 'react';
import { ScheduledEmployees } from './ScheduledEmployees';
import type { DayCalendar, WorkSchedule } from '../types';

interface CalendarDayCellProps {
  day: DayCalendar | null;
  dayWorkSchedules: WorkSchedule[];
  getShiftName: (shiftId: string) => string;
}

export const CalendarDayCell = memo(({
  day,
  dayWorkSchedules,
  getShiftName
}: CalendarDayCellProps) => {
  if (!day) return null;

  const isEmpty = !day.days || day.days === 0;

  return (
    <div
      className={`
        h-28 border rounded-lg p-3 text-sm transition-all duration-300 cursor-pointer hover:scale-105
        ${!isEmpty ? 'bg-white hover:bg-slate-50 hover:shadow-lg border-slate-200 shadow-sm' : 'bg-slate-50/30 border-slate-100'}
        ${day.isWeekend ? 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-300' : ''}
        ${day.isHoliday ? 'bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border-red-300' : ''}
      `}
    >
      {!isEmpty && (
        <div className="h-full flex flex-col relative">
          <div className={`font-bold text-xl mb-2 ${
            day.isHoliday ? 'text-red-800' : 
            day.isWeekend ? 'text-blue-800' : 
            'text-slate-800'
          }`}>
            {day.days}
          </div>

          {day.nameDay && day.nameDay.trim() !== "" && (
            <div className="text-xs text-slate-600 mb-2 truncate font-medium">
              {day.nameDay}
            </div>
          )}

          <ScheduledEmployees 
            schedules={dayWorkSchedules}
            getShiftName={getShiftName}
          />

          {day.isHoliday && day.holidayDescription && (
            <div className="text-xs text-red-700 bg-red-200/50 px-2 py-1 rounded-md mt-auto font-medium border border-red-300">
              {day.holidayDescription}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

CalendarDayCell.displayName = 'CalendarDayCell';
