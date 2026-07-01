"use client";

import { FaBell, FaCheckCircle } from "react-icons/fa";

import { useNotifications } from "@/context/NotificationContext";

import { useTheme } from "@/context/ThemeContext";

export default function NotificationDropdown({ isOpen, closeDropdown }) {
  const { darkMode } = useTheme();

  const {
    notifications,

    markAsRead,

    clearNotifications,
  } = useNotifications();

  if (!isOpen) return null;

  return (
    <div
      className={`app-surface absolute top-20 right-0 z-[999] max-h-[600px] w-[420px] overflow-y-auto ${
        darkMode ? "app-surface-dark" : "app-surface-light"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <FaBell className="text-violet-500 text-2xl" />

          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Notifications
          </h1>
        </div>

        <button
          onClick={clearNotifications}
          className="app-button app-button-danger px-4 py-2 text-sm"
        >
          Clear All
        </button>
      </div>

      {/* LIST */}

      <div className="p-4 space-y-4">
        {notifications.length === 0 ? (
          <div
            className={`text-center py-16 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            No notifications yet
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={`app-panel p-5 cursor-pointer ${
                item.read
                  ? darkMode
                    ? "app-panel-dark"
                    : "app-panel-light"
                  : darkMode
                    ? "bg-violet-500/10 border-violet-500/30"
                    : "bg-violet-50 border-violet-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    className={`font-bold text-lg ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {item.title}
                  </h2>

                  <p
                    className={`mt-2 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {item.message}
                  </p>

                  <p className="text-xs text-slate-500 mt-3">{item.time}</p>
                </div>

                {!item.read && (
                  <FaCheckCircle className="text-violet-500 text-xl" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
