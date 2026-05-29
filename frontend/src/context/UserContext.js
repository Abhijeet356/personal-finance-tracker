"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  // LOAD USER

  useEffect(() => {
    const savedUser = localStorage.getItem("user_setup");

    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  // SAVE USER

  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "user_setup",

        JSON.stringify(userData),
      );
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,

        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
