import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../Context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://library-management-system-backend-nac4.onrender.com/api/auth/login", { username, password })
      .then((response) => {
        if (response.data.role === "admin") {
          localStorage.setItem("admin_token", response.data.token);
          setAdminToken(response.data.token);
          navigate("/home");
        } else {
          alert("Access denied. Admin only.");
        }
      })
      .catch((error) => {
        alert("Login failed: " + error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#006D77] to-[#83C5BE]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <h1 className="text-3xl font-bold text-center text-[#006D77] mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#006D77] text-white font-semibold rounded-md hover:bg-[#005B73] transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-[#006D77] hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;