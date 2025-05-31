import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, type FormEvent } from "react";
import { type WorkSchedule } from "@/types/Interfaces";
import { API_SERVER_URL } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { CalendarView } from "./calendar-view";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface DateRange {
  startDate: string;
  endDate: string;
  month: number;
  year: number;
}

export default function Programacion() {
  const [data, setData] = useState<WorkSchedule[]>([]);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  // Años disponibles (año actual, anterior y siguiente)
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

  const handleFetchData = (ev: FormEvent) => {
    ev.preventDefault();
    if (storeId && dateRange) {
      const url = `${API_SERVER_URL}/work-schedules/${storeId}`;

      axios.get<WorkSchedule[]>(url)
        .then(response => {
          setData(response.data || []);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    } else {
      setData([]);
    }
  };

    // Calcular rango de fechas cuando cambie mes o año
  useEffect(() => {
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1);
    const lastDay = new Date(selectedYear, selectedMonth, 0); // Día 0 del siguiente mes = último día del mes actual

    const range: DateRange = {
      startDate: firstDay.toISOString().split('T')[0], // YYYY-MM-DD
      endDate: lastDay.toISOString().split('T')[0],
      month: selectedMonth,
      year: selectedYear
    };

    setDateRange(range);
  }, [selectedMonth, selectedYear]);

  return (
    <>
      <Card className="p-2">
        <CardContent>
          <form onSubmit={handleFetchData} className="flex items-center justify-around gap-4 ">
            {/* Selector de Mes y Año */}

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Año</label>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Mes</label>
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar mes" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Tienda</label>
              <Input value={storeId || ""} onChange={(e) => setStoreId(e.target.value)} placeholder="Ingrese ID de tienda" />
            </div>



            {/* Información del rango de fechas */}
            {dateRange && (
              <div className="bg-gray-50 p-3 rounded-lg items-center justify-center">
                <Label className="flex flex-col text-sm font-medium">
                  <p className="text-sm text-gray-600">
                    <span>Período seleccionado: </span>
                    ({new Date(selectedYear, selectedMonth, 0).getDate()} días)
                  </p>
                  <strong>{dateRange.startDate} al {dateRange.endDate}</strong>
                </Label>
              </div>
            )}

            <Button type="submit" disabled={!storeId} className="w-full md:w-auto">
              Consultar Programación
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Calendario de turnos */}
      {data.length > 0 && dateRange && (
        <Card>
          <CardHeader>
            <CardTitle>Calendario de Turnos - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}</CardTitle>
            <p className="text-sm text-gray-600">
              Se encontraron {data.length} turnos programados
            </p>
          </CardHeader>
          <CardContent>
            <CalendarView
              schedules={data}
              month={selectedMonth}
              year={selectedYear}
            />
          </CardContent>
        </Card>
      )}
    </>
  )
}
