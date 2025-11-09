import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);

  const [step, setStep] = useState(1); // 1 = request OTP, 2 = reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const submitReset = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (data.success) {
        toast.success("Password reset successful", { autoClose: 1500 });
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-400 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h2>

        {step === 1 && (
          <form onSubmit={sendOtp}>
            <p className="text-sm text-gray-600 mb-4">Enter the email associated with your account and we'll send you an OTP to reset your password.</p>
            <div className="mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-full bg-gray-100">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none w-full"
                required
                autoComplete="email"
              />
            </div>

            <div className="flex gap-3">
              <button disabled={loading} className="flex-1 py-2 rounded-full bg-indigo-600 text-white font-medium">
                {loading ? "Sending..." : "Send OTP"}
              </button>
              <button type="button" onClick={() => navigate('/login')} className="py-2 px-4 rounded-full border border-gray-300 text-gray-700">
                Back
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitReset}>
            <p className="text-sm text-gray-600 mb-4">Enter the OTP you received and set a new password.</p>

            <div className="mb-3 flex items-center gap-3 w-full px-4 py-2 rounded-full bg-gray-100">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="OTP"
                className="bg-transparent outline-none w-full"
                required
                autoComplete="one-time-code"
              />
            </div>

            <div className="mb-3 flex items-center gap-3 w-full px-4 py-2 rounded-full bg-gray-100">
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="New password"
                className="bg-transparent outline-none w-full"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-full bg-gray-100">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                className="bg-transparent outline-none w-full"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="flex gap-3">
              <button disabled={loading} className="flex-1 py-2 rounded-full bg-indigo-600 text-white font-medium">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              <button type="button" onClick={() => setStep(1)} className="py-2 px-4 rounded-full border border-gray-300 text-gray-700">
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
