import { useNavigate } from "react-router-dom";
import { FlightRequest } from "../../../types";
import FlightForm from "./FlightForm";
import { createFlight } from "../../../api/api";

const AddFlight = () => {
    const navigate = useNavigate();

    const handleAdd = async (data: FlightRequest) => {
        try {
            await createFlight(data);
            navigate("/admin/flights");
        } catch (err) {
            console.error("Failed to add flight:", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-black text-2xl font-semibold mb-4">Add New Flight</h2>
            <FlightForm onSubmit={handleAdd} />
        </div>
    );
};

export default AddFlight;
