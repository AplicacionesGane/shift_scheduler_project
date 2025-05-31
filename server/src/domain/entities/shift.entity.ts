export interface Shift {
  id?: string;
  startTime: string; // Formato HH:MM
  endTime: string;   // Formato HH:MM
  date: string; // Formato YYYY-MM-DD
  nameTurno: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
