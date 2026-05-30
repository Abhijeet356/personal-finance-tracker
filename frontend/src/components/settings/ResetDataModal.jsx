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
        className={`app-surface w-full max-w-3xl p-8 relative ${
          darkMode
            ? "app-surface-dark border-red-500/20"
            : "app-surface-light border-red-200"
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
          <div className="w-20 h-20 rounded-3xl bg-red-500 text-white text-4xl flex items-center justify-center shadow-lg">
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
          className={`app-panel mt-8 p-6 flex gap-4 ${
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
            className={`app-field mt-3 ${
              darkMode ? "app-field-dark" : "app-field-light"
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
            className={`app-field mt-3 ${
              darkMode ? "app-field-dark" : "app-field-light"
            }`}
          />
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
            onClick={handleReset}
            className="app-button app-button-danger px-8 py-4"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
