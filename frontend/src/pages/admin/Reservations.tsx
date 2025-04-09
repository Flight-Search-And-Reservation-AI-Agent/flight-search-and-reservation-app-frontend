import { useEffect, useState } from 'react';
import {
    getAllReservations,
    createReservation,
    updateReservation,
    cancelReservation,
} from "../../api/api";
import { Reservation, ReservationRequest } from "../../types";

const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>('all');
    const [selectedFlightId, setSelectedFlightId] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const [form, setForm] = useState<ReservationRequest>({
        userId: '',
        flightId: '',
        seatNumber: '',
        status: 'BOOKED',
    });
    const [editId, setEditId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getAllReservations();
                setReservations(data);
                setFilteredReservations(data);
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
            }
        };
        fetchReservations();
    }, []);

    useEffect(() => {
        let filtered = reservations;

        if (selectedUserId !== 'all') {
            filtered = filtered.filter(r => r.user.userId === selectedUserId);
        }
        if (selectedFlightId !== 'all') {
            filtered = filtered.filter(r => r.flight.flightId === selectedFlightId);
        }
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(r => r.status === selectedStatus);
        }

        setFilteredReservations(filtered);
    }, [selectedUserId, selectedFlightId, selectedStatus, reservations]);

    const uniqueUsers = Array.from(
        new Map(reservations.map(r => [r.user.userId, r.user])).values()
    );
    const uniqueFlights = Array.from(
        new Map(reservations.map(r => [r.flight.flightId, r.flight])).values()
    );

    const handleSubmit = async () => {
        if (!form.userId || !form.flightId) {
            alert('User ID and Flight ID are required');
            return;
        }

        try {
            if (editId) {
                const updated = await updateReservation(editId, form);
                setReservations(prev =>
                    prev.map(r => r.reservationId === editId ? { ...r, ...updated } : r)
                );
            } else {
                const created = await createReservation(form);
                setReservations(prev => [...prev, created]);
            }

            setForm({ userId: '', flightId: '', seatNumber: '', status: 'BOOKED' });
            setEditId(null);
            setShowForm(false);
        } catch (err) {
            console.error('Submit failed', err);
        }
    };

    const handleEdit = (r: Reservation) => {
        setForm({
            userId: r.user.userId,
            flightId: r.flight.flightId,
            seatNumber: r.seatNumber,
            status: r.status,
        });
        setEditId(r.reservationId);
        setShowForm(true);
    };

    const handleCancel = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to cancel this reservation?');
        if (!confirm) return;

        try {
            await cancelReservation(id);
            setReservations(prev =>
                prev.map(r =>
                    r.reservationId === id ? { ...r, status: 'CANCELLED' } : r
                )
            );
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reservations</h2>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                onClick={() => {
                    setForm({ userId: '', flightId: '', seatNumber: '', status: 'BOOKED' });
                    setEditId(null);
                    setShowForm(true);
                }}
            >
                Create Reservation
            </button>

            {/* Filters */}
            <div className="flex gap-4 mb-4 flex-wrap">
                <div>
                    <label className="block text-sm font-medium">Filter by User:</label>
                    <select
                        className="border rounded p-2"
                        value={selectedUserId}
                        onChange={e => setSelectedUserId(e.target.value)}
                    >
                        <option value="all">All</option>
                        {uniqueUsers.map(user => (
                            <option key={user.userId} value={user.userId}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Filter by Flight:</label>
                    <select
                        className="border rounded p-2"
                        value={selectedFlightId}
                        onChange={e => setSelectedFlightId(e.target.value)}
                    >
                        <option value="all">All</option>
                        {uniqueFlights.map(flight => (
                            <option key={flight.flightId} value={flight.flightId}>
                                {flight.flightNumber}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Filter by Status:</label>
                    <select
                        className="border rounded p-2"
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="BOOKED">BOOKED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">Reservation ID</th>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Flight Number</th>
                        <th className="border p-2">Seat</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(r => (
                        <tr key={r.reservationId}>
                            <td className="border p-2">{r.reservationId}</td>
                            <td className="border p-2">{r.user.username}</td>
                            <td className="border p-2">{r.flight.flightNumber}</td>
                            <td className="border p-2">{r.seatNumber}</td>
                            <td className="border p-2">
                                <span
                                    className={`px-2 py-1 rounded text-white text-sm ${r.status === 'BOOKED' ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                >
                                    {r.status}
                                </span>
                            </td>
                            <td className="border p-2">
                                {new Date(r.reservationTime).toLocaleString()}
                            </td>
                            <td className="border p-2 space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleEdit(r)}
                                >
                                    Edit
                                </button>
                                {r.status === 'BOOKED' && (
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => handleCancel(r.reservationId)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Create/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
                        <h3 className="text-lg font-semibold">
                            {editId ? 'Edit Reservation' : 'Create Reservation'}
                        </h3>
                        <input
                            className="border p-2 rounded w-full"
                            placeholder="User ID"
                            value={form.userId}
                            onChange={e => setForm(f => ({ ...f, userId: e.target.value }))}
                        />
                        <input
                            className="border p-2 rounded w-full"
                            placeholder="Flight ID"
                            value={form.flightId}
                            onChange={e => setForm(f => ({ ...f, flightId: e.target.value }))}
                        />
                        <input
                            className="border p-2 rounded w-full"
                            placeholder="Seat Number"
                            value={form.seatNumber || ''}
                            onChange={e => setForm(f => ({ ...f, seatNumber: e.target.value }))}
                        />
                        <select
                            className="border p-2 rounded w-full"
                            value={form.status}
                            onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
                        >
                            <option value="BOOKED">BOOKED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-300 text-white px-4 py-2 rounded"
                                onClick={() => setShowForm(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={handleSubmit}
                            >
                                {editId ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservations;
