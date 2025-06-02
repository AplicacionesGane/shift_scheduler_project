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

const daysNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabados", ]

export default function CalendarProgramer() {
  const [dataDates, setDataDates] = useState<MonthData | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [sucursal, setSucursal] = useState<string>("")

  const [daysCalendar, setDayCalendar] = useState<DayCalendar[]>([])

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

    axios.get(`${API_SERVER_URL}/calendar/year/${selectedYear}/month/${selectedMonth}`)
      .then(res => { console.log(res.data.data); setDayCalendar(res.data.data) })
      .catch(err => console.log(err))

    axios.get(`${API_SERVER_URL}/work-schedules/${sucursal}/${selectedYear}/${selectedMonth}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  // Función para generar el calendario con espacios vacíos
  const generateCalendarGrid = () => {
    if (!daysCalendar.length) return [];

    // Obtener el primer día del mes y calcular espacios vacíos
    const firstDay = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1, 1);
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
    return [...dayMap, ...daysCalendar];
  };

  const renderDay = generateCalendarGrid()

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
      <Card className=''>

        <header className='grid grid-cols-7'>
          {daysNames.map((day, i) => (
            <article key={i + 1}>
              {day}
            </article>
          ))}
        </header>

        <main className='grid grid-cols-7'>
          {
            renderDay?.map(c => (
              <article key={c.id}>
                <p>{c.days}</p>
                <p>{c.isHoliday}</p>
                <p>{c.nameDay}</p>
              </article>
            ))
          }
        </main>
      </Card>
    </>
  )
}