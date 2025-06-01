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

    axios.get(`${API_SERVER_URL}/work-schedules/${sucursal}/${year}/${month}`)
      .then(response => {
        console.log("Datos obtenidos:", response.data);
        // Aquí puedes manejar los datos obtenidos
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  };


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
    </section>
  )
}