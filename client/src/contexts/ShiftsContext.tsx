import React, { createContext, useContext } from 'react';
import { useShifts } from '@/hooks/useShifts';
import type { Shift } from '@/types/Interfaces';

interface ShiftsContextType {
  getShift: (shiftId: string) => Promise<Shift | null>;
  preloadShifts: (shiftIds: string[]) => Promise<void>;
  shiftsCache: Record<string, Shift>;
  isLoading: (shiftId: string) => boolean;
}

const ShiftsContext = createContext<ShiftsContextType | undefined>(undefined);

export const ShiftsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const shiftsState = useShifts();

  return (
    <ShiftsContext.Provider value={shiftsState}>
      {children}
    </ShiftsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useShiftsContext = () => {
  const context = useContext(ShiftsContext);
  if (context === undefined) {
    throw new Error('useShiftsContext must be used within a ShiftsProvider');
  }
  return context;
};
