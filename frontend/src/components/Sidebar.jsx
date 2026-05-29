"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  FaHome,
  FaPlus,
  FaChartPie,
  FaCog,
  FaFilter,
  FaFileExport,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({
  openTransactionModal,
  toggleFilters,
  showFilters,
  setShowFilters,
}) {
  const { darkMode } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/");
  };

  return (
    <div
      className={`w-[260px] fixed top-0 left-0 h-screen p-6 transition-all duration-300 overflow-y-auto ${
        darkMode ? "bg-black text-white" : "bg-[#030522] text-white"
      }`}
    >
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex flex-col items-center justify-center mb-10">
          <img
            src="/images/logo.png"
            className="w-24 h-24 object-contain drop-shadow-2xl"
          />
        </div>

        <div className="space-y-4">
          <Link href="/dashboard">
            <div
              onClick={() => {
                if (showFilters) {
                  toggleFilters();
                }
              }}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                pathname === "/dashboard" && !showFilters
                  ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                  : "text-white hover:bg-slate-800"
              }`}
            >
              <FaHome />

              <span>Dashboard</span>
            </div>
          </Link>

          <div
            onClick={() => {
              openTransactionModal?.();
            }}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer text-white hover:bg-slate-800"
          >
            <FaPlusCircle />

            <span>New Transaction</span>
          </div>

          <div
            onClick={() => {
              toggleFilters?.();
            }}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer ${
              showFilters
                ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                : "text-white hover:bg-slate-800"
            }`}
          >
            <FaFilter />

            <span>Sort & Filter</span>
          </div>

          <Link
            href="/analytics"
            onClick={() => {
              if (showFilters) {
                setShowFilters(false);
              }
            }}
          >
            <div
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                pathname === "/analytics" && !showFilters
                  ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                  : "text-white hover:bg-slate-800"
              }`}
            >
              <FaChartPie />

              <span>Analytics</span>
            </div>
          </Link>

          <Link href="/export">
            <div
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                pathname === "/export"
                  ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                  : "text-white hover:bg-slate-800"
              }`}
            >
              <FaFileExport />

              <span>Export</span>
            </div>
          </Link>

          <Link href="/settings">
            <div
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                pathname === "/settings"
                  ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                  : "text-white hover:bg-slate-800"
              }`}
            >
              <FaCog />

              <span>Settings</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          {" "}
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
