const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Cards will be API-driven later */}
        <div className="bg-white text-black p-4 rounded-xl shadow">Total Flights: 42</div>
        <div className="bg-white text-black p-4 rounded-xl shadow">Users: 200</div>
        <div className="bg-white text-black p-4 rounded-xl shadow">Bookings: 115</div>
        <div className="bg-white text-black p-4 rounded-xl shadow">Airports: 12</div>
        <div className="bg-white text-black p-4 rounded-xl shadow">Aircrafts: 25</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
