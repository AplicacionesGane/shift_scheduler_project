import { useState, useEffect, useCallback } from 'react';
import type { DayCalendar, MonthData } from '../types';
import { API_SERVER_URL } from '@/utils/constants';
import axios from 'axios';

export const useCalendarData = () => {
  const [dataDates, setDataDates] = useState<MonthData | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [daysCalendar, setDayCalendar] = useState<DayCalendar[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar datos iniciales (años y meses disponibles)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/calendar/years-months`);
        setDataDates(response.data);
      } catch (error) {
        console.error('Error loading initial calendar data:', error);
      }
    };

    loadInitialData();
  }, []);

  // Cargar días del calendario cuando cambia año/mes
  useEffect(() => {
    if (!selectedYear || !selectedMonth) return;

    const loadCalendarDays = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_SERVER_URL}/calendar/year/${selectedYear}/month/${selectedMonth}`
        );
        setDayCalendar(response.data);
      } catch (error) {
        console.error('Error loading calendar days:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCalendarDays();
  }, [selectedYear, selectedMonth]);

  // Función para navegar entre meses
  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    if (!selectedYear || !selectedMonth || !dataDates) return null;

    const currentMonth = parseInt(selectedMonth);
    const currentYear = parseInt(selectedYear);

    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === 'prev') {
      newMonth = currentMonth - 1;
      if (newMonth < 1) {
        newMonth = 12;
        newYear = currentYear - 1;
      }
    } else {
      newMonth = currentMonth + 1;
      if (newMonth > 12) {
        newMonth = 1;
        newYear = currentYear + 1;
      }
    }

    // Verificar que el nuevo año esté disponible
    if (dataDates.years.includes(newYear)) {
      return { year: newYear.toString(), month: newMonth.toString() };
    }

    return null;
  }, [selectedYear, selectedMonth, dataDates]);

  // Verificar si se puede navegar
  const canNavigatePrev = useCallback(() => {
    if (!selectedYear || !selectedMonth || !dataDates) return false;
    const currentMonth = parseInt(selectedMonth);
    const currentYear = parseInt(selectedYear);
    
    if (currentMonth > 1) return true;
    return dataDates.years.includes(currentYear - 1);
  }, [selectedYear, selectedMonth, dataDates]);

  const canNavigateNext = useCallback(() => {
    if (!selectedYear || !selectedMonth || !dataDates) return false;
    const currentMonth = parseInt(selectedMonth);
    const currentYear = parseInt(selectedYear);
    
    if (currentMonth < 12) return true;
    return dataDates.years.includes(currentYear + 1);
  }, [selectedYear, selectedMonth, dataDates]);

  return {
    // State
    dataDates,
    selectedYear,
    selectedMonth,
    daysCalendar,
    loading,
    
    // Actions
    setSelectedYear,
    setSelectedMonth,
    navigateMonth,
    canNavigatePrev,
    canNavigateNext
  };
};
