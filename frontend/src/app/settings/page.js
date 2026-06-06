"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaUser,
  FaBell,
  FaWallet,
  FaTrash,
  FaShieldAlt,
  FaRedoAlt,
  FaChevronRight,
} from "react-icons/fa";

import SecurityModal from "@/components/settings/SecurityModal";
import AddTransactionModal from "@/components/AddTransactionModal";
import ResetDataModal from "@/components/settings/ResetDataModal";

import BudgetModal from "@/components/settings/BudgetModal";

import { useTheme } from "@/context/ThemeContext";
import ProfileModal from "@/components/settings/ProfileModal";

import { useTransactions } from "@/context/TransactionContext";
import { useNotifications } from "@/context/NotificationContext";
import NotificationSettingsModal from "@/components/settings/NotificationSettingsModal";
import RecurringModal from "@/components/settings/RecurringModal";

export default function SettingsPage() {
  const { darkMode } = useTheme();

  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const [showResetModal, setShowResetModal] = useState(false);

  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const { addNotification } = useNotifications();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRecurringModal, setShowRecurringModal] = useState(false);

  const {
    showFilters,
    setShowFilters,

    isModalOpen,
    setIsModalOpen,
    addTransaction,
  } = useTransactions();

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const settingsCards = [
    {
      title: "Profile",

      description: "Manage your account details and profile information",

      icon: <FaUser />,

      action: "profile",
      accent: "violet",
      iconBg: "from-violet-600 to-purple-700",
      leftBorder: "border-l-violet-500",
      button:
        "bg-violet-500/10 text-violet-600 hover:bg-violet-600 hover:text-white hover:shadow-[0_12px_28px_rgba(124,58,237,0.28)]",
    },

    {
      title: "Notifications",

      description: "Manage your notification preferences and reminders",

      icon: <FaBell />,

      action: "notifications",
      iconBg: "from-orange-500 to-amber-500",
      leftBorder: "border-l-orange-500",
      button:
        "bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)]",
    },

    {
      title: "Financial Settings",

      description: "Set monthly limits, budget goals and financial preferences",

      icon: <FaWallet />,

      action: "financial",
      iconBg: "from-emerald-500 to-green-600",
      leftBorder: "border-l-emerald-500",
      button:
        "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-[0_12px_28px_rgba(16,185,129,0.28)]",
    },

    {
      title: "Recurring Transactions",

      description: "Manage subscriptions, bills and recurring payments",

      icon: <FaRedoAlt />,

      action: "recurring",
      iconBg: "from-indigo-600 to-violet-600",
      leftBorder: "border-l-indigo-500",
      button:
        "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-[0_12px_28px_rgba(79,70,229,0.28)]",
    },

    {
      title: "Privacy & Security",

      description: "Control app privacy settings, password and security preferences",

      icon: <FaShieldAlt />,

      action: "security",
      iconBg: "from-sky-500 to-blue-600",
      leftBorder: "border-l-sky-500",
      button:
        "bg-sky-500/10 text-sky-600 hover:bg-sky-500 hover:text-white hover:shadow-[0_12px_28px_rgba(14,165,233,0.28)]",
    },
  ];

  const openSettingsCard = (action) => {
    if (action === "profile") {
      setShowProfileModal(true);
    }

    if (action === "notifications") {
      setShowNotificationModal(true);
    }

    if (action === "security") {
      setShowSecurityModal(true);
    }

    if (action === "financial") {
      setShowBudgetModal(true);
    }

    if (action === "recurring") {
      setShowRecurringModal(true);
    }
  };

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

      <div className="flex-1 min-w-0 ml-[320px]">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="p-6 md:p-8"
        >
          {/* HEADER */}

          <div className="mb-8 md:mb-10">
            <h1
              className={`text-4xl font-black tracking-tight md:text-5xl ${
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
              Manage your account, preferences, and application settings.
            </p>
          </div>

          {/* SETTINGS GRID */}

          <div className="grid gap-6 xl:grid-cols-2 xl:gap-8">
            {settingsCards.map((card, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-[22px] border border-l-4 ${card.leftBorder} p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.14)] md:p-7 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.06] text-white backdrop-blur-xl"
                    : "border-slate-200 bg-white text-slate-950"
                }`}
              >
                <div className="grid min-h-[120px] grid-cols-[auto_1fr] gap-5 pr-0 sm:pr-36">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.iconBg} text-2xl text-white shadow-lg`}
                  >
                    {card.icon}
                  </div>

                  <div>
                    <h2
                      className={`text-2xl font-black ${
                        darkMode ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {card.title}
                    </h2>

                    <p
                      className={`mt-3 max-w-md text-base leading-7 ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end sm:absolute sm:right-7 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
                  <button
                    onClick={() => openSettingsCard(card.action)}
                    className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-black transition-all duration-300 ${card.button}`}
                  >
                    <span>Open</span>
                    <FaChevronRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DANGER ZONE */}

          <div
            className={`mt-12 rounded-[22px] border p-6 shadow-[0_20px_50px_rgba(127,29,29,0.08)] md:p-8 ${
              darkMode
                ? "border-red-500/25 bg-red-500/10"
                : "border-red-200 bg-gradient-to-br from-red-50 to-white"
            }`}
          >
            <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 text-4xl text-white shadow-[0_18px_34px_rgba(239,68,68,0.32)]">
                <FaTrash />
              </div>

              <div>
                <h1 className="text-3xl font-black text-red-500">
                  Danger Zone
                </h1>

                <p
                  className={`mt-3 max-w-3xl text-base leading-7 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Permanently delete your account and all your data. This action
                  cannot be undone.
                </p>
              </div>

              <button
                onClick={() => setShowResetModal(true)}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-8 py-4 text-base font-black text-white shadow-[0_14px_34px_rgba(220,38,38,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(220,38,38,0.34)]"
              >
                Reset Application Data
              </button>
            </div>
          </div>
        </motion.div>
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

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(transaction, currentBalance) => {
          addTransaction(transaction);
          addNotification({
            title: "Transaction Added",
            message: `${transaction.category} transaction of ₹${transaction.amount} added successfully.`,
            type: "transaction",
          });

          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
