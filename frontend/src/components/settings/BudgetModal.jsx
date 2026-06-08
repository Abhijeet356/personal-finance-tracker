"use client";

import { FaTimes, FaWallet, FaPiggyBank, FaPercentage } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationContext";
import api from "@/lib/api";

export default function BudgetModal({ isOpen, closeModal }) {
  if (!isOpen) return null;
  return <BudgetModalContent closeModal={closeModal} />;
}

function BudgetModalContent({ closeModal }) {
  const { darkMode } = useTheme();
  const { userData, setUserData } = useUser();
  const { addNotification } = useNotifications();
  const [monthlyBudget, setMonthlyBudget] = useState(
    userData?.monthlyBudget || "",
  );

  const savedBudgetSettings =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("budget_settings") || "null")
      : null;

  const [monthlySalary, setMonthlySalary] = useState(
    userData?.monthlySalary || "",
  );

  const [savingsGoal, setSavingsGoal] = useState(
    savedBudgetSettings?.savingsGoal || "",
  );

  const [warningThreshold, setWarningThreshold] = useState(
    savedBudgetSettings?.warningThreshold || "80",
  );

  // SAVE
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const nextMonthlyBudget = Number(monthlyBudget || 0);
    const nextMonthlySalary = Number(monthlySalary || 0);
    if (token) {
      await api.patch(
        "/auth/profile",
        {
          monthlySalary: nextMonthlySalary,
          monthlyBudget: nextMonthlyBudget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData({
        ...userData,
        monthlySalary: nextMonthlySalary,
        monthlyBudget: nextMonthlyBudget,
      });
    }

  localStorage.setItem(
    "budget_settings",
    JSON.stringify({
      monthlyBudget: nextMonthlyBudget,
      monthlySalary: nextMonthlySalary,
      savingsGoal,
      warningThreshold,
    }),
  );
  addNotification({
    title: "Financial Settings Updated",
    message: "Your financial settings were saved successfully.",
  });
  closeModal();
}

return (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div
      className={`app-surface w-full max-w-3xl p-8 relative ${
        darkMode ? "app-surface-dark" : "app-surface-light"
      }`}
    >
      {/* CLOSE */}
      <button
        onClick={closeModal}
        className="absolute top-6 right-6 text-2xl text-slate-400 hover:text-red-500 transition"
      >
        <FaTimes />
      </button>

      {/* HEADER */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white text-4xl flex items-center justify-center shadow-lg">
          <FaWallet />
        </div>

        <div>
          <h1
            className={`text-4xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Financial Settings
          </h1>

          <p
            className={`mt-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Manage your monthly spending and savings goals
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="mt-10 space-y-6">
        {/* MONTHLY SALARY */}

        <div>
          <label
            className={`font-semibold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Monthly Salary
          </label>

          <div className="relative mt-3">
            <FaWallet className="absolute top-5 left-5 text-slate-400" />

            <input
              type="number"
              value={monthlySalary || ""}
              onChange={(e) => setMonthlySalary(e.target.value)}
              placeholder="Enter monthly salary"
              className={`app-field pl-14 ${
                darkMode ? "app-field-dark" : "app-field-light"
              }`}
            />
          </div>
        </div>
        {/* MONTHLY BUDGET */}

        <div>
          <label
            className={`font-semibold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Monthly Budget
          </label>

          <div className="relative mt-3">
            <FaWallet className="absolute top-5 left-5 text-slate-400" />

            <input
              type="number"
              value={monthlyBudget || ""}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="Enter monthly budget"
              className={`app-field pl-14 ${
                darkMode ? "app-field-dark" : "app-field-light"
              }`}
            />
          </div>
        </div>

        {/* SAVINGS GOAL */}

        <div>
          <label
            className={`font-semibold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Savings Goal
          </label>

          <div className="relative mt-3">
            <FaPiggyBank className="absolute top-5 left-5 text-slate-400" />

            <input
              type="number"
              value={savingsGoal || ""}
              onChange={(e) => setSavingsGoal(e.target.value)}
              placeholder="Enter savings goal"
              className={`app-field pl-14 ${
                darkMode ? "app-field-dark" : "app-field-light"
              }`}
            />
          </div>
        </div>

        {/* WARNING THRESHOLD */}

        <div>
          <label
            className={`font-semibold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Warning Threshold %
          </label>

          <div className="relative mt-3">
            <FaPercentage className="absolute top-5 left-5 text-slate-400" />

            <input
              type="number"
              value={warningThreshold || ""}
              onChange={(e) => setWarningThreshold(e.target.value)}
              placeholder="80"
              className={`app-field pl-14 ${
                darkMode ? "app-field-dark" : "app-field-light"
              }`}
            />
          </div>
        </div>
      </div>

      {/* BUTTONS */}

      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={closeModal}
          className={`app-button app-button-secondary px-8 py-4 ${
            darkMode ? "bg-white/10 text-white hover:bg-white/15" : ""
          }`}
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="app-button bg-emerald-600 px-8 py-4 text-white hover:bg-emerald-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
);
}
