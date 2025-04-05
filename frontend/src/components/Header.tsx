import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-yellow-300 text-white py-4">
      <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">✈️Flight Booking</Link>
         <div className="flex space-x-4">
          <Link to="/dashboard" className="mx-4 hover:underline">Dashboard</Link>
          <Link to="/admin" className="mx-4 hover:underline">Admin</Link>
          <Link to="/login" className="mx-4 hover:underline">Login</Link>
          <Link to="/register" className="mx-4 hover:underline">Register</Link>
          </div>
      </div>
      </nav>
    </header>
  );
};

export default Header;
