import { useState, useEffect } from "react";
import { FlightRequest } from "../../../types";

interface Props {
    initialData?: FlightRequest;
    onSubmit: (data: FlightRequest) => void;
    isEdit?: boolean;
}

const FlightForm = ({ initialData, onSubmit, isEdit = false }: Props) => {
    const [formData, setFormData] = useState<FlightRequest>({
        flightNumber: "",
        departureTime: "",
        arrivalTime: "",
        originAirportId: "",
        destinationAirportId: "",
        aircraftId: "",
        price: 0,
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <input name="flightNumber" placeholder="Flight Number" value={formData.flightNumber} onChange={handleChange} className="bg-gray-200 text-gray-700 w-full border px-3 py-2 rounded" required  />
            <input name="departureTime" type="datetime-local" value={formData.departureTime} onChange={handleChange} className="bg-gray-200 text-gray-700 w-full border px-3 py-2 rounded" required />
            <input name="arrivalTime" type="datetime-local" value={formData.arrivalTime} onChange={handleChange} className="bg-gray-200 text-gray-700 w-full border px-3 py-2 rounded" required />
            <input name="originAirportId" placeholder="Origin Airport ID" value={formData.originAirportId} onChange={handleChange} className="bg-gray-200 text-gray-700 w-full border px-3 py-2 rounded" required />
            <input name="destinationAirportId" placeholder="Destination Airport ID" value={formData.destinationAirportId} onChange={handleChange} className="bg-gray-200 text-gray-700 w-full border px-3 py-2 rounded" required />
            <input name="aircraftId" placeholder="Aircraft ID" value={formData.aircraftId} onChange={handleChange} className="bg-gray-200 text-gray-700 w-full border px-3 py-2 rounded" required />
            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="bg-gray-200 text-gray-700 w-full border px-3 py-2 rounded" required />
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {isEdit ? "Update Flight" : "Add Flight"}
                </button>
            </div>
        </form>
    );
};

export default FlightForm;
