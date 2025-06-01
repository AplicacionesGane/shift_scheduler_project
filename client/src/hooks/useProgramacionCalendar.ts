import { useState, useEffect, useCallback } from 'react';
import { useProgramacion } from './useProgramacion';
import { useCalendar } from './useCalendar';
import { useShiftsContext } from '@/contexts/ShiftsContext';
import { useFormValidation } from './useFormValidation';

const currentYear = new Date().getFullYear();

export const useProgramacionCalendar = () => {
  const [year, setYear] = useState(currentYear);
  const [sucursal, setSucursal] = useState<string>("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  
  const { workSchedules, loading, error, fetchSchedules, clearSchedules } = useProgramacion();
  const { calendarDays, summary } = useCalendar(year, month, workSchedules);
  const { preloadShifts } = useShiftsContext();
  const { validateForm } = useFormValidation({ year, month, sucursal, clearSchedules });

  // Precargar turnos únicos cuando se cargan las programaciones
  useEffect(() => {
    if (workSchedules.length > 0) {
      const uniqueShiftIds = [...new Set(workSchedules.map(schedule => schedule.shiftId))];
      preloadShifts(uniqueShiftIds);
    }
  }, [workSchedules, preloadShifts]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      return;
    }
    
    await fetchSchedules(sucursal, year, month);
  }, [validateForm, fetchSchedules, sucursal, year, month]);

  const handleYearChange = useCallback((newYear: number) => {
    setYear(newYear);
  }, []);

  const handleMonthChange = useCallback((newMonth: number) => {
    setMonth(newMonth);
  }, []);

  const handleSucursalChange = useCallback((newSucursal: string) => {
    setSucursal(newSucursal);
  }, []);

  return {
    // State
    year,
    month,
    sucursal,
    workSchedules,
    calendarDays,
    summary,
    loading,
    error,
    
    // Handlers
    handleSubmit,
    handleYearChange,
    handleMonthChange,
    handleSucursalChange
  };
};
