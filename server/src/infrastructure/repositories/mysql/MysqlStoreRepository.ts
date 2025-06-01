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
          empresa: store.dataValues.CCOSTO,
          sucursal: store.dataValues.CODIGO,
          nombre: store.dataValues.NOMBRE,
          direccion: store.dataValues.DIRECCION,
          estado: store.dataValues.ESTADO
        }
      })

      return mapStores;

    } catch (error) {
      console.error('Error fetching stores:', error);
      return null;
    }
  }

  findById = async (id: string): Promise<StoreEntity | null> => {
    try {
      await StoreModel.sync();
      const store = await StoreModel.findByPk(id);

      if (!store) return null;

      return {
        empresa: store.dataValues.CCOSTO,
        sucursal: store.dataValues.CODIGO,
        nombre: store.dataValues.NOMBRE,
        direccion: store.dataValues.DIRECCION,
        estado: store.dataValues.ESTADO
      };
    } catch (error) {
      console.error('Error fetching store by ID:', error);
      return null;
    }
  }

}