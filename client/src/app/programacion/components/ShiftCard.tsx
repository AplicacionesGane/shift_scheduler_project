import { memo } from 'react';
import { useShiftsContext } from '@/contexts/ShiftsContext';

interface ShiftCardProps {
  shiftId: string;
}

export const ShiftCard = memo(({ shiftId }: ShiftCardProps) => {
  const { shiftsCache, isLoading } = useShiftsContext();
  const shift = shiftsCache[shiftId];

  if (isLoading(shiftId)) {
    return (
      <div className="text-xs p-1 rounded bg-gray-300 text-gray-600 truncate animate-pulse">
        <div className="font-medium">⏳ Cargando...</div>
        <div className="text-gray-500">-- : --</div>
      </div>
    );
  }

  if (!shift) {
    return (
      <div className="text-xs p-1 rounded bg-red-500 text-white truncate">
        <div className="font-medium">❌ Error</div>
        <div className="text-red-100">Turno no encontrado</div>
      </div>
    );
  }

  return (
    <div className="text-xs p-1 rounded bg-blue-500 text-white truncate">
      <div className="font-medium">👤 {shift.nameTurno}</div>
      <div className="text-blue-100">🕐 {shift.startTime} - {shift.endTime}</div>
    </div>
  );
});

ShiftCard.displayName = 'ShiftCard';
