import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import getYearsAndMonths from "@/services/calendar.service";
import { type ResDataByYears } from "@/types/Interfaces";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface SearchFormProps {
  funHandleChange: (name: string, value: string) => void;
  submitForm: (ev: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForm = ({ funHandleChange, submitForm }: SearchFormProps) => {
  const [data, setData] = useState<ResDataByYears | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getYearsAndMonths();
      setData(result);
    };
    fetchData();
  }, [])

  return (
    <Card className="px-4">
      <form className="flex items-center" onSubmit={submitForm}>
        <Label>Año</Label>

        <Select onValueChange={(value) => funHandleChange("year", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            {data?.years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label>Mes</Label>
        <Select onValueChange={(value) => funHandleChange("month", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            {data?.months.map((m) => (
              <SelectItem key={m.numero} value={m.numero.toString()}>
                {m.nameMonth}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label className="ml-4">Sucursal</Label>
        <Input
          type="text"
          placeholder="Nombre de la sucursal"
          className="w-[200px] ml-2"
          onChange={(e) => funHandleChange("sucursal", e.target.value)}
        />
        <Button type="submit" className="ml-2">
          Buscar
        </Button>
      </form>
    </Card>
  );
}