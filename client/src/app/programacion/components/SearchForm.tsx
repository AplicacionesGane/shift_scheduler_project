import { memo } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFormProps {
  year: number;
  month: number;
  sucursal: string;
  loading: boolean;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onSucursalChange: (sucursal: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const currentYear = new Date().getFullYear();

const availableYears = [
  { value: currentYear - 1, label: (currentYear - 1).toString() },
  { value: currentYear, label: currentYear.toString() },
  { value: currentYear + 1, label: (currentYear + 1).toString() }
];

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

export const SearchForm = memo(({
  year,
  month,
  sucursal,
  loading,
  onYearChange,
  onMonthChange,
  onSucursalChange,
  onSubmit
}: SearchFormProps) => {
  return (
    <Card className="px-4">
      <form className="flex items-center gap-2" onSubmit={onSubmit}>
        <Label>Año</Label>
        <Select value={year.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
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

        <Label>Mes</Label>
        <Select value={month.toString()} onValueChange={(value) => onMonthChange(parseInt(value))}>
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
        <Input 
          className='w-52' 
          value={sucursal} 
          onChange={(e) => onSucursalChange(e.target.value)}
          disabled={loading}
        />

        <Button type="submit" className="ml-2" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </form>
    </Card>
  );
});

SearchForm.displayName = 'SearchForm';

export { months };
