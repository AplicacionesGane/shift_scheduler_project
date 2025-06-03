import type { Shift, Store, Vendedora } from "@/types/Interfaces";
import { API_SERVER_URL } from "@/utils/constants";
import axios from "axios";

export const searchStoreById = async (id: string): Promise<Store> => {

  try {
    const response = await axios.get<Store>(`${API_SERVER_URL}/stores/${id}`);
    if (response.status !== 200) {
      throw new Error(`Error fetching stores: ${response.statusText}`);
    }

    const mapStore: Store = {
      empresa: response.data.empresa === "39627" ? "Multired" : "Servired",
      direccion: response.data.direccion,
      estado: response.data.estado === null ? "Desconocido" : response.data.estado === "A" ? "Activo" : "Inactivo",
      nombre: response.data.nombre,
      sucursal: response.data.sucursal,
      categoria: response.data.categoria,
      celula: response.data.celula,
      horaEntrada: response.data.horaEntrada,
      horaSalida: response.data.horaSalida,
      horaEntradaFest: response.data.horaEntradaFest,
      horaSalidaFest: response.data.horaSalidaFest,
      region: response.data.region
    }

    return mapStore;
  } catch (error) {
    console.error(error);
    throw new Error("Error al cargar las sucursales");
  }
}

export const getAllShifts = async (): Promise<Shift[]> => {
  try {
    const response = await axios.get<Shift[]>(`${API_SERVER_URL}/shifts`);
    if (response.status !== 200) {
      throw new Error(`Error fetching shifts: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al cargar los turnos");
  }
}

export const getVendedoraByDocument = async (document: string): Promise<Vendedora> => {
  try {
    const response = await axios.get<Vendedora>(`${API_SERVER_URL}/employees/${document}`);
    if (response.status !== 200) {
      throw new Error(`Error fetching vendedora: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al cargar la vendedora");
  }
}