"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const savedUser =
      typeof window !== "undefined" ? localStorage.getItem("user_setup") : null;

    return savedUser ? JSON.parse(savedUser) : null;
  });

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
