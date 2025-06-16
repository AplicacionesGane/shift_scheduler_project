export interface DayCalendar {
  id: string
  days: number
  nameDay: string
  month: number
  nameMonth: string
  year: number
  isHoliday: false
  isWeekend: false
  holidayDescription: string | null
  updatedAt: string
  createdAt: string
}

export interface MonthData {
  years: number[];
  months: {
    number: number;
    name: string
  }[]
}

export interface WorkSchedule {
  id: string
  year: number
  month: number
  day: number
  shiftId: string
  employee: string
  status: string
  storeId: string
  updatedAt: string
  createdAt: string
}

export interface Shift {
  id: string
  nameTurno: string
  description: string
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
}
