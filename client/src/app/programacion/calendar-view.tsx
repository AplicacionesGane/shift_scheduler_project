import { type WorkSchedule } from "@/types/Interfaces";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface CalendarViewProps {
  schedules: WorkSchedule[];
  month: number;
  year: number;
}

interface DaySchedule {
  date: number;
  schedules: WorkSchedule[];
  isCurrentMonth: boolean;
}

// Función para obtener el color del badge según el estado
const getScheduleVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toLowerCase()) {
    case 'confirmed':
    case 'confirmado':
      return 'default';
    case 'pending':
    case 'pendiente':
      return 'secondary';
    case 'cancelled':
    case 'cancelado':
      return 'destructive';
    default:
      return 'outline';
  }
};

export function CalendarView({ schedules, month, year }: CalendarViewProps) {
  // Función para obtener los días del calendario (incluyendo días de meses anteriores/posteriores)
  const getCalendarDays = (): DaySchedule[] => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = domingo, 1 = lunes, etc.

    const days: DaySchedule[] = [];

    // Días del mes anterior (para completar la primera semana)
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        schedules: [],
        isCurrentMonth: false
      });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const daySchedules = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.assignedDate);
        return scheduleDate.getDate() === day &&
               scheduleDate.getMonth() === month - 1 &&
               scheduleDate.getFullYear() === year;
      });

      days.push({
        date: day,
        schedules: daySchedules,
        isCurrentMonth: true
      });
    }

    // Días del mes siguiente (para completar la última semana)
    const remainingDays = 42 - days.length; // 6 semanas × 7 días = 42
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        schedules: [],
        isCurrentMonth: false
      });
    }

    return days;
  };

  const calendarDays = getCalendarDays();
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Estadísticas del mes
  const totalSchedules = schedules.length;
  const confirmedSchedules = schedules.filter(s => s.status.toLowerCase() === 'confirmed' || s.status.toLowerCase() === 'confirmado').length;
  const pendingSchedules = schedules.filter(s => s.status.toLowerCase() === 'pending' || s.status.toLowerCase() === 'pendiente').length;
  const cancelledSchedules = schedules.filter(s => s.status.toLowerCase() === 'cancelled' || s.status.toLowerCase() === 'cancelado').length;

  return (
    <div className="w-full space-y-4">
      {/* Leyenda y estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="font-semibold text-lg">{totalSchedules}</div>
          <div className="text-sm text-gray-600">Total turnos</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg text-green-600">{confirmedSchedules}</div>
          <div className="text-sm text-gray-600">Confirmados</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg text-yellow-600">{pendingSchedules}</div>
          <div className="text-sm text-gray-600">Pendientes</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg text-red-600">{cancelledSchedules}</div>
          <div className="text-sm text-gray-600">Cancelados</div>
        </div>
      </div>
      {/* Encabezados de días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center font-medium text-gray-500 border-b">
            {day}
          </div>
        ))}
      </div>

      {/* Calendario */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            date={day.date}
            schedules={day.schedules}
            isCurrentMonth={day.isCurrentMonth}
          />
        ))}
      </div>
    </div>
  );
}

interface CalendarDayProps {
  date: number;
  schedules: WorkSchedule[];
  isCurrentMonth: boolean;
}

function CalendarDay({ date, schedules, isCurrentMonth }: CalendarDayProps) {
  const hasSchedules = schedules.length > 0;
  const isToday = isCurrentMonth && new Date().getDate() === date && 
                  new Date().getMonth() === new Date().getMonth() &&
                  new Date().getFullYear() === new Date().getFullYear();

  return (
    <Card className={`
      min-h-[120px] p-2 transition-colors hover:shadow-md cursor-pointer
      ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
      ${isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
      ${hasSchedules && isCurrentMonth ? 'bg-green-50 border-green-200' : ''}
    `}>
      {/* Número del día */}
      <div className={`
        text-sm font-medium mb-1 flex justify-between items-center
        ${!isCurrentMonth ? 'text-gray-400' : ''}
        ${isToday ? 'text-blue-600 font-bold' : ''}
      `}>
        <span>{date}</span>
        {hasSchedules && (
          <span className="bg-blue-500 text-white rounded-full text-[10px] px-1 min-w-[16px] text-center">
            {schedules.length}
          </span>
        )}
      </div>

      {/* Turnos del día */}
      {hasSchedules && (
        <div className="space-y-1">
          {schedules.slice(0, 2).map((schedule, index) => (
            <div key={index} className="text-xs">
              <Badge 
                variant={getScheduleVariant(schedule.status)} 
                className="w-full justify-start text-[10px] py-0 px-1 mb-1"
              >
                <div className="truncate w-full">
                  <div className="font-medium">CC: {schedule.employeeDocument}</div>
                  <div className="opacity-75">{schedule.status}</div>
                </div>
              </Badge>
            </div>
          ))}
          
          {/* Indicador de más turnos */}
          {schedules.length > 2 && (
            <div className="text-[10px] text-blue-600 text-center font-medium bg-blue-100 rounded px-1">
              Ver {schedules.length - 2} más...
            </div>
          )}
        </div>
      )}

      {/* Indicador cuando no hay turnos */}
      {isCurrentMonth && !hasSchedules && (
        <div className="text-xs text-gray-400 text-center mt-8 opacity-50">
          Sin turnos
        </div>
      )}
    </Card>
  );
}
