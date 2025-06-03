export interface Shift {
  id?: string;
  startTime: string; // Formato HH:MM
  endTime: string;   // Formato HH:MM
  nameTurno: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
