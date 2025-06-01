import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_SERVER_URL } from "@/utils/constants";

const currentYear = new Date().getFullYear();

const availableYears = [
  { value: currentYear - 1, label: (currentYear - 1).toString() },
  { value: currentYear, label: currentYear.toString() },
  { value: currentYear + 1, label: (currentYear + 1).toString() }
];

// Meses del año
const months = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" }
];

interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  month: number; // 1-12
  year: number; // Año
}

interface WorkSchedulesInterface {
  id: string;
  storeId: string;
  shiftId: string;
  employee: string;
  status: string;
  day: number; // Día del mes
  month: number; // Mes (1-12)
  year: number; // Año
  createdAt: string; // Fecha de creación
  updatedAt: string; // Fecha de actualización
}

interface ShiftsInterface {
  id: string;
  description: string | null;
  nameTurno: string;
  startTime: string; // Hora de inicio
  endTime: string; // Hora de fin
}

const RenderShift = ({ shiftId }: { shiftId: string }) => {
  const [shifts, setShifts] = useState<ShiftsInterface | null>(null);

  useEffect(() => {
    axios.get(`${API_SERVER_URL}/shifts/${shiftId}`)
      .then(response => {
        console.log("Datos obtenidos:", response.data);
        setShifts(response.data || null);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
        setShifts(null);
      });
  }, [shiftId]);

  return (
    <div className="text-xs p-1 rounded bg-blue-500 text-white truncate">
      <div className="font-medium">👤 {shifts?.nameTurno || 'Desconocido'}</div>
      <div className="text-blue-100">🕐 {shifts?.startTime || ''} - {shifts?.endTime || ''}</div>
    </div>
  );
}

export default function Programacion() {
  const [year, setYear] = useState(currentYear);
  const [sucursal, setSucursal] = useState<string>("");
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Mes actual (1-12)
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [workSchedules, setWorkSchedules] = useState<WorkSchedulesInterface[]>([]);

  useEffect(() => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0); // Día 0 del siguiente mes = último día del mes actual

    const range: DateRange = {
      startDate: firstDay.toISOString().split('T')[0], // YYYY-MM-DD
      endDate: lastDay.toISOString().split('T')[0],
      month: month,
      year: year
    };

    setDateRange(range);
  }, [month, year]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!sucursal) {
      alert("Por favor, ingresa el número de sucursal");
      return;
    }

    axios.get(`${API_SERVER_URL}/work-schedules/${sucursal}/${year}/${month}`)
      .then(response => {
        console.log("Datos obtenidos:", response.data);
        setWorkSchedules(response.data || []);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
        setWorkSchedules([]);
      });
  };

  // Función para generar los días del calendario
  const generateCalendarDays = () => {
    if (!dateRange) return [];

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    const startDate = new Date(startOfMonth);
    const endDate = new Date(endOfMonth);

    // Ajustar al inicio de la semana (domingo)
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // Ajustar al final de la semana (sábado)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const isCurrentMonth = currentDate.getMonth() === month - 1;
      const dayNumber = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() es 0-11, necesitamos 1-12
      const currentYear = currentDate.getFullYear();
      const fullDate = currentDate.toISOString().split('T')[0];

      // Buscar programaciones para este día específico
      const daySchedules = workSchedules.filter(schedule => {
        return schedule.day === dayNumber &&
          schedule.month === currentMonth &&
          schedule.year === currentYear &&
          schedule.status === "assigned";
      });

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
  };

  const calendarDays = generateCalendarDays();


  return (
    <section className="p-4">
      <Card className="px-4">
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <Label className="">Año</Label>
          <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableYears.map((yearOption) => (
                  <SelectItem key={yearOption.value} value={yearOption.value.toString()}>
                    {yearOption.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label className="">Mes</Label>
          <Select value={month.toString()} onValueChange={(value) => setMonth(parseInt(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months.map((monthOption) => (
                  <SelectItem key={monthOption.value} value={monthOption.value.toString()}>
                    {monthOption.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label>N° Sucursal:</Label>
          <Input className='w-52' value={sucursal} onChange={(e) => setSucursal(e.target.value)} />

          <Button type="submit" className="ml-2">
            Buscar
          </Button>
        </form>


      </Card>

      {/* Calendario */}
      {workSchedules.length > 0 && (
        <Card className="mt-4 p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-center">
              {months.find(m => m.value === month)?.label} {year}
            </h2>
            <p className="text-center text-gray-600">
              Sucursal: {sucursal} | {workSchedules.length} programaciones encontradas
            </p>
          </div>

          {/* Encabezados de días */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((day) => (
              <div key={day} className="p-2 text-center font-semibold text-gray-700 bg-gray-100 rounded">
                {day}
              </div>
            ))}
          </div>

          {/* Días del calendario */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => (
              <div
                key={day.dayNumber}
                className={`
                  min-h-[120px] p-2 border rounded-lg relative
                  ${day.isCurrentMonth
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-50 border-gray-100 text-gray-400'
                  }
                  ${day.schedules.length > 0 ? 'border-blue-300 bg-blue-50' : ''}
                `}
              >
                {/* Número del día */}
                <div className={`
                  text-sm font-medium mb-1
                  ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                `}>
                  {day.dayNumber}
                </div>

                {/* Programaciones del día */}
                <div className="space-y-1">
                  {day.schedules.length > 0 ? (
                    day.schedules.map((schedule) => (
                      <RenderShift key={schedule.id} shiftId={schedule.shiftId} />
                    ))
                  ) : (
                    <div className="text-xs text-gray-500">No hay programaciones</div>
                  )}
                </div>

                {/* Indicador de múltiples programaciones */}
                {day.schedules.length > 2 && (
                  <div className="absolute bottom-1 right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {day.schedules.length}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Resumen del mes:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total días programados:</span>
                <span className="ml-2 font-medium">
                  {calendarDays.filter(day => day.schedules.length > 0).length}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Total asignaciones:</span>
                <span className="ml-2 font-medium">{workSchedules.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Empleados únicos:</span>
                <span className="ml-2 font-medium">
                  {new Set(workSchedules.map(s => s.employee)).size}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Turnos únicos:</span>
                <span className="ml-2 font-medium">
                  {new Set(workSchedules.map(s => s.shiftId)).size}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Mensaje cuando no hay datos */}
      {sucursal && workSchedules.length === 0 && (
        <Card className="mt-4 p-8 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-lg font-medium mb-2">No hay programaciones</h3>
            <p>No se encontraron programaciones para la sucursal {sucursal} en {months.find(m => m.value === month)?.label} {year}</p>
          </div>
        </Card>
      )}
    </section>
  )
}