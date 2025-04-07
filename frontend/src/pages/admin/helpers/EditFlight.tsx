import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FlightRequest } from "../../../types";
import { getFlightById, updateFlightById } from "../../../api/api";
import FlightForm from "./FlightForm";

const EditFlight = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState<FlightRequest | null>(null);

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const data = await getFlightById(id!);
                setInitialData(data);
            } catch (error) {
                console.error("Error fetching flight", error);
            }
        };
        fetchFlight();
    }, [id]);

    const handleUpdate = async (data: FlightRequest) => {
        try {
            await updateFlightById(id!, data);
            navigate("/admin/flights");
        } catch (error) {
            console.error("Failed to update flight", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-black text-2xl font-semibold mb-4">Edit Flight</h2>
            {initialData ? (
                <FlightForm initialData={initialData} onSubmit={handleUpdate} isEdit />
            ) : (
                <p className="text-gray-700">Loading...</p>
            )}
        </div>
    );
};

export default EditFlight;
