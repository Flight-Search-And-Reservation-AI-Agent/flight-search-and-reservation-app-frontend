import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api"; // adjust path if needed

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser(form); // no role being sent here
      navigate("/login");
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed. Try again.";
      setError(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-gray-600 text-2xl font-bold mb-4 text-center">Register</h2>
        {error && (
          <p className="text-red-500 text-sm mb-2">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            required
            className="text-white bg-gray-600 w-full border p-2 rounded-lg"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className="text-white bg-gray-600 w-full border p-2 rounded-lg"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
            className="text-white bg-gray-600 w-full border p-2 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-gray-600 text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
