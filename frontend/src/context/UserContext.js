"use client";
import api from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);