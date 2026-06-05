"use client";

import SettingsPanel from "@/components/SettingsPanel";
import FilterPanel from "@/components/FilterPanel";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SummaryCards from "@/components/SummaryCards";
import TransactionList from "@/components/TransactionList";
import AnalyticsSection from "@/components/AnalyticsSection";
import ExportButtons from "@/components/ExportButtons";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import AddTransactionModal from "@/components/AddTransactionModal";
import FloatingButton from "@/components/FloatingButton";
import { useNotifications } from "@/context/NotificationContext";
import { useTransactions } from "@/context/TransactionContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaWallet,
} from "react-icons/fa";

export default function Dashboard() {
  const { darkMode } = useTheme();
  const { setUserData } = useUser();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const {
    transactions,
    setTransactions,
    filteredTransactions,

    showFilters,
    setShowFilters,

    isModalOpen,
    setIsModalOpen,

    filterType,
    setFilterType,

    filterCategory,
    setFilterCategory,

    paymentMethod,
    setPaymentMethod,

    sortBy,
    setSortBy,

    addTransaction,
  } = useTransactions();

  const [balance, setBalance] = useState(0);
  // const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [budgetSettings] = useState(() => {
    const savedBudget =
      typeof window !== "undefined"
        ? localStorage.getItem("budget_settings")
        : null;

    return savedBudget ? JSON.parse(savedBudget) : null;
  });
  const [user, setUser] = useState(null);
  // BALANCE

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/");

          return;
        }

        const response = await api.get(
          "/auth/me",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(response.data.user);
        setUserData(response.data.user);
        setBalance(response.data.user.currentBalance || 0);
      
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        router.push("/");
      }
    };

    checkAuth();
  }, [router, setUserData]);

  // TOTALS

  const income = filteredTransactions

    .filter((t) => t.type === "income")

    .reduce((acc, curr) => acc + curr.amount, 0);

  // CURRENT MONTH + YEAR

  const today = new Date();

  const currentMonth = today.getMonth();

  const currentYear = today.getFullYear();

  const budgetMonthLabel = today.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const budgetPeriodLabel = `${today.toLocaleDateString("en-IN", {
    month: "short",
  })} 1 - ${today.toLocaleDateString("en-IN", {
    month: "short",
  })} ${new Date(currentYear, currentMonth + 1, 0).getDate()}`;

  // DAYS LEFT

  const daysLeft =
    new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() -
    today.getDate();

  // ONLY CURRENT MONTH EXPENSES

  const expenses = transactions

    .filter((t) => {
      const transactionDate = new Date(t.date);

      return (
        t.type === "expense" &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    })

    .reduce((acc, curr) => acc + curr.amount, 0);

  // LIFETIME INCOME

  const totalIncome = transactions

    .filter((t) => t.type === "income")

    .reduce((acc, curr) => acc + curr.amount, 0);

  // LIFETIME EXPENSES

  const totalExpenses = transactions

    .filter((t) => t.type === "expense")

    .reduce((acc, curr) => acc + curr.amount, 0);

  // LIFETIME BALANCE

  const lifetimeBalance = balance;

  // LIFETIME SAVINGS

  const lifetimeSavings = balance;

  const totalBalance = balance;

  const savings = balance;

  const monthlyBudget = Number(user?.monthlyBudget || 0);

  const totalSpent = expenses;

  const remainingBudget = monthlyBudget - totalSpent;
  const overBudgetAmount = Math.max(totalSpent - monthlyBudget, 0);
  const isBudgetExceeded = monthlyBudget > 0 && overBudgetAmount > 0;

  const currentDay = today.getDate();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  const expectedSpendToDate = (monthlyBudget / daysInMonth) * currentDay;
  const underPaceAmount = Math.max(expectedSpendToDate - totalSpent, 0);
  const isBudgetOnTrack =
    monthlyBudget > 0 && !isBudgetExceeded && underPaceAmount > 0;

  const dailyAverage = totalSpent / currentDay;

  const budgetUsagePercent =
    monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  const budgetUsage = Math.min(budgetUsagePercent, 100);

  const budgetState = isBudgetExceeded
    ? "exceeded"
    : isBudgetOnTrack
      ? "under"
      : "normal";

  const budgetTone = {
    exceeded: {
      icon: <FaExclamationTriangle />,
      label: "Budget Exceeded",
      title: `Over by Rs ${overBudgetAmount.toLocaleString()}`,
      description: `You have spent Rs ${totalSpent.toLocaleString()} against a monthly budget of Rs ${monthlyBudget.toLocaleString()}.`,
      shell: darkMode
        ? "bg-red-950/50 border-red-500/30 text-white"
        : "bg-red-50 border-red-200 text-slate-950",
      header: "bg-red-600",
      progress: "bg-red-600",
      accent: "text-red-500",
    },
    under: {
      icon: <FaCheckCircle />,
      label: "Good Work",
      title: `Rs ${Math.round(underPaceAmount).toLocaleString()} under pace`,
      description:
        "You are spending slower than planned for this point in the month. Keep this up.",
      shell: darkMode
        ? "bg-emerald-950/50 border-emerald-500/30 text-white"
        : "bg-emerald-50 border-emerald-200 text-slate-950",
      header: "bg-emerald-600",
      progress: "bg-emerald-600",
      accent: "text-emerald-600",
    },
    normal: {
      icon: <FaWallet />,
      label: "Steady Progress",
      title: `Rs ${remainingBudget.toLocaleString()} left`,
      description: `You have spent Rs ${totalSpent.toLocaleString()} from your Rs ${monthlyBudget.toLocaleString()} monthly budget.`,
      shell: darkMode
        ? "bg-sky-950/50 border-sky-500/30 text-white"
        : "bg-sky-50 border-sky-200 text-slate-950",
      header: "bg-sky-600",
      progress: "bg-sky-600",
      accent: "text-sky-600",
    },
  }[budgetState];

  useEffect(() => {
    if (!budgetSettings) return;

    const threshold = Number(budgetSettings?.warningThreshold || 80);

    const alreadyWarned = localStorage.getItem("budget_warning_sent");

    if (budgetUsage >= threshold && !alreadyWarned) {
      addNotification({
        title: "Budget Warning",

        message: `You have used ${Math.round(
          budgetUsage,
        )}% of your monthly budget.`,

        type: "transaction",
      });

      localStorage.setItem("budget_warning_sent", "true");
    }

    // RESET WHEN BELOW THRESHOLD

    if (budgetUsage < threshold) {
      localStorage.removeItem("budget_warning_sent");
    }
  }, [addNotification, budgetUsage, budgetSettings]);

  return (
    <div
      className={`flex min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#0f172a]" : "bg-slate-100"
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

        <div className="p-6 md:p-8">
          {/* FILTER PAGE */}

          {showFilters ? (
            <div className="mt-6">
              <FilterPanel
                filterType={filterType}
                setFilterType={setFilterType}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                sortBy={sortBy}
                setSortBy={setSortBy}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
              />

              {/* FILTERED TRANSACTIONS */}

              <div className="mt-8">
                <TransactionList
                  transactions={filteredTransactions}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                  setTransactions={setTransactions}
                  balance={balance}
                  setBalance={setBalance}
                  income={income}
                  expenses={expenses}
                  savings={savings}
                />
              </div>
            </div>
          ) : (
            <>
              {/* SUMMARY */}

              <SummaryCards
                balance={balance}
                income={totalIncome}
                expenses={totalExpenses}
                savings={balance}
              />

              {/* BUDGET CARD */}

              {/* ================= MONTHLY EXPENSE SECTION ================= */}

              {/* MONTHLY BUDGET */}

              {monthlyBudget > 0 && (
                <div
                  className={`app-surface mt-6 overflow-hidden ${budgetTone.shell}`}
                >
                  <div className={`${budgetTone.header} p-5 text-white md:p-7`}>
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                          {budgetTone.icon}
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[3px] text-white/80">
                            {budgetTone.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-white/80">
                            {budgetMonthLabel} Budget - Tracking {budgetPeriodLabel}
                          </p>
                          <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
                            {budgetTone.title}
                          </h2>
                          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">
                            {budgetTone.description}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-3xl bg-white px-6 py-5 text-center shadow-xl">
                        <p className={`text-sm font-bold uppercase tracking-[2px] ${budgetTone.accent}`}>
                          Used
                        </p>
                        <p className={`mt-1 text-4xl font-black ${budgetTone.accent}`}>
                          {Math.round(budgetUsagePercent)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div
                      className={`rounded-2xl border p-4 ${
                        darkMode
                          ? "border-white/10 bg-black/20"
                          : "border-white bg-white/80"
                      }`}
                    >
                      <div className={`mb-3 flex flex-col gap-1 text-sm font-bold uppercase tracking-[2px] sm:flex-row sm:items-center sm:justify-between ${budgetTone.accent}`}>
                        <span>
                          {budgetState === "exceeded"
                            ? "Monthly Budget Limit Crossed"
                            : budgetState === "under"
                              ? "Ahead Of Budget Pace"
                              : "Budget Progress"}
                        </span>
                        <span>
                          {budgetState === "exceeded"
                            ? `Rs ${overBudgetAmount.toLocaleString()} extra spent`
                            : budgetState === "under"
                              ? `Planned till today: Rs ${Math.round(expectedSpendToDate).toLocaleString()}`
                              : `Spent Rs ${totalSpent.toLocaleString()}`}
                        </span>
                      </div>

                      <div
                        className={`h-4 overflow-hidden rounded-full border ${
                          darkMode
                            ? "border-white/10 bg-white/10"
                            : "border-slate-100 bg-slate-100"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${budgetTone.progress}`}
                          style={{ width: `${budgetUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                      <div
                        className={`app-panel flex items-center gap-4 p-4 ${
                          darkMode ? "app-panel-dark" : "app-panel-light"
                        }`}
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-500 dark:bg-orange-500/10">
                          <FaChartLine />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Daily Average
                          </p>
                          <h3 className="mt-1 text-2xl font-bold text-orange-500">
                            Rs {Math.round(dailyAverage)}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`app-panel flex items-center gap-4 p-4 ${
                          darkMode ? "app-panel-dark" : "app-panel-light"
                        }`}
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl dark:bg-white/10 ${
                          budgetState === "exceeded"
                            ? "bg-red-100 text-red-500"
                            : "bg-emerald-100 text-emerald-600"
                        }`}>
                          <FaWallet />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {budgetState === "exceeded" ? "Overspent" : "Remaining"}
                          </p>
                          <h3 className={`mt-1 text-2xl font-bold ${budgetTone.accent}`}>
                            Rs {(budgetState === "exceeded" ? overBudgetAmount : remainingBudget).toLocaleString()}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`app-panel flex items-center gap-4 p-4 ${
                          darkMode ? "app-panel-dark" : "app-panel-light"
                        }`}
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-500 dark:bg-blue-500/10">
                          <FaCalendarAlt />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Days Left
                          </p>
                          <h3 className="mt-1 text-2xl font-bold text-blue-500">
                            {daysLeft} Days
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ANALYTICS */}

              <div className="mt-6">
                <AnalyticsSection transactions={transactions} />
              </div>

              {/* TRANSACTIONS */}

              {/* TRANSACTIONS */}

              <div className="mt-6">
                {transactions.length === 0 ? (
                  <div
                    className={`app-surface p-6 ${
                      darkMode ? "app-surface-dark" : "app-surface-light"
                    }`}
                  >
                    {/* Header */}

                    <div className="text-center">
                      <h2
                        className={`text-4xl font-bold mt-4 ${
                          darkMode ? "text-white" : "text-[#0f172a]"
                        }`}
                      >
                        Welcome to Finance Tracker
                      </h2>

                      <p
                        className={`mt-4 max-w-2xl mx-auto ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Add your first transaction to unlock analytics,
                        budgeting, spending insights and financial reports.
                      </p>
                    </div>

                    {/* Divider */}

<div className="my-7 border-t-2 border-gray-600 dark:border-gray-500/50"></div>
                    {/* Feature Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div
                        className={`app-panel p-4 flex items-center gap-5 ${
                          darkMode
                            ? "app-panel-dark"
                            : "app-panel-light"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-[#fff3d6] dark:bg-yellow-500/10 flex items-center justify-center shadow-sm">
                          <span className="text-3xl">📊</span>
                        </div>

                        <div>
                          <p className="text-gray-500 dark:text-gray-400 text-base">
                            View
                          </p>

                          <h3 className="text-2xl font-bold text-orange-500 mt-1">
                            Analytics
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`app-panel p-4 flex items-center gap-5 ${
                          darkMode
                            ? "app-panel-dark"
                            : "app-panel-light"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-[#dff7e6] dark:bg-green-500/10 flex items-center justify-center shadow-sm">
                          <span className="text-3xl">💰</span>
                        </div>

                        <div>
                          <p className="text-gray-500 dark:text-gray-400 text-base">
                            Manage
                          </p>

                          <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                            Budget
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`app-panel p-4 flex items-center gap-5 ${
                          darkMode
                            ? "app-panel-dark"
                            : "app-panel-light"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-[#dbe8ff] dark:bg-blue-500/10 flex items-center justify-center shadow-sm">
                          <span className="text-3xl">📈</span>
                        </div>

                        <div>
                          <p className="text-gray-500 dark:text-gray-400 text-base">
                            Generate
                          </p>

                          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                            Reports
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <TransactionList
                    transactions={filteredTransactions.slice(0, 5)}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    setTransactions={setTransactions}
                    balance={balance}
                    setBalance={setBalance}
                    income={income}
                    expenses={expenses}
                    savings={savings}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ADD TRANSACTION MODAL */}

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(transaction, currentBalance) => {
          addTransaction(transaction);
          setBalance(currentBalance);

          addNotification({
            title: "Transaction Added",

            message: `${transaction.category} transaction of ₹${transaction.amount} added successfully.`,

            type: "transaction",
          });

          setIsModalOpen(false);
        }}
      />

      <FloatingButton onClick={() => setIsModalOpen(true)} />
    </div>
  );
}
