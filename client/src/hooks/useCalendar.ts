import type { Shift } from "@/types/Interfaces";
import { useState } from "react";

export const useCalendar = () => {
  const [selectedYear, setYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [sucursal, setSucursal] = useState<string>("");

  const [shifts, setShifts] = useState<Shift[] | []> ([])


  const handleYearOrMonthChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = ev.target;

    console.log(`Handling change for ${name} with value: ${value}`);

    if (name === "year") {
      setYear(value ? parseInt(value) : null);
    } else if (name === "month") {
      setSelectedMonth(value ? parseInt(value) : null);
    } else if (name === "sucursal") {
      setSucursal(value);
    }
  }

  const handleSucursalChange = (ev: React.ChangeEvent<HTMLInputElement>) => {

  console.log("Handling sucursal change:", ev.target.value);

    setSucursal(ev.target.value);
  };


 return {
    selectedYear,
    selectedMonth,
    sucursal,
    shifts,
    setShifts,
    handleYearOrMonthChange,
    handleSucursalChange
 }

};
