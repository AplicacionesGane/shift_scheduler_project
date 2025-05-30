export interface StoreEntity {
    empresa: string;
    ccosto: string;
    sucursal: string;
    nombre: string;
    direccion: string;
    tipo: string;
    dispositivo: string;
    supervisor: string;
    canal: string;
    categoria: string;
    horaEntrada: string | null;
    horaSalida: string | null;
    horaEntradaFes: string | null;
    horaSalidaFes: string | null;
    subzona: string | null;
    celula: string | null;
    horasOrdinarias: number | null;
    horasFestivas: number | null;
    estado: string | null;
}