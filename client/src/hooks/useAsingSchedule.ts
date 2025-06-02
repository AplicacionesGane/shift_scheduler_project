import { searchStoreById, getAllShifts, getVendedoraByDocument } from '@/services/stores.service';
import { assignScheduleService } from '@/services/asingSchedule.service';
import { useCallback, useEffect, useRef, useState } from "react";
import type { Shift, Store, Vendedora } from "@/types/Interfaces";

export function useAsingSchedule() {
  const [store, setStore] = useState<Store>();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [id, setId] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [vendedora, setVendedora] = useState<Vendedora>();
  
  // Calendar state
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Mes actual (1-12)
  const [selectedDates, setSelectedDates] = useState<Set<number>>(new Set());
  const [vendedoraDocument, setVendedoraDocument] = useState<string>("");

  const previousId = useRef<string>(id);
  
  const getStores = useCallback(
    async (id: string) => {
      if (id === previousId.current) return;
      previousId.current = id;
      const stores = await searchStoreById(id);
      setStore(stores);
    }, [])

  const getShifts = async () => {
    if (shifts.length > 0) return; // Evita recargar si ya hay turnos
    try {
      const shiftsData = await getAllShifts();
      setShifts(shiftsData);
    } catch (error) {
      console.error("Error al cargar los turnos:", error);
    }
  };

  const getVendedora = async (document: string) => {
    try {
      const vendedoraData = await getVendedoraByDocument(document);
      setVendedora(vendedoraData);
      setVendedoraDocument(document);
    } catch (error) {
      console.error("Error al cargar la vendedora:", error);
    }
  }

  // Calendar functions
  const toggleDate = useCallback((date: number) => {
    setSelectedDates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  }, []);

  const clearSelectedDates = useCallback(() => {
    setSelectedDates(new Set());
  }, []);

  const getDaysInMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }, []);

  const isValidAssignmentDate = useCallback((date: number) => {
    const today = new Date();
    const selectedDate = new Date(selectedYear, selectedMonth, date);
    return selectedDate >= today;
  }, [selectedYear, selectedMonth]);

  // TODO: Assignment confirmation
  const confirmAssignment = useCallback(async () => {
    if (!store || !vendedora || !selectedShift || selectedDates.size === 0) {
      alert("Por favor completa todos los pasos antes de confirmar la asignación");
      return false;
    }

    try {
      const assignmentData = {
        storeId: store.sucursal,
        shiftId: selectedShift,
        employeeDocument: vendedoraDocument,
        dates: Array.from(selectedDates).map(day => ({
          day,
          month: selectedMonth,
          year: selectedYear
        }))
      };

      const result = await assignScheduleService(assignmentData);
      
      // Crear mensaje resumido
      let message = `Resumen de asignación:\n`;
      message += `• Total: ${result.total} fechas\n`;
      message += `• Exitosas: ${result.successful}\n`;
      message += `• Fallidas: ${result.failed}\n`;
      
      if (result.successful > 0) {
        message += `\n✅ Fechas asignadas: ${result.successfulDates.join(', ')}`;
      }
      
      if (result.failed > 0) {
        message += `\n❌ Fechas fallidas:\n`;
        result.failedDates.forEach(failure => {
          message += `  • ${failure.date}: ${failure.error}\n`;
        });
      }

      alert(message);
      
      // Solo resetear el formulario si todas las asignaciones fueron exitosas
      if (result.failed === 0) {
        setSelectedDates(new Set());
        setVendedora(undefined);
        setStore(undefined);
        setSelectedShift(null);
        setId("");
        setVendedoraDocument("");
        return true;
      }
      
      // Si hubo fallos, mantener los datos para reintentar
      return result.failed === 0;

    } catch (error) {
      console.error("Error al confirmar asignación:", error);
      alert("Error crítico al procesar la asignación. Inténtalo de nuevo.");
      return false;
    }
  }, [store, vendedora, selectedShift, selectedDates, vendedoraDocument, selectedMonth, selectedYear]);

  useEffect(() => {
    getShifts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { 
    store, 
    getStores, 
    shifts, 
    getVendedora, 
    vendedora, 
    id, 
    setId, 
    selectedShift, 
    setSelectedShift, 
    getShifts,
    // Calendar functionality
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedDates,
    toggleDate,
    clearSelectedDates,
    getDaysInMonth,
    getFirstDayOfMonth,
    isValidAssignmentDate,
    vendedoraDocument,
    // Assignment confirmation
    confirmAssignment
  };
}