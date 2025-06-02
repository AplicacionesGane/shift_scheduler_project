import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStores } from "@/hooks/useStores";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function AsingSchedules() {
  const [id, setId] = useState<string>("");
  const { getStores, store } = useStores(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getStores(id);
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Card className="grid grid-cols-4 gap-8 min-h-[400px]">
        <div className="space-y-4 col-span-1 px-8 py-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🏪 Buscar Sucursal</h3>
            <p className="text-sm text-gray-600">Ingresa el ID para encontrar la información de la sucursal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                🔍 Código de Sucursal
              </Label>
              <Input type="text" value={id} placeholder="Ej: 39825, 41925 ... etc." onChange={handleChange} />
            </div>
            <Button type="submit" variant='blue'>
              Buscar Sucursal
            </Button>
          </form>
        </div>

        {/* Resultados - Lado Derecho */}
        <div className="col-span-3 border-l border-gray-200 pl-8">
          {store ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-xl">✅</span>
                <h4 className="text-lg font-semibold text-gray-900">Sucursal Encontrada</h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1 text-lg">🏢</span>
                  <div>
                    <p className="font-medium text-gray-900 text-lg">{store.nombre}</p>
                    <p className="text-sm text-gray-600">Nombre de la sucursal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1 text-lg">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">{store.direccion}</p>
                    <p className="text-sm text-gray-600">Dirección</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1 text-lg">🌍</span>
                  <div>
                    <p className="font-medium text-gray-900">{store.estado || "Estado no disponible"}</p>
                    <p className="text-sm text-gray-600">Estado/Región</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">ID Sucursal</p>
                    <p className="font-bold text-blue-600 text-xl">{store.sucursal}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Empresa</p>
                    <p className="font-bold text-gray-900 text-xl">{store.empresa}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg">Busca una sucursal para ver los detalles</p>
              </div>
            </div>
          )}
        </div>

      </Card>

      <Card className="px-4">
        step 2
      </Card>
      <Card className="px-4">
        step 3
      </Card>
    </div>
  );
}