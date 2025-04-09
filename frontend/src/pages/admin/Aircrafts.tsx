import { useEffect, useState } from "react";
import { Aircraft } from "../../types";
import {
    addAircraft,
    deleteAircraft,
    getAllAircraft,
    updateAircraft,
} from "../../api/api";

const Aircrafts = () => {
    const [aircraftList, setAircraftList] = useState<Aircraft[]>([]);
    const [newAircraft, setNewAircraft] = useState({ model: "", capacity: 0 });
    const [editingAircraftId, setEditingAircraftId] = useState<string | null>(null);
    const [isCustomModel, setIsCustomModel] = useState(false);


    const fetchAircraft = async () => {
        const data = await getAllAircraft();
        setAircraftList(data);
    };

    useEffect(() => {
        fetchAircraft();
    }, []);

    const handleAdd = async () => {
        await addAircraft(newAircraft);
        setNewAircraft({ model: "", capacity: 0 });
        fetchAircraft();
    };

    const handleUpdate = async (id: string) => {
        await updateAircraft(id, newAircraft);
        setEditingAircraftId(null);
        setNewAircraft({ model: "", capacity: 0 });
        fetchAircraft();
    };

    const handleDelete = async (id: string) => {
        await deleteAircraft(id);
        fetchAircraft();
    };

    const handleModelSelect = (model: string) => {
        const selected = aircraftList.find((a) => a.model === model);
        setNewAircraft({
            model,
            capacity: selected ? selected.capacity : 0,
        });
    };

    const uniqueModels = Array.from(new Set(aircraftList.map((a) => a.model)));

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Aircraft Management</h2>

            <div className="mb-6 space-y-2">
                    <select
                        className="bg-gray-200 border p-2 w-full text-gray-700"
                        value={isCustomModel ? "__custom__" : newAircraft.model}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "__custom__") {
                                setIsCustomModel(true);
                                setNewAircraft({ ...newAircraft, model: "" });
                            } else {
                                setNewAircraft({ ...newAircraft, model: value });
                                setIsCustomModel(false);
                            }
                        }}
                    >
                        <option value="">Select Aircraft Model</option>
                        {uniqueModels.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                        <option value="__custom__">➕ Add new model...</option>
                    </select>

                    {isCustomModel && (
                        <input
                            type="text"
                            placeholder="Enter New Model"
                            className="mt-2 bg-gray-200 border p-2 w-full text-gray-700"
                            value={newAircraft.model}
                            onChange={(e) => setNewAircraft({ ...newAircraft, model: e.target.value })}
                        />
                    )}


                <input
                    type="number"
                    placeholder="Capacity"
                    className="text-gray-700 bg-gray-100 border p-2 w-64"
                    value={newAircraft.capacity.toString()}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) {
                            setNewAircraft({ ...newAircraft, capacity: Number(val) });
                        }
                    }}
                />

                {editingAircraftId ? (
                    <button
                        onClick={() => handleUpdate(editingAircraftId)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                    >
                        Update Aircraft
                    </button>
                ) : (
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                    >
                        Add Aircraft
                    </button>
                )}
            </div>

            <table className="table-auto w-full border mt-4">
                <thead>
                    <tr className="text-gray-700 bg-gray-200">
                        <th className="border px-4 py-2">Model</th>
                        <th className="border px-4 py-2">Capacity</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {aircraftList.map((aircraft) => (
                        <tr
                            key={aircraft.aircraftId}
                            className="text-gray-700 bg-gray-100 text-center border-t"
                        >
                            <td className="border px-4 py-2">{aircraft.model}</td>
                            <td className="border px-4 py-2">{aircraft.capacity}</td>
                            <td className="border px-4 py-2 space-x-2">
                                <button
                                    onClick={() => {
                                        setNewAircraft({
                                            model: aircraft.model,
                                            capacity: aircraft.capacity,
                                        });
                                        setEditingAircraftId(aircraft.aircraftId);
                                    }}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(aircraft.aircraftId)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
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

export default Aircrafts;
