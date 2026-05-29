"use client";

import { FaTimes, FaWallet, FaPiggyBank, FaPercentage } from "react-icons/fa";

import { useState } from "react";

import { useTheme } from "@/context/ThemeContext";

import { useNotifications } from "@/context/NotificationContext";
import api from "@/lib/api";

export default function BudgetModal({ isOpen, closeModal }) {
  const { darkMode } = useTheme();

  const { addNotification } = useNotifications();

  const savedBudgetSettings =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("budget_settings") || "null")
      : null;

  const [monthlyBudget, setMonthlyBudget] = useState(
    savedBudgetSettings?.monthlyBudget || "",
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

    if (token) {
      await api.patch(
        "/auth/profile",
        {
          monthlyBudget: nextMonthlyBudget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }

    localStorage.setItem(
      "budget_settings",

      JSON.stringify({
        monthlyBudget: nextMonthlyBudget,

        savingsGoal,

        warningThreshold,
      }),
    );

    addNotification({
      title: "Budget Updated",

      message: "Your budget settings were saved successfully.",
    });

    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full max-w-3xl rounded-[36px] p-8 shadow-2xl border relative ${
          darkMode
            ? "bg-[#111827] border-white/10"
            : "bg-white border-slate-200"
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
          <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-green-500 to-emerald-600 text-white text-5xl flex items-center justify-center shadow-2xl">
            <FaWallet />
          </div>

          <div>
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Budget Goals
            </h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Manage your monthly spending and savings goals
            </p>
          </div>
        </div>

        {/* FORM */}

        <div className="mt-10 space-y-6">
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
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
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
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
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
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={closeModal}
            className="px-8 py-4 rounded-2xl bg-slate-500 text-white font-semibold hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Save Budget
          </button>
        </div>
      </div>
    </div>
  );
}
