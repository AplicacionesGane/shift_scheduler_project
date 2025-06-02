interface CalendarDayProps {
  dayNumber: number;
  isHoliday: boolean;
  isWeekend: boolean;
  nameDay: string;
}

export const CalendarDay = ({ dayNumber, isHoliday, isWeekend, nameDay }: CalendarDayProps) => {
  
  // Determinar las clases CSS basadas en el tipo de día
  const getDayClasses = () => {
    const baseClasses = "min-h-[120px] p-2 border rounded-lg relative transition-colors hover:shadow-md";
    
    if (isHoliday) {
      return `${baseClasses} bg-red-50 border-red-200 text-red-900`;
    } else if (isWeekend) {
      return `${baseClasses} bg-blue-50 border-blue-200 text-blue-900`;
    } else {
      return `${baseClasses} bg-white border-gray-200 text-gray-900`;
    }
  };

  const getNumberClasses = () => {
    const baseClasses = "text-sm font-medium mb-1 flex items-center gap-1";
    
    if (isHoliday) {
      return `${baseClasses} text-red-700 font-bold`;
    } else if (isWeekend) {
      return `${baseClasses} text-blue-700 font-semibold`;
    } else {
      return `${baseClasses} text-gray-700`;
    }
  };

  return (
    <div className={getDayClasses()}>
      {/* Número del día con indicadores */}
      <div className={getNumberClasses()}>
        <span>{dayNumber}</span>
        {isHoliday && (
          <span className="text-xs bg-red-100 text-red-600 px-1 rounded" title="Día festivo">
            🎉
          </span>
        )}
        {isWeekend && !isHoliday && (
          <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded" title="Fin de semana">
            🏖️
          </span>
        )}
      </div>

      {/* Información adicional del día */}
      <div className="text-xs text-gray-500 mb-2">
        {nameDay}
      </div>

      {/* Programaciones del día */}
      <div className="space-y-1">
        {/*schedules.length > 0 ? (
          schedules.map((schedule) => (
            <ShiftCard key={schedule.id} shiftId={schedule.shiftId} employee={schedule.employee} />
          ))
        ) : (
          <div className="text-xs text-gray-500">No hay programaciones</div>
        )*/}
      </div>

      {/* Indicador de múltiples programaciones */}
    </div>
  );
}
