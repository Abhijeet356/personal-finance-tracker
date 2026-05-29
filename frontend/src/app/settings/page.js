"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

import {
  FaUser,
  FaMoon,
  FaBell,
  FaWallet,
  FaTrash,
  FaShieldAlt,
  FaPalette,
  FaDownload,
} from "react-icons/fa";

import SecurityModal from "@/components/settings/SecurityModal";

import ResetDataModal from "@/components/settings/ResetDataModal";

import BudgetModal from "@/components/settings/BudgetModal";

import { useTheme } from "@/context/ThemeContext";
import ProfileModal from "@/components/settings/ProfileModal";

import { useTransactions } from "@/context/TransactionContext";

import NotificationSettingsModal from "@/components/settings/NotificationSettingsModal";

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useTheme();

  const { userData } = useUser();

  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const [showResetModal, setShowResetModal] = useState(false);

  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);

  const {
    showFilters,
    setShowFilters,

    isModalOpen,
    setIsModalOpen,
  } = useTransactions();

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const settingsCards = [
    {
      title: "Profile",

      description: "Manage your account details and profile",

      icon: <FaUser />,

      gradient: "from-violet-600 to-purple-700",
    },

    {
      title: "Notifications",

      description: "Manage reminders and notifications",

      icon: <FaBell />,

      gradient: "from-orange-500 to-amber-500",
    },

    {
      title: "Budget Settings",

      description: "Set monthly limits and financial goals",

      icon: <FaWallet />,

      gradient: "from-green-500 to-emerald-600",
    },

    {
      title: "Privacy & Security",

      description: "Control app privacy and security settings",

      icon: <FaShieldAlt />,

      gradient: "from-blue-500 to-cyan-600",
    },
  ];

  return (
    <div
      className={`relative overflow-hidden flex min-h-screen ${
        darkMode ? "bg-[#071028]" : "bg-slate-100"
      }`}
    >
      {/* GLOWS */}

      <div className="absolute top-20 left-20 w-[350px] h-[350px] bg-violet-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full" />

      {/* SIDEBAR */}

      <Sidebar
        openTransactionModal={() => setIsModalOpen(true)}
        toggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* MAIN */}

      <div className="flex-1 min-w-0 ml-[260px]">
        <Navbar />

        <div className="p-6 md:p-8">
          {/* HEADER */}

          <div className="mb-10">
            <h1
              className={`text-5xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Settings
            </h1>

            <p
              className={`mt-3 text-lg ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Manage your account, appearance, and preferences
            </p>
          </div>

          {/* SETTINGS GRID */}

          <div className="grid xl:grid-cols-2 gap-8">
            {settingsCards.map((card, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-[36px] p-8 border backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white/70 border-white"
                }`}
              >
                {/* GLOW */}

                <div
                  className={`absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br ${card.gradient} opacity-40 rounded-full blur-[90px] group-hover:scale-125 transition-all duration-700`}
                />

                {/* ICON */}

                <div
                  className={`w-24 h-24 rounded-[30px] bg-gradient-to-br ${card.gradient} text-white text-5xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.25)] group-hover:rotate-6 transition-all duration-500`}
                >
                  {card.icon}
                </div>

                {/* TEXT */}

                <h2
                  className={`mt-8 text-3xl font-bold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {card.title}
                </h2>

                <p
                  className={`mt-4 text-lg leading-relaxed ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {card.description}
                </p>

                {/* BUTTON */}
                <div className="absolute top-8 right-8">
                  <button
                    onClick={() => {
                      if (card.title === "Profile") {
                        setShowProfileModal(true);
                      }

                      if (card.title === "Notifications") {
                        setShowNotificationModal(true);
                      }

                      if (card.title === "Privacy & Security") {
                        setShowSecurityModal(true);
                      }

                      if (card.title === "Budget Settings") {
                        setShowBudgetModal(true);
                      }

                      if (card.title === "Danger Zone") {
                        setShowResetModal(true);
                      }
                    }}
                    className={`
      w-28 h-28
      rounded-[28px]
      border-2
      flex
      flex-col
      items-center
      justify-center
      gap-3

      transition-all
      duration-300

      hover:scale-105
      hover:shadow-xl

    ${
      card.title === "Profile"
        ? "border-violet-600 text-violet-600 hover:bg-violet-50"
        : card.title === "Notifications"
          ? "border-orange-500 text-orange-500 hover:bg-orange-50"
          : card.title === "Budget Settings"
            ? "border-green-500 text-green-500 hover:bg-green-50"
            : card.title === "Privacy & Security"
              ? "border-blue-500 text-blue-500 hover:bg-blue-50"
              : "border-red-500 text-red-500 hover:bg-red-50"
    }
   `}
                  >
                    <div className="text-3xl ">⚙️</div>

                    <span className="font-bold text-lg">Open</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DANGER ZONE */}

          <div
            className={`mt-12 p-8 rounded-[36px] border shadow-2xl ${
              darkMode
                ? "bg-red-500/10 border-red-500/20"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-red-500 text-white text-4xl flex items-center justify-center">
                <FaTrash />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-red-500">Danger Zone</h1>

                <p
                  className={`mt-2 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Reset all app data and transactions permanently
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowResetModal(true)}
              className="mt-8 bg-red-500 hover:bg-red-600 transition px-8 py-4 rounded-2xl text-white text-lg font-semibold shadow-2xl"
            >
              Reset Application Data
            </button>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        closeModal={() => setShowProfileModal(false)}
      />

      <NotificationSettingsModal
        isOpen={showNotificationModal}
        closeModal={() => setShowNotificationModal(false)}
      />

      <SecurityModal
        isOpen={showSecurityModal}
        closeModal={() => setShowSecurityModal(false)}
      />

      <BudgetModal
        isOpen={showBudgetModal}
        closeModal={() => setShowBudgetModal(false)}
      />

      <ResetDataModal
        isOpen={showResetModal}
        closeModal={() => setShowResetModal(false)}
      />
    </div>
  );
}
