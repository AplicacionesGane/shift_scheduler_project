import { StoreModel } from '@infrastructure/persistence/models/store.model';
import { StoreRepository } from '@domain/repositories/store.repository';
import { StoreEntity } from '@domain/entities/store.entity';

export class MysqlStoreRepository implements StoreRepository {
  findAllStores = async (): Promise<StoreEntity[] | []> => {
    try {
      await StoreModel.sync(); // Ensure the table is synchronized
      const stores = await StoreModel.findAll();

      if (!stores || stores.length === 0) return []; // If no stores, return an empty array

      // Map the Sequelize model to our StoreEntity
      const storeEntities: StoreEntity[] = stores.map(store => ({
        empresa: store.dataValues.ZONA,
        sucursal: store.dataValues.CODIGO,
        nombre: store.dataValues.NOMBRE,
        direccion: store.dataValues.DIRECCION,
        estado: store.dataValues.ESTADO,
        categoria: store.dataValues.CATEGORIA,
        celula: store.dataValues.CELULA,
        horaEntrada: store.dataValues.HORA_ENTRADA,
        horaSalida: store.dataValues.HORA_SALIDA,
        horaEntradaFest: store.dataValues.HORA_ENTRADA_FES,
        horaSalidaFest: store.dataValues.HORA_SALIDA_FES,
        region: store.dataValues.SUBZONA
      }));

      return storeEntities;
    } catch (error) {
      console.error('Error fetching all stores:', error);
      return [];
    }
  }

  findStoreById = async (id: string): Promise<StoreEntity | null> => {
    try {
      await StoreModel.sync();
      const store = await StoreModel.findByPk(id);
      if (!store) return null;

      return {
        empresa: store.dataValues.ZONA,
        sucursal: store.dataValues.CODIGO,
        nombre: store.dataValues.NOMBRE,
        direccion: store.dataValues.DIRECCION,
        estado: store.dataValues.ESTADO,
        categoria: store.dataValues.CATEGORIA,
        celula: store.dataValues.CELULA,
        horaEntrada: store.dataValues.HORA_ENTRADA,
        horaSalida: store.dataValues.HORA_SALIDA,
        horaEntradaFest: store.dataValues.HORA_ENTRADA_FES,
        horaSalidaFest: store.dataValues.HORA_SALIDA_FES,
        region: store.dataValues.SUBZONA
      };
    } catch (error) {
      console.error('Error fetching store by ID:', error);
      return null;
    }
  }

  findStoresByCompany = async (company: string): Promise<StoreEntity[] | []> => {
    try {
      await StoreModel.sync();
      const stores = await StoreModel.findAll({ where: { ZONA: company } });

      if (!stores || stores.length === 0) return [];

      const storeEntities: StoreEntity[] = stores.map(store => ({
        empresa: store.dataValues.ZONA,
        sucursal: store.dataValues.CODIGO,
        nombre: store.dataValues.NOMBRE,
        direccion: store.dataValues.DIRECCION,
        estado: store.dataValues.ESTADO,
        categoria: store.dataValues.CATEGORIA,
        celula: store.dataValues.CELULA,
        horaEntrada: store.dataValues.HORA_ENTRADA,
        horaSalida: store.dataValues.HORA_SALIDA,
        horaEntradaFest: store.dataValues.HORA_ENTRADA_FES,
        horaSalidaFest: store.dataValues.HORA_SALIDA_FES,
        region: store.dataValues.SUBZONA
      }));
      
      return storeEntities;
    } catch (error) {
      console.error('Error fetching stores by company:', error);
      return [];
    }
  }

}