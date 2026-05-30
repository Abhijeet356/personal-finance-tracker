"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER

  useEffect(() => {
    const savedUser = localStorage.getItem("user_setup");
    // ========test===========
    console.log("LOADED USER:", savedUser);
    // =========================
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // SAVE USER

  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "user_setup",
        JSON.stringify(userData)
      );
    }
  }, [userData]);

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