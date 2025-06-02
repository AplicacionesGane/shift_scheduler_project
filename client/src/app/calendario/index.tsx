import { useEffect, useState, type FormEvent } from 'react';
import { API_SERVER_URL } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Card } from "@/components/ui/card";
import axios from 'axios';

interface DayCalendar {
  id: string
  days: number
  nameDay: string
  month: number
  nameMonth: string
  year: number
  isHoliday: false
  isWeekend: false
  holidayDescription: string | null
  updatedAt: string
  createdAt: string
}

interface MonthData {
  years: number[];
  months: { numero: number, nameMonth: string }[]
}

interface WorkSchedule {
  id: string
  year: number
  month: number
  day: number
  shiftId: string
  employee: string
  status: string
  storeId: string
  updatedAt: string
  createdAt: string
}

const generateCalendarGrid = (data: DayCalendar[]) => {
  if (!data.length) return [];

  const { year, month } = data[0]

  // Obtener el primer día del mes y calcular espacios vacíos
  const firstDay = new Date(year, (month - 1), 1);
  const firstDayOfWeek = firstDay.getDay(); // 0 = domingo, 1 = lunes, etc.

  // Crear espacios vacíos al inicio
  const emptySlots = Array(firstDayOfWeek).fill(null);

  const dayMap = emptySlots.map((d): DayCalendar => {
    return {
      id: Math.random().toString(),
      days: d,
      year: 2025,
      isHoliday: false,
      isWeekend: false,
      month: 6,
      holidayDescription: null,
      nameDay: "   ",
      nameMonth: "   ",
      createdAt: "   ",
      updatedAt: "   ",
    }
  })

  // Combinar espacios vacíos con días del mes
  return [...dayMap, ...data];
};

export default function CalendarProgramer() {
  const [dataDates, setDataDates] = useState<MonthData | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [sucursal, setSucursal] = useState<string>("")

  const [daysCalendar, setDayCalendar] = useState<DayCalendar[]>([])
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([])

  useEffect(() => {
    if (!selectedYear || !selectedMonth) return
    axios.get(`${API_SERVER_URL}/calendar/year/${selectedYear}/month/${selectedMonth}`)
      .then(res => { console.log(res.data.data); setDayCalendar(res.data.data) })
      .catch(err => console.log(err))
  }, [selectedYear, selectedMonth])

  useEffect(() => {
    axios.get(`${API_SERVER_URL}/calendar/years-months`)
      .then(res => setDataDates(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()

    if (!sucursal || sucursal.trim() === "") {
      alert('faltan datos')
      return
    }

    axios.get(`${API_SERVER_URL}/work-schedules/${sucursal}/${selectedYear}/${selectedMonth}`)
      .then(res => setWorkSchedules(res.data))
      .catch(err => console.log(err))
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (!selectedYear || !selectedMonth) return;

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

    // Verificar que el nuevo año esté disponible en los datos
    if (dataDates && dataDates.years.includes(newYear)) {
      setSelectedYear(newYear.toString());
      setSelectedMonth(newMonth.toString());
      
      // Si hay una sucursal seleccionada, cargar automáticamente los horarios
      if (sucursal && sucursal.trim() !== "") {
        axios.get(`${API_SERVER_URL}/work-schedules/${sucursal}/${newYear}/${newMonth}`)
          .then(res => setWorkSchedules(res.data))
          .catch(err => console.log(err))
      }
    }
  }

  const canNavigatePrev = () => {
    if (!selectedYear || !selectedMonth || !dataDates) return false;
    const currentMonth = parseInt(selectedMonth);
    const currentYear = parseInt(selectedYear);

    if (currentMonth > 1) return true;
    // Si estamos en enero, verificar si el año anterior está disponible
    return dataDates.years.includes(currentYear - 1);
  }

  const canNavigateNext = () => {
    if (!selectedYear || !selectedMonth || !dataDates) return false;
    const currentMonth = parseInt(selectedMonth);
    const currentYear = parseInt(selectedYear);

    if (currentMonth < 12) return true;
    // Si estamos en diciembre, verificar si el año siguiente está disponible
    return dataDates.years.includes(currentYear + 1);
  }

  // Función para encontrar los horarios de trabajo de un día específico
  const getWorkSchedulesForDay = (year: number, month: number, day: number) => {
    return workSchedules.filter(schedule => 
      schedule.year === year && 
      schedule.month === month && 
      schedule.day === day
    );
  }

  const renderDay = generateCalendarGrid(daysCalendar)

  return (
    <>
      <Card className="p-4">
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
          <Label>Año: </Label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="">Seleccionar Año</option>
            {
              dataDates && dataDates.years?.map((n, index) => (
                <option key={index} value={n.toString()}>
                  {n}
                </option>
              ))
            }
          </select>

          <Label>Mes: </Label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            {
              dataDates && dataDates.months?.map((n, index) => (
                <option key={index} value={n.numero.toString()}>
                  {n.nameMonth}
                </option>
              ))
            }

          </select>

          <Label>Sucursal: </Label>
          <Input
            value={sucursal}
            onChange={e => setSucursal(e.target.value)}
            className='w-44'
          />

          <Button type='submit'>
            Buscar
          </Button>
        </form>
      </Card>

      {/** Renderizar Calendario */}
      <Card className="p-6 shadow-lg">
        {daysCalendar.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigateMonth('prev')}
              disabled={!canNavigatePrev()}
              className="flex items-center gap-2"
            >
              ← Anterior
            </Button>

            <h2 className="text-2xl font-bold text-gray-800">
              {daysCalendar[0].nameMonth} {daysCalendar[0].year}
            </h2>

            <Button
              variant="outline"
              onClick={() => navigateMonth('next')}
              disabled={!canNavigateNext()}
              className="flex items-center gap-2"
            >
              Siguiente →
            </Button>
          </div>
        )}

        {
          renderDay.length > 0 && (
            <div className="grid grid-cols-7 gap-1 mb-6">
              {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day, i) => (
                <div
                  key={i}
                  className="h-14 flex items-center justify-center text-sm font-bold text-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm"
                >
                  {day}
                </div>
              ))}
            </div>

          )
        }
        <div className="grid grid-cols-7 gap-2">
          {renderDay?.map((c, index) => {
            // Obtener los horarios de trabajo para este día
            const dayWorkSchedules = c?.days ? getWorkSchedulesForDay(c.year, c.month, c.days) : [];
            
            return (
              <div
                key={c?.id || index}
                className={`
                  h-28 border rounded-lg p-3 text-sm transition-all duration-300 cursor-pointer hover:scale-105
                  ${c?.days ? 'bg-white hover:bg-slate-50 hover:shadow-lg border-slate-200 shadow-sm' : 'bg-slate-50/30 border-slate-100'}
                  ${c?.isWeekend ? 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-300' : ''}
                  ${c?.isHoliday ? 'bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border-red-300' : ''}
                `}
              >
                {c?.days && (
                  <div className="h-full flex flex-col">
                    <div className={`font-bold text-xl mb-2 ${c.isHoliday ? 'text-red-800' : c.isWeekend ? 'text-blue-800' : 'text-slate-800'}`}>
                      {c.days}
                    </div>

                    {c.nameDay && c.nameDay.trim() !== "" && (
                      <div className="text-xs text-slate-600 mb-2 truncate font-medium">
                        {c.nameDay}
                      </div>
                    )}

                    {/* Mostrar empleados programados */}
                    {dayWorkSchedules.length > 0 && (
                      <div className="flex-1 space-y-1">
                        {dayWorkSchedules.slice(0, 2).map((schedule) => (
                          <div 
                            key={schedule.id} 
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-md font-medium border border-green-300"
                          >
                            {schedule.employee}
                          </div>
                        ))}
                        {dayWorkSchedules.length > 2 && (
                          <div className="text-xs text-slate-500 font-medium">
                            +{dayWorkSchedules.length - 2} más
                          </div>
                        )}
                      </div>
                    )}

                    {c.isHoliday && c.holidayDescription && (
                      <div className="text-xs text-red-700 bg-red-200/50 px-2 py-1 rounded-md mt-auto font-medium border border-red-300">
                        {c.holidayDescription}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  )
}