import { StoreModel } from '@infrastructure/persistence/models/store.model';
import { StoreRepository } from '@domain/repositories/store.repository';
import { StoreEntity } from '@domain/entities/store.entity';

export class MysqlStoreRepository implements StoreRepository {

    findAll = async (): Promise<StoreEntity[] | null> => {
        try {
            await StoreModel.sync();
            const stores = await StoreModel.findAll();

            if (!stores) return null;

            const mapStores: StoreEntity[] = stores.map((store) => {
                return {
                zona: store.dataValues.ZONA,
                empresa: store.dataValues.CCOSTO,
                sucursal: store.dataValues.CODIGO,
                ccosto: store.dataValues.CCOSTO,
                codigo: store.dataValues.CODIGO,
                nombre: store.dataValues.NOMBRE,
                direccion: store.dataValues.DIRECCION,
                tipo: store.dataValues.TIPO,
                dispositivo: store.dataValues.DISPOSITIVO,
                supervisor: store.dataValues.SUPERVISOR,
                canal: store.dataValues.CANAL,
                categoria: store.dataValues.CATEGORIA,
                horaEntrada: store.dataValues.HORA_ENTRADA,
                horaSalida: store.dataValues.HORA_SALIDA,
                horaEntradaFes: store.dataValues.HORA_ENTRADA_FES,
                horaSalidaFes: store.dataValues.HORA_SALIDA_FES,
                subzona: store.dataValues.SUBZONA,
                celula: store.dataValues.CELULA,
                horasOrdinarias: store.dataValues.HORAS_ORDINARIAS,
                horasFestivas: store.dataValues.HORAS_FESTIVAS,
                estado: store.dataValues.ESTADO
                }
            })

            return mapStores;
 
        }
        catch (error) {
            console.error('Error fetching stores:', error);
            return null;
        }
    }
}