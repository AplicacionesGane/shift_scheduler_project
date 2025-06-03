import { useState, useCallback, type FormEvent } from 'react';
import { CalendarFilters } from './components/CalendarFilters';
import { CalendarGrid } from './components/CalendarGrid';
import { useCalendarData } from './hooks/useCalendarData';
import { useWorkSchedules } from './hooks/useWorkSchedules';

export default function CalendarProgramer() {
  const [sucursal, setSucursal] = useState<string>("");

  // Hooks personalizados para manejar el estado
  const {
    dataDates,
    selectedYear,
    selectedMonth,
    daysCalendar,
    loading: calendarLoading,
    setSelectedYear,
    setSelectedMonth,
    navigateMonth,
    canNavigatePrev,
    canNavigateNext
  } = useCalendarData();

  const {
    loading: schedulesLoading,
    loadWorkSchedules,
    getWorkSchedulesForDay,
    getShiftName
  } = useWorkSchedules();

  // Manejar envío del formulario
  const handleSubmit = useCallback(async (ev: FormEvent) => {
    ev.preventDefault();

    if (!sucursal?.trim()) {
      alert('Por favor ingrese una sucursal');
      return;
    }

    if (!selectedYear || !selectedMonth) {
      alert('Por favor seleccione año y mes');
      return;
    }

    await loadWorkSchedules(sucursal, selectedYear, selectedMonth);
  }, [sucursal, selectedYear, selectedMonth, loadWorkSchedules]);

  // Manejar navegación entre meses
  const handleNavigateMonth = useCallback((direction: 'prev' | 'next') => {
    const newDate = navigateMonth(direction);
    if (newDate) {
      setSelectedYear(newDate.year);
      setSelectedMonth(newDate.month);
      
      // Si hay una sucursal seleccionada, cargar automáticamente los horarios
      if (sucursal?.trim()) {
        loadWorkSchedules(sucursal, newDate.year, newDate.month);
      }
    }
  }, [navigateMonth, setSelectedYear, setSelectedMonth, sucursal, loadWorkSchedules]);

  const handleNavigatePrev = useCallback(() => handleNavigateMonth('prev'), [handleNavigateMonth]);
  const handleNavigateNext = useCallback(() => handleNavigateMonth('next'), [handleNavigateMonth]);

  return (
    <>
      <CalendarFilters
        dataDates={dataDates}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        sucursal={sucursal}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
        onSucursalChange={setSucursal}
        onSubmit={handleSubmit}
      />

      <CalendarGrid
        daysCalendar={daysCalendar}
        canNavigatePrev={canNavigatePrev()}
        canNavigateNext={canNavigateNext()}
        onNavigatePrev={handleNavigatePrev}
        onNavigateNext={handleNavigateNext}
        getWorkSchedulesForDay={getWorkSchedulesForDay}
        getShiftName={getShiftName}
      />

      {(calendarLoading || schedulesLoading) && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg">
          Cargando...
        </div>
      )}
    </>
  );
}
