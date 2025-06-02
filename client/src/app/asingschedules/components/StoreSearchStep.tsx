import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import type { Store } from "@/types/Interfaces";

interface StoreSearchStepProps {
  id: string;
  store?: Store;
  onChangeId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const StoreSearchStep = memo(({ id, store, onChangeId, onSubmit }: StoreSearchStepProps) => {
  return (
    <Card className="grid grid-cols-4 gap-8">
      {/* Form Section */}
      <div className="space-y-4 col-span-1 px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Step 1</h1>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">🏪 Buscar Sucursal</h3>
          <p className="text-sm text-gray-600">
            Ingresa el ID para encontrar la información de la sucursal
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              🔍 Código de Sucursal
            </Label>
            <Input 
              type="text" 
              value={id} 
              placeholder="Ej: 39825, 41925 ... etc." 
              onChange={onChangeId} 
            />
          </div>
          <Button type="submit" variant="blue">
            Buscar Sucursal
          </Button>
        </form>
      </div>

      {/* Results Section */}
      <div className="col-span-3 border-l border-gray-200 pl-8 py-6">
        {store ? <StoreDetails store={store} /> : <EmptyStoreState />}
      </div>
    </Card>
  );
});

const StoreDetails = memo(({ store }: { store: Store }) => (
  <div className="space-y-4">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-green-100 rounded-full">
        <span className="text-green-600 text-2xl">✅</span>
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900">Sucursal Encontrada</h4>
        <p className="text-sm text-gray-600">Información completa de la sucursal</p>
      </div>
    </div>

    {/* Basic Info */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
      <div className="grid grid-cols-2 gap-6">
        <InfoItem icon="🏢" label="Nombre de la sucursal" value={store.nombre} color="blue" />
        <InfoItem icon="🏛️" label="Empresa" value={store.empresa} color="purple" />
      </div>
    </div>

    {/* Location */}
    <InfoSection
      title="📍 Ubicación y Datos Generales"
      bgColor="green"
      items={[
        { label: "Dirección", value: store.direccion },
        { label: "Estado", value: store.estado || "No disponible" },
        { label: "Región", value: store.region },
        { label: "Categoría", value: store.categoria }
      ]}
    />

    {/* Schedule */}
    <InfoSection
      title="🕐 Horarios de Operación"
      bgColor="amber"
      items={[
        { label: "Horario Regular", value: `${store.horaEntrada} - ${store.horaSalida}`, icon: "🟢" },
        { label: "Horario Festivo", value: `${store.horaEntradaFest} - ${store.horaSalidaFest}`, icon: "🎉" }
      ]}
    />

    {/* Identifiers */}
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-gray-600">🏷️</span>
        Identificadores
      </h5>
      <div className="grid grid-cols-2 gap-4">
        <IdCard label="ID Sucursal" value={store.sucursal} color="blue" />
        <IdCard label="Célula" value={store.celula} color="indigo" />
      </div>
    </div>
  </div>
));

const InfoItem = memo(({ icon, label, value, color }: {
  icon: string;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="flex items-start gap-3">
    <span className={`text-${color}-600 mt-1 text-xl`}>{icon}</span>
    <div>
      <p className="font-bold text-gray-900 text-lg">{value}</p>
      <p className={`text-sm text-${color}-600 font-medium`}>{label}</p>
    </div>
  </div>
));

const InfoSection = memo(({ title, bgColor, items }: {
  title: string;
  bgColor: string;
  items: Array<{ label: string; value: string; icon?: string }>;
}) => (
  <div className={`bg-${bgColor}-50 rounded-lg p-4 border border-${bgColor}-200`}>
    <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span className={`text-${bgColor}-600`}>{title.split(' ')[0]}</span>
      {title.split(' ').slice(1).join(' ')}
    </h5>
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          <p className={`text-sm font-medium text-${bgColor}-700`}>{item.label}</p>
          <div className="flex items-center gap-2">
            {item.icon && <span className="text-sm">{item.icon}</span>}
            <span className="font-medium text-gray-900">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
));

const IdCard = memo(({ label, value, color }: {
  label: string;
  value: string;
  color: string;
}) => (
  <div className="text-center bg-white rounded-lg p-3 border">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className={`font-bold text-${color}-600 text-2xl`}>{value}</p>
  </div>
));

const EmptyStoreState = memo(() => (
  <div className="flex items-center justify-center h-full text-gray-400">
    <div className="text-center">
      <div className="text-6xl mb-4">🔍</div>
      <p className="text-lg">Busca una sucursal para ver los detalles</p>
    </div>
  </div>
));

StoreSearchStep.displayName = 'StoreSearchStep';
StoreDetails.displayName = 'StoreDetails';
InfoItem.displayName = 'InfoItem';
InfoSection.displayName = 'InfoSection';
IdCard.displayName = 'IdCard';
EmptyStoreState.displayName = 'EmptyStoreState';
