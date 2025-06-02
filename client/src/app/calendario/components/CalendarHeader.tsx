import type { CalendarInterface } from '@/types/Interfaces';

interface CalendarHeaderProps {
  calendarDays: CalendarInterface[];
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  onGoToday?: () => void;
}

export const CalendarHeader = ({ 
  calendarDays, 
  onPreviousMonth, 
  onNextMonth, 
  onGoToday 
}: CalendarHeaderProps) => {
  
  // Obtener información del mes actual
  const getCurrentMonthInfo = () => {
    if (!calendarDays || calendarDays.length === 0) {
      return { month: '', year: '', holidayCount: 0, weekendCount: 0 };
    }

    const firstDay = calendarDays[0];
    const month = firstDay.nameMonth;
    const year = firstDay.year;
    
    const holidayCount = calendarDays.filter(day => day.isHoliday).length;
    const weekendCount = calendarDays.filter(day => day.isWeekend && !day.isHoliday).length;

    return { month, year, holidayCount, weekendCount };
  };

  const { month, year, holidayCount, weekendCount } = getCurrentMonthInfo();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      {/* Header principal con navegación */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Mes anterior"
          >
            ←
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900">
            {month} {year}
          </h2>
          
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Siguiente mes"
          >
            →
          </button>
        </div>

        <button
          onClick={onGoToday}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Hoy
        </button>
      </div>

      {/* Información estadística del mes */}
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></span>
          <span>{calendarDays.length} días</span>
        </div>
        
        {holidayCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-100 border border-red-300 rounded"></span>
            <span>{holidayCount} festivo{holidayCount !== 1 ? 's' : ''}</span>
          </div>
        )}
        
        {weekendCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></span>
            <span>{weekendCount} fin{weekendCount !== 1 ? 'es' : ''} de semana</span>
          </div>
        )}
      </div>
    </div>
  );
};
