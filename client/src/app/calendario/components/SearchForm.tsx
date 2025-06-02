import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

interface SearchFormProps {
  year: number | null;
  month: number | null;
  sucursal: string;
  handleYearOrMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSucursalChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchForm = ({ handleYearOrMonthChange, month, onSucursalChange, sucursal, year }: SearchFormProps) => {
  useEffect(() => {

  }, [])

  return (
    <Card className="px-4">
      <form className="flex items-center" >
        <Label>Año</Label>

        <Label>Mes</Label>

        <Input
          className='w-52'
          value={sucursal}
          onChange={(e) => onSucursalChange(e)}
        />
        <Button type="submit" className="ml-2">
          Buscar
        </Button>
      </form>
    </Card>
  );
}