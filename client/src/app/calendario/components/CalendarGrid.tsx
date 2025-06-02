import type { CalendarInterface } from '@/types/Interfaces';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  calendarDays: CalendarInterface[];
}

const nameDays = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
]

        // {
        //     "id": "b56da470-2a2b-452e-b03a-4bb43ed000be",
        //     "year": 2025,
        //     "month": 6,
        //     "days": 1,
        //     "isHoliday": false,
        //     "isWeekend": true,
        //     "nameDay": "Domingo",
        //     "nameMonth": "Junio",
        //     "holidayDescription": null,
        //     "createdAt": "2025-06-02T19:10:29.000Z",
        //     "updatedAt": "2025-06-02T19:10:29.000Z"
        // },

export const CalendarGrid = ({ calendarDays }: CalendarGridProps) => {  
  
  // Función para convertir el nombre del día a índice (Lunes = 0, Domingo = 6)
  const getDayIndex = (dayName: string): number => {
    const dayMap: { [key: string]: number } = {
      'Lunes': 0,
      'Martes': 1,
      'Miércoles': 2,
      'Jueves': 3,
      'Viernes': 4,
      'Sábado': 5,
      'Domingo': 6
    };
    return dayMap[dayName] || 0;
  };

  // Crear array para renderizar el calendario completo
  const renderCalendarGrid = () => {
    if (!calendarDays || calendarDays.length === 0) return [];

    // Ordenar días por fecha
    const sortedDays = [...calendarDays].sort((a, b) => a.days - b.days);
    
    // Obtener el primer día del mes y su posición en la semana
    const firstDay = sortedDays[0];
    const firstDayIndex = getDayIndex(firstDay.nameDay);
    
    // Crear array con espacios vacíos al inicio si es necesario
    const calendarGrid: (CalendarInterface | null)[] = [];
    
    // Agregar espacios vacíos al inicio
    for (let i = 0; i < firstDayIndex; i++) {
      calendarGrid.push(null);
    }
    
    // Agregar todos los días del mes
    sortedDays.forEach(day => {
      calendarGrid.push(day);
    });
    
    return calendarGrid;
  };

  const calendarGrid = renderCalendarGrid();

  return (
    <>
      {/** Header Para Los Días */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {
          nameDays.map((d, index) => 
            <div key={index} className='p-2 text-center rounded-md bg-gray-200 text-gray-700 font-medium text-sm'>
              {d}
            </div>
          )
        }
      </div>

      {/* Días del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((day, index) => (
          day ? (
            <CalendarDay
              key={day.id}
              dayNumber={day.days}
              isHoliday={day.isHoliday}
              isWeekend={day.isWeekend}
              nameDay={day.nameDay}
            />
          ) : (
            // Celda vacía para días que no pertenecen al mes
            <div key={`empty-${index}`} className="min-h-[120px] p-2 border rounded-lg bg-gray-50 border-gray-100">
              {/* Celda vacía */}
            </div>
          )
        ))}
      </div>
    </>
  );
}
