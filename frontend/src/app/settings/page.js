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
  FaCog,
  FaRedoAlt,
} from "react-icons/fa";

import SecurityModal from "@/components/settings/SecurityModal";

import ResetDataModal from "@/components/settings/ResetDataModal";

import BudgetModal from "@/components/settings/BudgetModal";

import { useTheme } from "@/context/ThemeContext";
import ProfileModal from "@/components/settings/ProfileModal";

import { useTransactions } from "@/context/TransactionContext";

import NotificationSettingsModal from "@/components/settings/NotificationSettingsModal";
import RecurringModal from "@/components/settings/RecurringModal";

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useTheme();

  const { userData } = useUser();

  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const [showResetModal, setShowResetModal] = useState(false);

  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRecurringModal, setShowRecurringModal] = useState(false);

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
      accent: "text-violet-600 border-violet-600 hover:bg-violet-50",
      iconBg: "bg-violet-600",
    },

    {
      title: "Notifications",

      description: "Manage reminders and notifications",

      icon: <FaBell />,

      gradient: "from-orange-500 to-amber-500",
      accent: "text-orange-500 border-orange-500 hover:bg-orange-50",
      iconBg: "bg-orange-500",
    },

    {
      title: "Financial Settings",

      description: "Set monthly limits and financial goals",

      icon: <FaWallet />,

      gradient: "from-green-500 to-emerald-600",
      accent: "text-emerald-600 border-emerald-600 hover:bg-emerald-50",
      iconBg: "bg-emerald-600",
    },

    {
      title: "Recurring Transactions",

      description: "Automate rent, bills, subscriptions, and monthly income",

      icon: <FaRedoAlt />,

      gradient: "from-indigo-600 to-blue-600",
      accent: "text-indigo-600 border-indigo-600 hover:bg-indigo-50",
      iconBg: "bg-indigo-600",
    },

    {
      title: "Privacy & Security",

      description: "Control app privacy and security settings",

      icon: <FaShieldAlt />,

      gradient: "from-blue-500 to-cyan-600",
      accent: "text-sky-600 border-sky-600 hover:bg-sky-50",
      iconBg: "bg-sky-600",
    },
  ];

  return (
    <div
      className={`relative overflow-hidden flex min-h-screen ${
        darkMode ? "bg-[#071028]" : "bg-slate-100"
      }`}
    >
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
                className={`app-surface relative overflow-hidden p-8 ${
                  darkMode ? "app-surface-dark" : "app-surface-light"
                }`}
              >
                {/* ICON */}

                <div
                  className={`w-20 h-20 rounded-3xl ${card.iconBg} text-white text-4xl flex items-center justify-center shadow-lg`}
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

                      if (card.title === "Financial Settings") {
                        setShowBudgetModal(true);
                      }

                      if (card.title === "Recurring Transactions") {
                        setShowRecurringModal(true);
                      }

                      if (card.title === "Danger Zone") {
                        setShowResetModal(true);
                      }
                    }}
                    className={`
      w-24 h-24
      border-2
      flex
      flex-col
      items-center
      justify-center
      gap-3

      transition-all
      duration-300

      ${card.accent}
   `}
                  >
                    <FaCog className="text-2xl" />

                    <span className="font-bold text-lg">Open</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DANGER ZONE */}

          <div
            className={`app-surface mt-12 p-8 ${
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
              className="app-button app-button-danger mt-8 px-8 py-4 text-lg"
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

      <RecurringModal
        isOpen={showRecurringModal}
        closeModal={() => setShowRecurringModal(false)}
      />

      <ResetDataModal
        isOpen={showResetModal}
        closeModal={() => setShowResetModal(false)}
      />
    </div>
  );
}
