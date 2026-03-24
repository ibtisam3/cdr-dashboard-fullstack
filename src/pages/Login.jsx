import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";

      
      if (msg.toLowerCase().includes("email")) {
        setEmailError(msg);
        setPasswordError(""); 
      } else {
        setPasswordError(msg); 
        setEmailError(""); 
      }

      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      {/* Logo / Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mt-4 text-white">Telecom Dashboard</h1>
      </div>

      {/* Login form card */}
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-6 text-white">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-600 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-600 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors"
          >
            Login
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-6 text-gray-400 text-sm">
        Powered by PineVox
      </div>
    </div>
  );
}