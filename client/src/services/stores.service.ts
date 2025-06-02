import type { Store } from "@/types/Interfaces";
import { API_SERVER_URL } from "@/utils/constants";
import axios from "axios";

export const searchStores = async (id: string): Promise<Store> => {

  try {
    const response = await axios.get<Store>(`${API_SERVER_URL}/stores/${id}`);
    if(response.status !== 200) {
      throw new Error(`Error fetching stores: ${response.statusText}`);
    }

    const mapStore: Store = {
      empresa: response.data.empresa === "39627" ? "Multired" : "Servired",
      direccion: response.data.direccion,
      estado: response.data.estado !== null ? "Desconocido" : response.data.estado === "A" ? "Activo" : "Inactivo",
      nombre: response.data.nombre,
      sucursal: response.data.sucursal
    }

    return mapStore;
  } catch (error) {
    console.error(error);
    throw new Error("Error al cargar las sucursales");
  }
}