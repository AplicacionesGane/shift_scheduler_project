import type { Shift } from "@/types/Interfaces";
import { Card } from "@/components/ui/card";
import { memo, useMemo } from 'react';
import { Clock } from "lucide-react";

interface ShiftSelectionStepProps {
  shifts: Shift[];
  selectedShift: string | null;
  onShiftSelect: (shiftId: string | null) => void;
}

export const ShiftSelectionStep = memo(({ shifts, selectedShift, onShiftSelect }: ShiftSelectionStepProps) => {
  const selectedShiftDetails = useMemo(() => 
    shifts.find(s => s.id === selectedShift),
    [shifts, selectedShift]
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <StepHeader />
        
        {shifts.length > 0 ? (
          <div className="space-y-4">
            <ShiftGridHeader shiftsCount={shifts.length} hasSelected={!!selectedShift} />
            <ShiftGrid 
              shifts={shifts} 
              selectedShift={selectedShift} 
              onShiftSelect={onShiftSelect} 
            />
            {selectedShiftDetails && (
              <SelectedShiftInfo shift={selectedShiftDetails} />
            )}
          </div>
        ) : (
          <EmptyShiftsState />
        )}
      </div>
    </Card>
  );
});

const StepHeader = memo(() => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Step 2</h1>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
      <Clock className="w-5 h-5 text-blue-600" />
      Asignar Turno - Horario
    </h3>
    <p className="text-sm text-gray-600">
      Selecciona un turno disponible para asignar a la sucursal
    </p>
  </div>
));

const ShiftGridHeader = memo(({ shiftsCount, hasSelected }: {
  shiftsCount: number;
  hasSelected: boolean;
}) => (
  <div className="flex items-center justify-between">
    <h4 className="text-lg font-medium text-gray-900">
      Turnos Disponibles ({shiftsCount})
    </h4>
    {hasSelected && (
      <div className="text-sm text-green-600 font-medium">
        ✅ Turno seleccionado
      </div>
    )}
  </div>
));

const ShiftGrid = memo(({ shifts, selectedShift, onShiftSelect }: {
  shifts: Shift[];
  selectedShift: string | null;
  onShiftSelect: (shiftId: string | null) => void;
}) => (
  <div className="grid grid-cols-4 gap-4">
    {shifts.map((shift) => (
      <ShiftCard
        key={shift.id}
        shift={shift}
        isSelected={selectedShift === shift.id}
        onClick={() => onShiftSelect(selectedShift === shift.id ? null : shift.id)}
      />
    ))}
  </div>
));

const ShiftCard = memo(({ shift, isSelected, onClick }: {
  shift: Shift;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const duration = useMemo(() => {
    const start = new Date(`2000-01-01T${shift.startTime}`);
    const end = new Date(`2000-01-01T${shift.endTime}`);
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return `${diffHours}h duración`;
  }, [shift.startTime, shift.endTime]);

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]
        ${isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
        }
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-gray-400'}`} />
          <h5 className="font-semibold text-gray-900 truncate">{shift.nameTurno}</h5>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">🕐</span>
            <span className="font-medium text-gray-700">
              {shift.startTime} - {shift.endTime}
            </span>
          </div>

          <div className="flex items-center justify-center">
            <div className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${isSelected
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {duration}
            </div>
          </div>

          {shift.description && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 truncate" title={shift.description}>
                {shift.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const SelectedShiftInfo = memo(({ shift }: { shift: Shift }) => (
  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold">✓</span>
      </div>
      <div>
        <h5 className="font-semibold text-blue-900">
          Turno Seleccionado: {shift.nameTurno}
        </h5>
        <p className="text-sm text-blue-700">
          Horario: {shift.startTime} - {shift.endTime}
        </p>
      </div>
    </div>
  </div>
));

const EmptyShiftsState = memo(() => (
  <div className="flex items-center justify-center py-12 text-gray-400">
    <div className="text-center">
      <div className="text-4xl mb-4">⏰</div>
      <p className="text-lg">No hay turnos disponibles</p>
      <p className="text-sm">Los turnos se cargarán automáticamente</p>
    </div>
  </div>
));

ShiftSelectionStep.displayName = 'ShiftSelectionStep';
StepHeader.displayName = 'StepHeader';
ShiftGridHeader.displayName = 'ShiftGridHeader';
ShiftGrid.displayName = 'ShiftGrid';
ShiftCard.displayName = 'ShiftCard';
SelectedShiftInfo.displayName = 'SelectedShiftInfo';
EmptyShiftsState.displayName = 'EmptyShiftsState';
