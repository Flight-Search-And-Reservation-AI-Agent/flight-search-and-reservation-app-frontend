import axios from "axios";
import { AuthResponse, Flight } from "../types";

const API_BASE_URL = "http://localhost:8080/api/v1";
const USER_BASE_URL = "http://localhost:8080/api";

/**
 * Converts input datetime string (e.g. "2025-04-06T10:00") to ISO 8601 without Z
 * Ensures compatibility with Spring Boot's LocalDateTime parsing
 */
const toISOLocalDateTime = (datetime: string): string => {
  const date = new Date(datetime);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"
};

export const searchFlights = async (
  origin: string,
  destination: string,
  departureDate: string // Expected format: "2025-04-06T10:00"
): Promise<Flight[]> => {
  const formattedDate = toISOLocalDateTime(departureDate);
  const url = `${API_BASE_URL}/flights/search?origin=${origin}&destination=${destination}&departureDate=${formattedDate}`;
  
  const response = await axios.get<Flight[]>(url);
  return response.data;
};


export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${USER_BASE_URL}/auth/register`, userData);
  
  return response.data;
};

export const loginUser = async (credentials: {
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${USER_BASE_URL}/auth/login`,
    credentials,{
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
};
