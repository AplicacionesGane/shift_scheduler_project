import { memo } from 'react';
import type { WorkSchedule } from '../types';

interface ScheduledEmployeesProps {
  schedules: WorkSchedule[];
  getShiftName: (shiftId: string) => string;
  maxVisible?: number;
}

export const ScheduledEmployees = memo(({
  schedules,
  getShiftName,
  maxVisible = 2
}: ScheduledEmployeesProps) => {
  if (schedules.length === 0) return null;

  return (
    <div className="absolute flex-1 space-y-1 right-0">
      {schedules.slice(0, maxVisible).map((schedule) => (
        <div 
          key={schedule.id} 
          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-md font-medium border border-green-300"
        >
          <div className="font-semibold">{schedule.employee}</div>
          <div className="text-green-600 text-[10px]">{getShiftName(schedule.shiftId)}</div>
        </div>
      ))}
      {schedules.length > maxVisible && (
        <div className="text-xs text-slate-500 font-medium">
          +{schedules.length - maxVisible} más
        </div>
      )}
    </div>
  );
});

ScheduledEmployees.displayName = 'ScheduledEmployees';
