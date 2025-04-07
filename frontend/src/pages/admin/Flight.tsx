import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFlightById, getAllFlights } from "../../api/api";
import { Flight } from "../../types";



const Flights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const navigate = useNavigate();


    const fetchFlights = async () => {
        try {
            const data = await getAllFlights();
            setFlights(data);
        }
        catch (error) {
            console.error("Failed to fetch flights:", error);
        }
    }



    useEffect(() => {
        fetchFlights();
    }, []);

    const handleDelete = async (flightId: string) => {
        if (confirm("Are you want to delete this flight?")) {
            try {
                await deleteFlightById(flightId);
                setFlights((prev) => prev.filter((flight) => flight.flightId !== flightId));
            }
            catch (error) {
                console.error("Failed to delete flight:", error);
            }
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-2xl font-semibold">Flights Management</h2>
                <button onClick={() => navigate("/admin/flights/add")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Add Flight
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                            <th className="px-4 py-2">Flight Number</th>
                            <th className="px-4 py-2">Departure</th>
                            <th className="px-4 py-2">Arrival</th>
                            <th className="px-4 py-2">Departure Time</th>
                            <th className="px-4 py-2">Arrival Time</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight.flightId} className="text-gray-700 border-t text-sm">
                                <td className="px-3 py-1">{flight.flightNumber}</td>
                                <td className="px-3 py-1">{flight.originAirportName}</td>
                                <td className="px-3 py-1">{flight.destinationAirportName}</td>
                                <td className="px-3 py-1">{new Date(flight.departureTime).toLocaleString()}</td>
                                <td className="px-3 py-1">{new Date(flight.arrivalTime).toLocaleString()}</td>
                                <td className="px-3 py-1 space-x-2 space-y-1">
                                    <button onClick={() => navigate(`/admin/flights/edit/${flight.flightId}`)} className="text-blue-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(flight.flightId)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Flights;
