import type { DayCalendar } from '../types';

export const generateCalendarGrid = (data: DayCalendar[]): DayCalendar[] => {
  if (!data.length) return [];

  const { year, month } = data[0];

  // Obtener el primer día del mes y calcular espacios vacíos
  const firstDay = new Date(year, (month - 1), 1);
  const firstDayOfWeek = firstDay.getDay(); // 0 = domingo, 1 = lunes, etc.

  // Crear espacios vacíos al inicio
  const emptySlots = Array(firstDayOfWeek).fill(null);

  const dayMap = emptySlots.map((): DayCalendar => {
    return {
      id: Math.random().toString(),
      days: 0, // Cambiado de null a 0 para mejor tipado
      year: year,
      isHoliday: false,
      isWeekend: false,
      month: month,
      holidayDescription: null,
      nameDay: "",
      nameMonth: "",
      createdAt: "",
      updatedAt: "",
    };
  });

  // Combinar espacios vacíos con días del mes
  return [...dayMap, ...data];
};
