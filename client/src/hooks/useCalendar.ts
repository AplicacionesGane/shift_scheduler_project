import { getCalendarByMonth } from "@/services/calendar.service";
import type { CalendarInterface, Shift } from "@/types/Interfaces";
import { useState } from "react";

export const useCalendar = () => {
  const [selectedYear, setYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [sucursal, setSucursal] = useState<string>("");

  const [shifts, setShifts] = useState<Shift[] | []> ([])

  const [data, setData] = useState<CalendarInterface[]>([]); // Adjust type as needed

  const handleChangeFun = (name: string, value: string) => {
    const setters = {
      year: (value: string) => setYear(value ? parseInt(value) : null),
      month: (value: string) => setSelectedMonth(value ? parseInt(value) : null),
      sucursal: (value: string) => setSucursal(value)
    };

    setters[name as keyof typeof setters]?.(value);
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      const response = await getCalendarByMonth(selectedYear!, selectedMonth!);
      setData(response);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }

  }


 return {
    selectedYear,
    selectedMonth,
    sucursal,
    shifts,
    data,
    setShifts,
    handleChangeFun,
    handleSubmit
 }

};
