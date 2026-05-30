"use client";

import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";

export default function ResetDataModal({ isOpen, closeModal }) {
  const { darkMode } = useTheme();
  const router = useRouter();
  const { addNotification } = useNotifications();

  const [password, setPassword] = useState("");

  const [confirmation, setConfirmation] = useState("");

  // RESET

  const handleReset = async () => {
    if (confirmation !== "DELETE MY DATA") {
      alert("Confirmation text incorrect");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete("/auth/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.clear();
      alert("Account deleted successfully");
      window.location.href = "/";
    } catch (error) {
      console.error(error);

      alert("Failed to delete account");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`w-full max-w-3xl rounded-[36px] p-8 shadow-2xl border relative ${
          darkMode
            ? "bg-[#111827] border-red-500/20"
            : "bg-white border-red-200"
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
          <div className="w-24 h-24 rounded-[30px] bg-red-500 text-white text-5xl flex items-center justify-center shadow-2xl">
            <FaTrash />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-red-500">Danger Zone</h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Permanently delete all app data and settings
            </p>
          </div>
        </div>

        {/* WARNING */}

        <div
          className={`mt-8 p-6 rounded-2xl border flex gap-4 ${
            darkMode
              ? "bg-red-500/10 border-red-500/20"
              : "bg-red-50 border-red-200"
          }`}
        >
          <FaExclamationTriangle className="text-red-500 text-3xl mt-1" />

          <div>
            <h2 className="text-xl font-bold text-red-500">Warning</h2>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              This action cannot be undone. All transactions, analytics,
              exports, notifications, and settings will be deleted permanently.
            </p>
          </div>
        </div>

        {/* PASSWORD */}

        <div className="mt-8">
          <label
            className={`font-semibold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Enter Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={`mt-3 w-full px-5 py-4 rounded-2xl border-2 outline-none ${
              darkMode
                ? "bg-slate-800 border-slate-600 text-white"
                : "bg-slate-100 border-slate-300 text-black"
            }`}
          />
        </div>

        {/* CONFIRMATION */}

        <div className="mt-8">
          <label
            className={`font-semibold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Type &quot;DELETE MY DATA&quot;
          </label>

          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="DELETE MY DATA"
            className={`mt-3 w-full px-5 py-4 rounded-2xl border-2 outline-none ${
              darkMode
                ? "bg-slate-800 border-slate-600 text-white"
                : "bg-slate-100 border-slate-300 text-black"
            }`}
          />
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
            onClick={handleReset}
            className="px-8 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-2xl transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
