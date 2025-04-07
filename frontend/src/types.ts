export type Flight = {
  flightId: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  originAirportId: string;
  originAirportName: string;
  destinationAirportName:string;
  destinationAirportId: string;
  aircraftId: string;
  price: number;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

export interface FlightRequest {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  originAirportId: string;
  destinationAirportId: string;
  aircraftId: string;
  price: number;
}
