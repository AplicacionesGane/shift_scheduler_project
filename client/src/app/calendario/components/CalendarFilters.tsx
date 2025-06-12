import { type FormEvent, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Card } from "@/components/ui/card";
import type { MonthData } from '../types';

interface CalendarFiltersProps {
  dataDates: MonthData | null;
  selectedYear: string;
  selectedMonth: string;
  sucursal: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onSucursalChange: (sucursal: string) => void;
  onSubmit: (ev: FormEvent) => void;
}

export const CalendarFilters = memo(({
  dataDates,
  selectedYear,
  selectedMonth,
  sucursal,
  onYearChange,
  onMonthChange,
  onSucursalChange,
  onSubmit
}: CalendarFiltersProps) => {
  return (
    <Card className="p-4">
      <form className='flex items-center gap-2' onSubmit={onSubmit}>
        <Label>Año: </Label>
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">Seleccionar Año</option>
          {dataDates?.years?.map((year, index) => (
            <option key={index} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>

        <Label>Mes: </Label>
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">Seleccionar Mes</option>
          {dataDates?.months?.map((month, index) => (
            <option key={index} value={month.number.toString()}>
              {month.name}
            </option>
          ))}
        </select>

        <Label>Sucursal: </Label>
        <Input
          value={sucursal}
          onChange={e => onSucursalChange(e.target.value)}
          className='w-44'
          placeholder="Ingrese sucursal"
        />

        <Button type='submit'>
          Buscar
        </Button>
      </form>
    </Card>
  );
});

CalendarFilters.displayName = 'CalendarFilters';
