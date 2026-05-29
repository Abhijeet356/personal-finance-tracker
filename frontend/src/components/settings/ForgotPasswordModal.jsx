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
        className={`w-full max-w-2xl rounded-[36px] p-8 shadow-2xl border relative ${
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
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
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
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
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
            onClick={handleReset}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
