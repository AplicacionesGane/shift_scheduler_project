import type { StoreEntity } from '@domain/entities/store.entity';

export class StoreValue implements StoreEntity {
  readonly empresa: string;
  readonly sucursal: string;
  readonly nombre: string;
  readonly direccion: string;
  readonly estado: string | null;
  readonly region: string;
  readonly celula: string;
  readonly horaEntrada: string;
  readonly horaSalida: string;
  readonly categoria: string;
  readonly horaEntradaFest: string;
  readonly horaSalidaFest: string;

  constructor(store: StoreEntity) {
    this.empresa = store.empresa;
    this.sucursal = store.sucursal;
    this.nombre = store.nombre;
    this.direccion = store.direccion;
    this.estado = store.estado;
    this.categoria = store.categoria;
    this.region = store.region;
    this.celula = store.celula;
    this.horaEntrada = store.horaEntrada;
    this.horaSalida = store.horaSalida;
    this.horaEntradaFest = store.horaEntradaFest;
    this.horaSalidaFest = store.horaSalidaFest;
  }

}