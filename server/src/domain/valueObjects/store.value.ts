import type { StoreEntity } from '@domain/entities/store.entity';

export class StoreValue implements StoreEntity {
    readonly empresa: string;
    readonly ccosto: string;
    readonly sucursal: string;
    readonly nombre: string;
    readonly direccion: string;
    readonly tipo: string;
    readonly dispositivo: string;
    readonly supervisor: string;
    readonly canal: string;
    readonly categoria: string;
    readonly horaEntrada: string | null;
    readonly horaSalida: string | null;
    readonly horaEntradaFes: string | null;
    readonly horaSalidaFes: string | null;
    readonly subzona: string | null;
    readonly celula: string | null;
    readonly horasOrdinarias: number | null;
    readonly horasFestivas: number | null;
    readonly estado: string | null;

    constructor(store: StoreEntity) {
        this.empresa = store.empresa;
        this.ccosto = store.ccosto;
        this.sucursal = store.sucursal;
        this.nombre = store.nombre;
        this.direccion = store.direccion;
        this.tipo = store.tipo;
        this.dispositivo = store.dispositivo;
        this.supervisor = store.supervisor;
        this.canal = store.canal;
        this.categoria = store.categoria;
        this.horaEntrada = store.horaEntrada;
        this.horaSalida = store.horaSalida;
        this.horaEntradaFes = store.horaEntradaFes;
        this.horaSalidaFes = store.horaSalidaFes;
        this.subzona = store.subzona;
        this.celula = store.celula;
        this.horasOrdinarias = store.horasOrdinarias;
        this.horasFestivas = store.horasFestivas;
        this.estado = store.estado;
    }
}