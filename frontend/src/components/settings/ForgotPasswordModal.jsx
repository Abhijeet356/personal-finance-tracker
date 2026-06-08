"use client";

import { FaTimes, FaEnvelope, FaKey } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationContext";

export default function ForgotPasswordModal({ isOpen, closeModal }) {
  const { darkMode } = useTheme();
  const { addNotification } = useNotifications();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // RESET

  const handleReset = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    addNotification({
      title: "Password Reset Requested",
      message: `Password reset initiated for ${email}.`,
    });
    alert("Password reset successful (demo mode)");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`app-surface w-full max-w-2xl p-8 relative ${
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

        <h1
          className={`text-4xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Forgot Password
        </h1>

        <p className={`mt-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Reset your account password securely
        </p>

        {/* FORM */}

        <div className="mt-10 space-y-6">
          {/* EMAIL */}

          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Email Address
            </label>

            <div className="relative mt-3">
              <FaEnvelope className="absolute top-5 left-5 text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className={`app-field pl-14 ${
                  darkMode ? "app-field-dark" : "app-field-light"
                }`}
              />
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              New Password
            </label>

            <div className="relative mt-3">
              <FaKey className="absolute top-5 left-5 text-slate-400" />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className={`app-field pl-14 ${
                  darkMode ? "app-field-dark" : "app-field-light"
                }`}
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Confirm Password
            </label>

            <div className="relative mt-3">
              <FaKey className="absolute top-5 left-5 text-slate-400" />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
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
            onClick={handleReset}
            className="app-button app-button-primary px-8 py-4"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
