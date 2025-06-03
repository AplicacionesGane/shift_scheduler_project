import type { Vendedora } from "@/types/Interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { memo } from 'react';

interface VendedoraSearchStepProps {
  vendedora?: Vendedora;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const VendedoraSearchStep = memo(({ vendedora, onSubmit }: VendedoraSearchStepProps) => {
  return (
    <Card className="grid grid-cols-4 gap-8">
      {/* Form Section */}
      <div className="space-y-4 col-span-1 px-8 py-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Step 3</h1>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex gap-2">
            <Users />
            <span>Buscar Vendedora - Asignación Horario Punto de Venta</span>
          </h3>
          <p className="text-sm text-gray-600">
            Ingresa el documento de identidad de la vendedora para confirmar asignación
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              🔍 N° Documento Vendedora
            </Label>
            <Input 
              type="text" 
              name="documento" 
              placeholder="Ej: 1118***** | 31525****" 
            />
          </div>
          <Button type="submit" variant="blue">
            Buscar Vendedora
          </Button>
        </form>
      </div>

      {/* Results Section */}
      <div className="col-span-3 border-l border-gray-200 pl-8 py-6">
        {vendedora ? <VendedoraDetails vendedora={vendedora} /> : <EmptyVendedoraState />}
      </div>
    </Card>
  );
});

const VendedoraDetails = memo(({ vendedora }: { vendedora: Vendedora }) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-green-100 rounded-full">
        <span className="text-green-600 text-2xl">✅</span>
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900">Vendedora Encontrada</h4>
        <p className="text-sm text-gray-600">Información completa de la vendedora</p>
      </div>
    </div>

    {/* Main Info */}
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">👤</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-2xl">{vendedora.nombres}</p>
            <p className="text-sm text-purple-600 font-medium">Nombre completo</p>
          </div>
        </div>
      </div>
    </div>

    {/* Position Info */}
    <InfoCard
      title="💼 Información del Cargo"
      bgColor="blue"
      content={
        <div className="flex items-start gap-3">
          <span className="text-blue-600 mt-1 text-lg">🏷️</span>
          <div>
            <p className="font-medium text-gray-900 text-lg">{vendedora.nameCargo}</p>
            <p className="text-sm text-blue-600">Cargo asignado</p>
          </div>
        </div>
      }
    />

    {/* Identification */}
    <InfoCard
      title="🆔 Identificación"
      bgColor="gray"
      content={
        <div className="text-center bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-600 mb-2">Documento de Identidad</p>
          <p className="font-bold text-purple-600 text-3xl">{vendedora.documento}</p>
        </div>
      }
    />
  </div>
));

const InfoCard = memo(({ title, bgColor, content }: {
  title: string;
  bgColor: string;
  content: React.ReactNode;
}) => (
  <div className={`bg-${bgColor}-50 rounded-lg p-4 border border-${bgColor}-200`}>
    <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span className={`text-${bgColor}-600`}>{title.split(' ')[0]}</span>
      {title.split(' ').slice(1).join(' ')}
    </h5>
    <div className="grid grid-cols-1 gap-4">
      {content}
    </div>
  </div>
));

const EmptyVendedoraState = memo(() => (
  <div className="flex items-center justify-center h-full text-gray-400">
    <div className="text-center">
      <div className="text-6xl mb-4">👤</div>
      <p className="text-lg">Busca una vendedora por documento</p>
      <p className="text-sm">Ingresa el número de documento para ver los detalles</p>
    </div>
  </div>
));

VendedoraSearchStep.displayName = 'VendedoraSearchStep';
VendedoraDetails.displayName = 'VendedoraDetails';
InfoCard.displayName = 'InfoCard';
EmptyVendedoraState.displayName = 'EmptyVendedoraState';
