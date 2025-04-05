import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api"; // adjust path based on your structure

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      const res = await loginUser(form);
      // Save token or user info here if needed
      localStorage.setItem("token", res.token); // optional, depending on your backend
      navigate("/dashboard"); // or wherever you want to redirect
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed. Please check your credentials.";
      setError(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-gray-600 text-2xl font-bold mb-4 text-center">Log In</h2>
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
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
            className="text-white bg-gray-600 w-full border p-2 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
