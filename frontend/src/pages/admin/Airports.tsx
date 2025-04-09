import { useEffect, useState } from "react";
import { Airport } from "../../types";
import { addAirport, deleteAirport, getAllAirports, updateAirport } from "../../api/api";



const Airports = () => {
    const [airports, setAirports] = useState<Airport[]>([]);
    const [form, setForm] = useState<Omit<Airport, "airportId">>({ name: "", city: "", country: "",code: ""});
    const [editingId, setEditingId] = useState<string | null>(null);

    const loadAirports = async () => {
        const data = await getAllAirports();
        setAirports(data);
    };

    useEffect(() => {
        loadAirports();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateAirport(editingId, form);
            } else {
                await addAirport(form);
            }
            setForm({ name: "", city: "", country: "",code: ""});
            setEditingId(null);
            loadAirports();
        } catch (err) {
            alert("Failed to save airport.");
        }
    };

    const handleEdit = (airport: Airport) => {
        setForm({ name: airport.name, city: airport.city, country: airport.country, code: airport.code});
        setEditingId(airport.airportId);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this airport?")) {
            await deleteAirport(id);
            loadAirports();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-black text-2xl font-semibold mb-4">Airport Management</h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Airport Name"
                    required
                    className="text-gray-700 bg-gray-200 border p-2 rounded w-full"
                />
                <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                    required
                    className="text-gray-700 bg-gray-200 border p-2 rounded w-full"
                />
                <input
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="Country"
                    required
                    className="text-gray-700 bg-gray-200 border p-2 rounded w-full"
                />
                <input
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    placeholder="Code"
                    required
                    className="text-gray-700 bg-gray-200 border p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update" : "Add"} Airport
                </button>
            </form>

            <table className="text-gray-700 w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">City</th>
                        <th className="p-2 border">Country</th>
                        <th className="p-2 border">Code</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {airports.map((airport) => (
                        <tr key={airport.airportId} className="text-gray-700 bg-gray-100 text-center border-t">
                            <td className="p-2 border">{airport.name}</td>
                            <td className="p-2 border">{airport.city}</td>
                            <td className="p-2 border">{airport.code}</td>
                            <td className="p-2 border">{airport.country}</td>
                            <td className="p-2 border">
                                <button
                                    className="text-blue-600 mr-2"
                                    onClick={() => handleEdit(airport)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600"
                                    onClick={() => handleDelete(airport.airportId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Airports;
