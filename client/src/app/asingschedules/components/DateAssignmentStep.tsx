import { memo, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Store, Vendedora, Shift } from "@/types/Interfaces";

interface DateAssignmentStepProps {
  store?: Store;
  vendedora?: Vendedora;
  shifts: Shift[];
  selectedShift: string | null;
  selectedYear: number;
  selectedMonth: number;
  selectedDates: Set<number>;
  vendedoraDocument: string;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onDateToggle: (date: number) => void;
  onClearDates: () => void;
  onConfirmAssignment: () => void;
  getDaysInMonth: (year: number, month: number) => number;
  getFirstDayOfMonth: (year: number, month: number) => number;
  isValidAssignmentDate: (date: number) => boolean;
}

export const DateAssignmentStep = memo((props: DateAssignmentStepProps) => {
  const {
    store,
    vendedora,
    shifts,
    selectedShift,
    selectedYear,
    selectedMonth,
    selectedDates,
    vendedoraDocument,
    onYearChange,
    onMonthChange,
    onDateToggle,
    onClearDates,
    onConfirmAssignment,
    getDaysInMonth,
    getFirstDayOfMonth,
    isValidAssignmentDate
  } = props;

  const monthNames = useMemo(() => [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ], []);

  const selectedShiftDetails = useMemo(() => 
    shifts.find(s => s.id === selectedShift),
    [shifts, selectedShift]
  );

  const canShowAssignmentSummary = store && vendedora && selectedShift && selectedDates.size > 0;

  return (
    <Card className="p-6">
      <div className="space-y-6 col-span-1 px-8 py-6">
        <StepHeader storeName={store?.nombre} />
        
        <YearMonthSelector
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
          monthNames={monthNames}
        />

        <CalendarGrid
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDates={selectedDates}
          monthNames={monthNames}
          onDateToggle={onDateToggle}
          onMonthNavigation={(direction) => {
            if (direction === 'prev') {
              if (selectedMonth === 0) {
                onMonthChange(11);
                onYearChange(selectedYear - 1);
              } else {
                onMonthChange(selectedMonth - 1);
              }
            } else {
              if (selectedMonth === 11) {
                onMonthChange(0);
                onYearChange(selectedYear + 1);
              } else {
                onMonthChange(selectedMonth + 1);
              }
            }
          }}
          getDaysInMonth={getDaysInMonth}
          getFirstDayOfMonth={getFirstDayOfMonth}
          isValidAssignmentDate={isValidAssignmentDate}
        />

        {selectedDates.size > 0 && (
          <SelectedDatesSummary
            selectedDates={selectedDates}
            monthName={monthNames[selectedMonth]}
            year={selectedYear}
            onClear={onClearDates}
          />
        )}

        {canShowAssignmentSummary && (
          <AssignmentSummary
            store={store}
            vendedora={vendedora}
            shift={selectedShiftDetails!}
            selectedDates={selectedDates}
            vendedoraDocument={vendedoraDocument}
            onConfirm={onConfirmAssignment}
          />
        )}
      </div>
    </Card>
  );
});

const StepHeader = memo(({ storeName }: { storeName?: string }) => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-8">Step 4</h1>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex gap-2">
      <Calendar className="w-5 h-5 text-blue-600" />
      <span>Asignación de fechas</span>
    </h3>
    <p className="text-sm text-gray-600 mb-6">
      Selecciona el año, mes y días para la asignación del turno en el punto de venta: {storeName}
    </p>
  </div>
));

const YearMonthSelector = memo(({ 
  selectedYear, 
  selectedMonth, 
  onYearChange, 
  onMonthChange, 
  monthNames 
}: {
  selectedYear: number;
  selectedMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  monthNames: string[];
}) => (
  <div className="grid grid-cols-2 gap-4 mb-6">
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-2 block">Año</Label>
      <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar año" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(5)].map((_, i) => {
            const year = new Date().getFullYear() + i;
            return (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
    
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-2 block">Mes</Label>
      <Select value={selectedMonth.toString()} onValueChange={(value) => onMonthChange(parseInt(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar mes" />
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((month, index) => (
            <SelectItem key={index} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
));

const CalendarGrid = memo((props: {
  selectedYear: number;
  selectedMonth: number;
  selectedDates: Set<number>;
  monthNames: string[];
  onDateToggle: (date: number) => void;
  onMonthNavigation: (direction: 'prev' | 'next') => void;
  getDaysInMonth: (year: number, month: number) => number;
  getFirstDayOfMonth: (year: number, month: number) => number;
  isValidAssignmentDate: (date: number) => boolean;
}) => {
  const {
    selectedYear,
    selectedMonth,
    selectedDates,
    monthNames,
    onDateToggle,
    onMonthNavigation,
    getDaysInMonth,
    getFirstDayOfMonth,
    isValidAssignmentDate
  } = props;

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
      <CalendarHeader
        monthName={monthNames[selectedMonth]}
        year={selectedYear}
        onPrevMonth={() => onMonthNavigation('prev')}
        onNextMonth={() => onMonthNavigation('next')}
      />

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {[...Array(firstDay)].map((_, index) => (
          <div key={`empty-${index}`} className="p-2 h-10" />
        ))}
        
        {/* Days of the month */}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          return (
            <CalendarDay
              key={day}
              day={day}
              isSelected={selectedDates.has(day)}
              isValid={isValidAssignmentDate(day)}
              onClick={() => isValidAssignmentDate(day) && onDateToggle(day)}
            />
          );
        })}
      </div>
    </div>
  );
});

const CalendarHeader = memo(({ 
  monthName, 
  year, 
  onPrevMonth, 
  onNextMonth 
}: {
  monthName: string;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) => (
  <div className="flex items-center justify-between mb-4">
    <h4 className="text-lg font-semibold text-gray-900">
      {monthName} {year}
    </h4>
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevMonth}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onNextMonth}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
));

const CalendarDay = memo(({ 
  day, 
  isSelected, 
  isValid, 
  onClick 
}: {
  day: number;
  isSelected: boolean;
  isValid: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={!isValid}
    className={`
      p-2 h-10 text-sm rounded-md transition-all duration-200 font-medium
      ${isValid 
        ? `cursor-pointer hover:bg-blue-100 ${
            isSelected 
              ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300' 
              : 'bg-white hover:shadow-md border border-gray-200'
          }`
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      }
    `}
  >
    {day}
    {isSelected && (
      <CheckCircle2 className="w-3 h-3 mx-auto mt-1" />
    )}
  </button>
));

const SelectedDatesSummary = memo(({ 
  selectedDates, 
  monthName, 
  year, 
  onClear 
}: {
  selectedDates: Set<number>;
  monthName: string;
  year: number;
  onClear: () => void;
}) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div>
        <h5 className="font-medium text-green-800 mb-1">
          Fechas seleccionadas ({selectedDates.size})
        </h5>
        <p className="text-sm text-green-600">
          {Array.from(selectedDates).sort((a, b) => a - b).join(', ')} de {monthName} {year}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        className="text-green-700 border-green-300 hover:bg-green-100"
      >
        Limpiar
      </Button>
    </div>
  </div>
));

const AssignmentSummary = memo(({ 
  store, 
  vendedora, 
  shift, 
  selectedDates, 
  vendedoraDocument, 
  onConfirm 
}: {
  store: Store;
  vendedora: Vendedora;
  shift: Shift;
  selectedDates: Set<number>;
  vendedoraDocument: string;
  onConfirm: () => void;
}) => (
  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
    <h5 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
      <CheckCircle2 className="w-5 h-5" />
      Resumen de asignación
    </h5>
    <div className="space-y-3 text-sm">
      <SummaryRow label="Punto de venta" value={store.nombre} />
      <SummaryRow label="Vendedora" value={`${vendedora.nombres} (${vendedoraDocument})`} />
      <SummaryRow label="Turno" value={shift.nameTurno} />
      <SummaryRow label="Fechas" value={`${selectedDates.size} días`} />
    </div>
    
    <div className="mt-4 pt-4 border-t border-purple-200">
      <Button 
        onClick={onConfirm}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      >
        Confirmar asignación
      </Button>
    </div>
  </div>
));

const SummaryRow = memo(({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
));

DateAssignmentStep.displayName = 'DateAssignmentStep';
StepHeader.displayName = 'StepHeader';
YearMonthSelector.displayName = 'YearMonthSelector';
CalendarGrid.displayName = 'CalendarGrid';
CalendarHeader.displayName = 'CalendarHeader';
CalendarDay.displayName = 'CalendarDay';
SelectedDatesSummary.displayName = 'SelectedDatesSummary';
AssignmentSummary.displayName = 'AssignmentSummary';
SummaryRow.displayName = 'SummaryRow';
