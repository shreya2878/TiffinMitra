import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = ({ children, backendUrl: backendUrlProp }) => {
  const backendUrl =
    backendUrlProp || import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const api = axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true,
  });

  const getAuthState = async () => {
    try {
      // We rely on the auth cookie set by the server. axios instance has withCredentials=true
      const { data } = await api.get("/auth/is-auth");

      if (data.success) {
        // mark logged in and fetch full user data
        setIsLoggedin(true);
        await getUserData();
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

  const getUserData = async () => {
    try {
      // server responds with { success: true, data: user }
      const resp = await api.get("/user/data");

      if (resp.data && resp.data.success) {
        setUserData(resp.data.data);
      } else {
        setUserData(null);
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
