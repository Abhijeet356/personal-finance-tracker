"use client";

import { FaTimes, FaBell } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationContext";
export default function NotificationSettingsModal({ isOpen, closeModal }) {
  const { darkMode } = useTheme();
  const { addNotification } = useNotifications();
  const [settings, setSettings] = useState(() => {
  const saved =
    typeof window !== "undefined"
      ? localStorage.getItem("notification_settings")
      : null;

    return saved
      ? JSON.parse(saved)
      : {
          transactions: true,
          exports: true,
          email: false,
          push: true,
        };
  });

  // TOGGLE
  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,

      [key]: !prev[key],
    }));
  };

  // SAVE
  const handleSave = () => {
    localStorage.setItem(
      "notification_settings",
      JSON.stringify(settings),
    );

    addNotification({
      title: "Notification Settings Updated",
      message: "Your notification preferences were saved successfully.",
    });

    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
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

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-violet-600 text-white text-4xl flex items-center justify-center shadow-lg">
            <FaBell />
          </div>

          <div>
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Notifications
            </h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Manage app notification preferences
            </p>
          </div>
        </div>

        {/* SETTINGS */}

        <div className="mt-10 space-y-6">
          {[
            {
              key: "transactions",
              title: "Transaction Notifications",
              desc: "Get alerts when transactions are added",
            },

            {
              key: "exports",
              title: "Export Notifications",
              desc: "Receive alerts when reports are downloaded",
            },

            {
              key: "email",
              title: "Email Notifications",
              desc: "Receive important updates via email",
            },

            {
              key: "push",
              title: "Push Notifications",
              desc: "Enable browser push notifications",
            },
          ].map((item) => (
            <div
              key={item.key}
              className={`app-panel flex items-center justify-between p-5 ${
                darkMode ? "app-panel-dark" : "app-panel-light"
              }`}
            >
              <div>
                <h2
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </h2>

                <p
                  className={`mt-1 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              {/* TOGGLE */}
              <button
                onClick={() => toggleSetting(item.key)}
                className={`w-20 h-10 rounded-full transition-all duration-300 flex items-center px-1 ${
                  settings[item.key]
                    ? "bg-violet-600 justify-end"
                    : "bg-slate-500 justify-start"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-xl" />
              </button>
            </div>
          ))}
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
            className="app-button app-button-primary px-8 py-4"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
