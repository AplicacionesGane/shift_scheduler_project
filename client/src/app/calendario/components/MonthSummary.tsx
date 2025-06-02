import { memo } from 'react';
import type { SummaryData } from '@/types/Interfaces';

interface MonthSummaryProps {
  summary: SummaryData;
}

export const MonthSummary = memo(({ summary }: MonthSummaryProps) => {
  const { daysWithSchedules, totalAssignments, uniqueEmployees, uniqueShifts } = summary;

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-2">Resumen del mes:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Total días programados:</span>
          <span className="ml-2 font-medium">{daysWithSchedules}</span>
        </div>
        <div>
          <span className="text-gray-600">Total asignaciones:</span>
          <span className="ml-2 font-medium">{totalAssignments}</span>
        </div>
        <div>
          <span className="text-gray-600">Empleados únicos:</span>
          <span className="ml-2 font-medium">{uniqueEmployees}</span>
        </div>
        <div>
          <span className="text-gray-600">Turnos únicos:</span>
          <span className="ml-2 font-medium">{uniqueShifts}</span>
        </div>
      </div>
    </div>
  );
});

MonthSummary.displayName = 'MonthSummary';
