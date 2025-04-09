import axios from "axios";
import { Aircraft, Airport, AuthResponse, Flight, FlightRequest, Reservation, ReservationRequest } from "../types";

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
  return response.data;
};

// ✈️ Flights

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

export const getAllFlights = async (): Promise<Flight[]> => {
  const response = await axios.get<Flight[]>(`${API_BASE_URL}/flights`);
  return response.data;
};

export const deleteFlightById = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/flights/${id}`);
};

export const createFlight = async (flight: FlightRequest): Promise<void> => {
  await axios.post(`${API_BASE_URL}/flights/add`, flight);
};

export const updateFlightById = async (
  id: string,
  flight: FlightRequest
): Promise<void> => {
  await axios.put(`${API_BASE_URL}/flights/${id}`, flight);
};

export const getFlightById = async (id: string): Promise<FlightRequest> => {
  const response = await axios.get<FlightRequest>(`${API_BASE_URL}/flights/${id}`);
  return response.data;
};

// 🛬 Airports
export const getAllAirports = async (): Promise<Airport[]> => {
  const response = await axios.get<Airport[]>(`${API_BASE_URL}/airports`);
  return response.data;
};

export const addAirport = async (airport: {
  name: string;
  city: string;
  country: string;
  code: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/airports`, airport);
  return response.data;
};

export const updateAirport = async (
  id: string,
  airport: { name: string; city: string; country: string; code: string }
) => {
  const response = await axios.put(`${API_BASE_URL}/airports/${id}`, airport);
  return response.data;
};

export const deleteAirport = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/airports/${id}`);
  return response.data;
};

// ✈️ Aircraft
export const getAllAircraft = async (): Promise<Aircraft[]> => {
  const response = await axios.get<Aircraft[]>(`${API_BASE_URL}/aircrafts`);
  return response.data;
};

export const addAircraft = async (aircraft: {
  model: string;
  capacity: number;
}) => {
  const response = await axios.post(`${API_BASE_URL}/aircrafts`, aircraft);
  return response.data;
};

export const updateAircraft = async (
  id: string,
  aircraft: { model: string; capacity: number }
) => {
  const response = await axios.put(`${API_BASE_URL}/aircrafts/${id}`, aircraft);
  return response.data;
};

export const deleteAircraft = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/aircrafts/${id}`);
  return response.data;
};


// Reservations
export const getAllReservations = async (): Promise<Reservation[]> => {
  const res = await axios.get<Reservation[]>(`${API_BASE_URL}/reservations`);
  return res.data;
};

export const createReservation = async (data: ReservationRequest): Promise<Reservation> => {
  const res = await axios.post<Reservation>(`${API_BASE_URL}/reservations`, data);
  return res.data;
};

export const updateReservation = async (
  id: string,
  data: ReservationRequest
): Promise<Reservation> => {
  const res = await axios.put<Reservation>(`${API_BASE_URL}/reservations/${id}`, data);
  return res.data;
};

export const cancelReservation = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/reservations/${id}`);
};
