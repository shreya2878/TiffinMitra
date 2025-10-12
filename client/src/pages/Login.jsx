import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // 👁 icons

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- password toggle

  axios.defaults.withCredentials = true;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (state === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
      }

      const data = response.data;

      if (data.success) {
        if (data.token) localStorage.setItem("token", data.token);

        setIsLoggedin(true);
        if (data.user) setUserData(data.user);

        toast.success(
          state === "Sign Up" ? "Account created ✅" : "Logged in successfully ✅",
          { autoClose: 1500, onClose: () => navigate("/") }
        );
      } else {
        toast.error(data.message || "Something went wrong", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Request failed", { autoClose: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.Tiffinmitra}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 rounded-lg shadow-lg w-full max-w-sm text-indigo-300 text-sm p-6">
        <h2 className="text-2xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create your account" : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none flex-1"
                type="text"
                placeholder="Full Name"
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none flex-1"
              type="email"
              placeholder="Email id"
              required
              autoComplete="username"
            />
          </div>

          {/* Password field with eye toggle */}
          <div className="mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none flex-1"
              type={showPassword ? "text" : "password"} // <-- toggle type
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <span
              className="cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
