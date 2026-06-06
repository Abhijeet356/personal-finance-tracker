"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import NotificationDropdown from "@/components/NotificationDropdown";

import { useNotifications } from "@/context/NotificationContext";

import { useUser } from "@/context/UserContext";

import { FaMoon, FaSun, FaSearch, FaBell } from "react-icons/fa";

import { useTransactions } from "@/context/TransactionContext";
import Link from "next/link";

export default function Navbar() {
  const { userData, loading } = useUser();

  const { darkMode, setDarkMode } = useTheme();
  const { searchQuery, setSearchQuery } = useTransactions();

  const [showNotifications, setShowNotifications] = useState(false);

  const { notifications } = useNotifications();
  const unreadCount = notifications.filter((item) => !item.read).length;

  // SEARCH FUNCTION

  const handleSearch = (e) => {
  setSearchQuery(e.target.value);
};

  return (
    <div
      className={`w-full px-5 py-4 flex items-center justify-between shadow-sm border-b transition-all duration-300 ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      {/* LEFT SECTION */}

      <div className="flex items-center gap-4 flex-1">
        {/* SEARCH */}

        <div
          className={`flex items-center gap-4 px-5 py-3 rounded-2xl w-[420px] ${
            darkMode ? "bg-slate-800" : "bg-slate-100"
          }`}
        >
          <FaSearch className="text-gray-500" />

          <input
            type="text"
            autoComplete="off"
            placeholder="Search by category or payment method..."
            value={searchQuery}
            onChange={handleSearch}
            className={`bg-transparent outline-none w-full ${
              darkMode
                ? "text-white placeholder:text-gray-400"
                : "text-black placeholder:text-gray-500"
            }`}
          />
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className="flex items-center gap-6">
        {/* DARK MODE BUTTON */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full transition text-xl ${
            darkMode ? "bg-slate-700 text-white" : "bg-slate-200 text-black"
          }`}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* NOTIFICATIONS */}

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-4 rounded-2xl transition ${
              darkMode ? "bg-slate-800 text-white" : "bg-slate-200 text-black"
            }`}
          >
            <FaBell className="text-xl" />

            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                {unreadCount}
              </div>
            )}
          </button>

          <NotificationDropdown
            isOpen={showNotifications}
            closeDropdown={() => setShowNotifications(false)}
          />
        </div>

        {/* USER PROFILE */}

        {!loading && (
          <Link href="/settings">
            <div
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-2xl transition ${
                darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
              }`}
            >
              {userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData?.name ? `${userData.name} avatar` : "User avatar"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {userData?.name ? userData.name[0] : "U"}
                </div>
              )}

              <div>
                <h2
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {userData?.name || "User"}
                </h2>

                <p className="text-sm text-gray-500">View Profile</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
