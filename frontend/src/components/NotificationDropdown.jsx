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
      className={`absolute top-20 right-0 w-[420px] max-h-[600px] overflow-y-auto rounded-[32px] shadow-2xl border z-[999] ${
        darkMode ? "bg-[#111827] border-white/10" : "bg-white border-slate-200"
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
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
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
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                item.read
                  ? darkMode
                    ? "bg-slate-800 border-white/5"
                    : "bg-slate-100 border-slate-200"
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
