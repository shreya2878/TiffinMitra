import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = "http://localhost:5000"
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // 🔹 ek axios instance banaya (baar-baar likhne ki jarurat nahi)
  const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  });

  // ✅ Check user auth state
  const getAuthState = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await api.get("/auth/is-auth", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  // ✅ Fetch user data
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await api.get("/auth/user-data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <AppContent.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getAuthState,
        getUserData,
        backendUrl,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
