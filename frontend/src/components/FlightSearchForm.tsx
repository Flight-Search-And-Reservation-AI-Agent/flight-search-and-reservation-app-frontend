import  { useState } from "react";
import { searchFlights } from "../api/api";
import { Flight } from "../types";

export default function FlightSearchForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const results = await searchFlights(origin, destination, departureDate);
      setFlights(results);
    } catch (err: any) {
      setError("Failed to fetch flights. Please try again.");
      console.error(err);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-gray-600 text-2xl font-bold mb-4">Search Flights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Origin (e.g. DEL)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="text-white bg-gray-600 p-3 border border-gray-300 rounded-xl"
        />
        <input
          type="text"
          placeholder="Destination (e.g. BOM)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="text-white bg-gray-600 p-3 border border-gray-300 rounded-xl"
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="text-white bg-gray-600 p-3 border border-gray-300 rounded-xl"
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-gray-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && (
        <div className="text-red-600 font-medium mt-4">
          {error}
        </div>
      )}

      {flights.length > 0 && (
        <div className="mt-6 space-y-4">
          {flights.map((flight, index) => (
            <div key={index} className="text-black p-4 border rounded-xl shadow-sm bg-gray-50">
              <h3 className="font-semibold text-lg">
                Flight: {flight.flightNumber}
              </h3>
              <p>
                From <strong>{flight.originAirportId}</strong> to{" "}
                <strong>{flight.destinationAirportId}</strong>
              </p>
              <p>
                Departure: {new Date(flight.departureTime).toLocaleString()} <br />
                Arrival: {new Date(flight.arrivalTime).toLocaleString()}
              </p>
              <p>Aircraft ID: {flight.aircraftId}</p>
              <p>Price: ₹{flight.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
