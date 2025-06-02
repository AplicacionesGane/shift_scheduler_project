import { type ResponseDataCalendar, type ResDataByYears } from "@/types/Interfaces";
import { API_SERVER_URL } from "@/utils/constants";
import axios from "axios";

export default async function getYearsAndMonths() {
  try {
    const response = await axios.get<ResDataByYears>(`${API_SERVER_URL}/calendar/years-months`);
    return response.data
  } catch (error) {
    console.error("Error fetching years and months:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}

// calendar/year/2025/month/6
export async function getCalendarByMonth(year: number, month: number) {
  try {
    const response = await axios.get<ResponseDataCalendar>(`${API_SERVER_URL}/calendar/year/${year}/month/${month}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching calendar by month:", error);
    throw error;
  }
}