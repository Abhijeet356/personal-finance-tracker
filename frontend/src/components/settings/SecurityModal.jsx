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
          <div className="w-20 h-20 rounded-3xl bg-sky-600 text-white text-4xl flex items-center justify-center shadow-lg">
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
                  className={`app-field pl-14 ${
                    darkMode ? "app-field-dark" : "app-field-light"
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
              className={`app-panel flex items-center justify-between p-5 ${
                darkMode ? "app-panel-dark" : "app-panel-light"
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
                    ? "bg-violet-600 justify-end"
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
            className={`app-button app-button-secondary px-8 py-4 ${
              darkMode ? "bg-white/10 text-white hover:bg-white/15" : ""
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="app-button bg-sky-600 px-8 py-4 text-white hover:bg-sky-700"
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
