export type Flight = {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  originAirportId: string;
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
