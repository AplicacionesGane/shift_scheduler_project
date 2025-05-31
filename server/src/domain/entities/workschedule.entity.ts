export interface WorkSchedule {
  id?: string;
  employeeDocument: string;    // FK a Employee
  shiftId: string;            // FK a Shift  
  storeId: string;            // FK a Store
  assignedDate: string;       // YYYY-MM-DD
  status: 'assigned' | 'completed' | 'absent';
  createdAt?: Date;
  updatedAt?: Date;
}
