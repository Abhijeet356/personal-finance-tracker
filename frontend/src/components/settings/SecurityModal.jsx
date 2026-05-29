"use client";

import {
  FaTimes,
  FaShieldAlt,
  FaLock,
  FaFingerprint,
  FaClock,
} from "react-icons/fa";

import { useState } from "react";

import { useTheme } from "@/context/ThemeContext";

import { useNotifications } from "@/context/NotificationContext";

import ForgotPasswordModal from "@/components/settings/ForgotPasswordModal";

export default function SecurityModal({ isOpen, closeModal }) {
  const { darkMode } = useTheme();

  const { addNotification } = useNotifications();

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [appLock, setAppLock] = useState(false);

  const [biometric, setBiometric] = useState(false);

  const [autoLogout, setAutoLogout] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);

  // SAVE

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    localStorage.setItem(
      "security_settings",

      JSON.stringify({
        appLock,

        biometric,

        autoLogout,
      }),
    );

    addNotification({
      title: "Security Updated",

      message: "Security settings updated successfully.",
    });

    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
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
          <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-5xl flex items-center justify-center shadow-2xl">
            <FaShieldAlt />
          </div>

          <div>
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Privacy & Security
            </h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Protect your financial account and data
            </p>
          </div>
        </div>

        {/* PASSWORDS */}

        <div className="mt-10 space-y-6">
          {[
            {
              label: "Current Password",

              value: currentPassword,

              setter: setCurrentPassword,
            },

            {
              label: "New Password",

              value: newPassword,

              setter: setNewPassword,
            },

            {
              label: "Confirm Password",

              value: confirmPassword,

              setter: setConfirmPassword,
            },
          ].map((item) => (
            <div key={item.label}>
              <label
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {item.label}
              </label>

              <div className="relative mt-3">
                <FaLock className="absolute top-5 left-5 text-slate-400" />

                <input
                  type="password"
                  value={item.value}
                  onChange={(e) => item.setter(e.target.value)}
                  placeholder={item.label}
                  className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none ${
                    darkMode
                      ? "bg-slate-800 border-slate-600 text-white"
                      : "bg-slate-100 border-slate-300 text-black"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* TOGGLES */}

        <div className="mt-10 space-y-5">
          {[
            {
              title: "Enable App Lock",

              state: appLock,

              setter: setAppLock,

              icon: <FaLock />,
            },

            {
              title: "Biometric Authentication",

              state: biometric,

              setter: setBiometric,

              icon: <FaFingerprint />,
            },

            {
              title: "Auto Logout",

              state: autoLogout,

              setter: setAutoLogout,

              icon: <FaClock />,
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`flex items-center justify-between p-5 rounded-2xl border ${
                darkMode
                  ? "bg-slate-800 border-white/10"
                  : "bg-slate-100 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl text-violet-500">{item.icon}</div>

                <h2
                  className={`font-bold text-lg ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </h2>
              </div>

              {/* TOGGLE */}

              <button
                onClick={() => item.setter(!item.state)}
                className={`w-20 h-10 rounded-full transition-all duration-300 flex items-center px-1 ${
                  item.state
                    ? "bg-gradient-to-r from-violet-600 to-purple-700 justify-end"
                    : "bg-slate-500 justify-start"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-xl" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => setShowForgotModal(true)}
            className="text-violet-500 hover:text-violet-400 font-semibold transition"
          >
            Forgot Password?
          </button>
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
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Save Security Settings
          </button>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotModal}
        closeModal={() => setShowForgotModal(false)}
      />
    </div>
  );
}
