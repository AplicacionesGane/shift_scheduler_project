export interface WorkSchedule {
  id?: string;
  employee: string;           // FK a Employee
  shiftId: string;            // FK a Shift  
  storeId: string;            // FK a Store
  year: number;
  month: number;              
  day: number;
  status: 'assigned' | 'completed' | 'absent';
  createdAt?: Date;
  updatedAt?: Date;
}
