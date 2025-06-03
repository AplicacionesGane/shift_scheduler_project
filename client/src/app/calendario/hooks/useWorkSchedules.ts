import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { API_SERVER_URL } from '@/utils/constants';
import type { WorkSchedule, Shift } from '../types';

export const useWorkSchedules = () => {
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar turnos al montar el componente
  useEffect(() => {
    const loadShifts = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/shifts`);
        setShifts(response.data);
      } catch (error) {
        console.error('Error loading shifts:', error);
      }
    };

    loadShifts();
  }, []);

  // Memoizar el mapa de turnos para mejor performance
  const shiftsMap = useMemo(() => {
    return shifts.reduce((map, shift) => {
      map[shift.id] = shift.nameTurno;
      return map;
    }, {} as Record<string, string>);
  }, [shifts]);

  // Función para cargar horarios de trabajo
  const loadWorkSchedules = useCallback(async (sucursal: string, year: string, month: string) => {
    if (!sucursal?.trim() || !year || !month) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_SERVER_URL}/work-schedules/${sucursal}/${year}/${month}`
      );
      setWorkSchedules(response.data);
    } catch (error) {
      console.error('Error loading work schedules:', error);
      setWorkSchedules([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para obtener horarios de un día específico
  const getWorkSchedulesForDay = useCallback((year: number, month: number, day: number) => {
    return workSchedules.filter(schedule => 
      schedule.year === year && 
      schedule.month === month && 
      schedule.day === day
    );
  }, [workSchedules]);

  // Función para obtener el nombre del turno
  const getShiftName = useCallback((shiftId: string) => {
    return shiftsMap[shiftId] || 'Sin turno';
  }, [shiftsMap]);

  return {
    // State
    workSchedules,
    shifts,
    loading,
    
    // Actions
    loadWorkSchedules,
    getWorkSchedulesForDay,
    getShiftName
  };
};
