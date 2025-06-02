export interface WorkSchedule {
    id: string;
    storeId: string;
    shiftId: string;
    employee: string;
    status: string;
    day: number; // Día del mes
    month: number; // Mes (1-12)
    year: number; // Año
    createdAt: string; // Fecha de creación
    updatedAt: string; // Fecha de actualización
}

export interface Shift {
    id: string;
    description: string | null;
    nameTurno: string;
    startTime: string; // Hora de inicio
    endTime: string; // Hora de fin
}

export interface CalendarDay {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
    fullDate: string;
    schedules: WorkSchedule[];
}

export interface SummaryData {
    daysWithSchedules: number;
    totalAssignments: number;
    uniqueEmployees: number;
    uniqueShifts: number;
}

export interface DateRange {
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
    month: number; // 1-12
    year: number; // Año
}

export interface Store {
    empresa: string;
    sucursal: string;
    nombre: string;
    direccion: string;
    estado: string | null;
    categoria: string;
    celula: string;
    horaEntrada: string;
    horaSalida: string;
    horaEntradaFest: string;
    horaSalidaFest: string;
    region: string;
}

export interface Vendedora {
    documento: string;
    nombres: string;
    nameCargo: string;
}

export interface ResDataByYears {
  years: number[];
  months: { numero: number; nameMonth: string }[];
}

export interface CalendarInterface {
  id: string
  year: number
  month: number
  days: number
  isHoliday: boolean
  isWeekend: boolean
  nameDay: string
  nameMonth: string
  holidayDescription: string | null
  createdAt: string
  updatedAt: string
}

export interface ResponseDataCalendar {
    success: boolean;
    message: string;
    data: CalendarInterface[];
    error?: string | null;
    count?: number;
}