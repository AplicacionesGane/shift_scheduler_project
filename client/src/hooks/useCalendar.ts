import { useMemo } from 'react';
import type { WorkSchedule, CalendarDay } from '@/types/Interfaces';

export const useCalendar = (year: number, month: number, workSchedules: WorkSchedule[]) => {
  const calendarDays = useMemo((): CalendarDay[] => {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    const startDate = new Date(startOfMonth);
    const endDate = new Date(endOfMonth);

    // Ajustar al inicio de la semana (domingo)
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // Ajustar al final de la semana (sábado)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days: CalendarDay[] = [];
    const currentDate = new Date(startDate);

    // Crear un mapa para búsqueda más eficiente
    const scheduleMap = new Map<string, WorkSchedule[]>();
    workSchedules.forEach(schedule => {
      if (schedule.status === "assigned") {
        const key = `${schedule.year}-${schedule.month}-${schedule.day}`;
        if (!scheduleMap.has(key)) {
          scheduleMap.set(key, []);
        }
        scheduleMap.get(key)!.push(schedule);
      }
    });

    while (currentDate <= endDate) {
      const isCurrentMonth = currentDate.getMonth() === month - 1;
      const dayNumber = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const fullDate = currentDate.toISOString().split('T')[0];

      // Buscar programaciones usando el mapa
      const scheduleKey = `${currentYear}-${currentMonth}-${dayNumber}`;
      const daySchedules = scheduleMap.get(scheduleKey) || [];

      days.push({
        date: new Date(currentDate),
        dayNumber,
        isCurrentMonth,
        fullDate,
        schedules: daySchedules
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, [year, month, workSchedules]);

  const summary = useMemo(() => {
    const daysWithSchedules = calendarDays.filter(day => day.schedules.length > 0).length;
    const totalAssignments = workSchedules.length;
    const uniqueEmployees = new Set(workSchedules.map(s => s.employee)).size;
    const uniqueShifts = new Set(workSchedules.map(s => s.shiftId)).size;

    return {
      daysWithSchedules,
      totalAssignments,
      uniqueEmployees,
      uniqueShifts
    };
  }, [calendarDays, workSchedules]);

  return {
    calendarDays,
    summary
  };
};
