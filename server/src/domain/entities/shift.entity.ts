export interface Shift {
  id?: string;
  startTime: string; // Formato HH:MM
  endTime: string;   // Formato HH:MM
  idStore: string | null;
  date: string; // Formato YYYY-MM-DD
  createdAt?: Date;
  updatedAt?: Date;
}
