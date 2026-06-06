"use client";
import api from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const getStoredProfile = () => {
  const savedUser = localStorage.getItem("user_setup");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("user_setup");
    return null;
  }
};

const mergeUserProfile = (apiUser, storedProfile) => ({
  ...storedProfile,
  ...apiUser,
  id: apiUser.id,
  currentBalance: apiUser.currentBalance,
  monthlySalary: apiUser.monthlySalary,
  monthlyBudget: apiUser.monthlyBudget,
  onboardingComplete: apiUser.onboardingComplete,
  avatar: apiUser.avatar || storedProfile?.avatar || null,
  currency: apiUser.currency || storedProfile?.currency || "INR",
  financialGoal:
    apiUser.financialGoal || storedProfile?.financialGoal || "Save More",
  memberSince: apiUser.memberSince || storedProfile?.memberSince || "",
});

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
      const mergedUser = mergeUserProfile(response.data.user, getStoredProfile());

      setUserData(mergedUser);
      localStorage.setItem("user_setup", JSON.stringify(mergedUser));
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
