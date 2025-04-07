import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" className="hover:text-yellow-300">Dashboard</NavLink>
          <NavLink to="/admin/flights" className="hover:text-yellow-300">Flights</NavLink>
          <NavLink to="/admin/airports" className="hover:text-yellow-300">Airports</NavLink>
          <NavLink to="/admin/aircrafts" className="hover:text-yellow-300">Aircrafts</NavLink>
          <NavLink to="/admin/users" className="hover:text-yellow-300">Users</NavLink>
          <NavLink to="/admin/reservations" className="hover:text-yellow-300">Reservations</NavLink>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
