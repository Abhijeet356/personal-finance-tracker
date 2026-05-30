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
import BalanceModal from "@/components/BalanceModal";
import { useState, useEffect } from "react";
import AddTransactionModal from "@/components/AddTransactionModal";
import FloatingButton from "@/components/FloatingButton";
import { useNotifications } from "@/context/NotificationContext";
import { useTransactions } from "@/context/TransactionContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

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

        console.log(response.data);

        setUser(response.data.user);
        setUserData(response.data.user);
        setBalance(response.data.user.currentBalance || 0);
        console.log("Monthly Budget:", response.data.user.monthlyBudget);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        router.push("/");
      }
    };

    checkAuth();
  }, []);

  // useEffect(() => {
  //   const savedBalance = localStorage.getItem("balance");

  //   if (savedBalance) {
  //     setBalance(Number(savedBalance));
  //   } else {
  //     setShowBalanceModal(true);
  //   }
  // }, []);

  // TOTALS

  const income = filteredTransactions

    .filter((t) => t.type === "income")

    .reduce((acc, curr) => acc + curr.amount, 0);

  // CURRENT MONTH + YEAR

  const currentMonth = new Date().getMonth();

  const currentYear = new Date().getFullYear();

  // DAYS LEFT

  const today = new Date();

  const daysLeft =
    new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() -
    today.getDate();

  // ONLY CURRENT MONTH EXPENSES

  const expenses = filteredTransactions

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

  const totalIncome = filteredTransactions

    .filter((t) => t.type === "income")

    .reduce((acc, curr) => acc + curr.amount, 0);

  // LIFETIME EXPENSES

  const totalExpenses = filteredTransactions

    .filter((t) => t.type === "expense")

    .reduce((acc, curr) => acc + curr.amount, 0);

  // LIFETIME BALANCE

  const lifetimeBalance = balance - totalExpenses + totalIncome;

  // LIFETIME SAVINGS

  const lifetimeSavings = lifetimeBalance;

  const totalBalance = balance - expenses + income;

  const savings = totalBalance;

  const monthlyBudget = Number(user?.monthlyBudget || 0);

  const totalSpent = expenses;

  const remainingBudget = monthlyBudget - totalSpent;

  const currentDay = new Date().getDate();

  const dailyAverage = totalSpent / currentDay;

  const budgetUsage =
    monthlyBudget > 0 ? Math.min((totalSpent / monthlyBudget) * 100, 100) : 0;

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
  }, [budgetUsage, budgetSettings]);

  //================== TEST=================

  console.log("USER:", user);
  console.log("TRANSACTIONS:", transactions);
  //===========================

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

      <div className="flex-1 min-w-0 ml-[260px]">
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
                balance={lifetimeBalance}
                income={totalIncome}
                expenses={totalExpenses}
                savings={lifetimeSavings}
              />

              {/* BUDGET CARD */}

              {/* ================= MONTHLY EXPENSE SECTION ================= */}

              {/* MONTHLY BUDGET */}

              {/* MONTHLY BUDGET */}

              {monthlyBudget > 0 && (
                <div
                  className={`mt-6 rounded-[36px] border shadow-xl p-5 md:p-6
     transition-all duration-300 ${
       darkMode ? "bg-[#0f172a] border-white/10" : "bg-white border-gray-100"
     }`}
                >
                  {/* TOP */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    {/* LEFT */}
                    <div className="flex-1">
                      <p className="uppercase tracking-[3px] text-xs md:text-sm text-gray-500 dark:text-gray-500 font-bold">
                        Monthly Budget
                      </p>

                      <h2
                        className={`text-5xl md:text-6xl font-bold mt-3 ${
                          darkMode ? "text-white" : "text-[#0f172a]"
                        }`}
                      >
                        {" "}
                        ₹{monthlyBudget.toLocaleString()}
                      </h2>

                      <p className="text-gray-500 dark:text-gray-500 mt-4 text-base md:text-lg">
                        ₹{remainingBudget.toLocaleString()} remaining from this
                        month&apos;s budget
                      </p>
                    </div>

                    {/* RIGHT CIRCLE */}
                    <div className="flex flex-col items-center justify-center mx-auto lg:mx-0">
                      <div className="relative w-36 h-36">
                        <svg
                          className="w-full h-full -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          {/* Background Circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            strokeWidth="10"
                            className="stroke-gray-200 dark:stroke-white/10 fill-none"
                          />

                          {/* Progress Circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            strokeWidth="10"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={264}
                            strokeDashoffset={264 - (264 * budgetUsage) / 100}
                            stroke="url(#gradient)"
                            className="transition-all duration-700"
                          />

                          {/* Gradient */}
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#facc15" />

                              <stop offset="50%" stopColor="#fb923c" />

                              <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* CENTER TEXT */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`text-3xl font-bold ${
                              darkMode ? "text-white" : "text-[#0f172a]"
                            }`}
                          >
                            {" "}
                            {Math.round(budgetUsage)}%
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium text-lg">
                        Budget Used
                      </p>
                    </div>
                  </div>

                  {/* SPENT */}
                  <div className="mt-6">
                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg font-bold">
                      Spent ₹{totalSpent.toLocaleString()}
                    </p>

                    {/* Progress Bar */}
                    <div
                      className={`w-full h-4 rounded-full overflow-hidden border ${
                        darkMode
                          ? "bg-white/10 border-white/10"
                          : "bg-gray-200 border-gray-300"
                      }`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 transition-all duration-700"
                        style={{ width: `${budgetUsage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-5 border-t border-gray-100 dark:border-white/10"></div>

                  {/* STATS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Daily Average */}
                    <div
                      className={`rounded-3xl p-4 flex items-center gap-5 border ${
                        darkMode
                          ? "bg-white/[0.03] border-white/5"
                          : "bg-[#faf7ef] border-transparent"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#fff3d6] dark:bg-yellow-500/10 flex items-center justify-center shadow-sm">
                        <span className="text-3xl">📈</span>
                      </div>

                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          Daily Average
                        </p>

                        <h3 className="text-3xl font-bold text-orange-500 mt-1">
                          ₹{Math.round(dailyAverage)}{" "}
                        </h3>
                      </div>
                    </div>

                    {/* Remaining */}
                    <div
                      className={`rounded-3xl p-4 flex items-center gap-5 border ${
                        darkMode
                          ? "bg-green-500/5 border-green-500/10"
                          : "bg-[#eefbf2] border-transparent"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#dff7e6] dark:bg-green-500/10 flex items-center justify-center shadow-sm">
                        <span className="text-3xl">💰</span>
                      </div>

                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          Remaining
                        </p>

                        <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                          ₹{remainingBudget.toLocaleString()}
                        </h3>
                      </div>
                    </div>

                    {/* Days Left */}
                    <div
                      className={`rounded-3xl p-4 flex items-center gap-5 border ${
                        darkMode
                          ? "bg-blue-500/5 border-blue-500/10"
                          : "bg-[#eef4ff] border-transparent"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#dbe8ff] dark:bg-blue-500/10 flex items-center justify-center shadow-sm">
                        <span className="text-3xl">📅</span>
                      </div>

                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                          Days Left
                        </p>

                        <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                          {daysLeft} Days
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ANALYTICS */}

              <div className="mt-6">
                <AnalyticsSection transactions={filteredTransactions} />
              </div>

              {/* TRANSACTIONS */}

              <div className="mt-6">
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
  // setIncome={setIncome}
  // setExpenses={setExpenses}
  // setSavings={setSavings}
/>
              </div>
            </>
          )}
        </div>
      </div>

      {/* BALANCE MODAL */}

      {/* {showBalanceModal && (
        <BalanceModal
          setBalance={setBalance}
          closeModal={() => setShowBalanceModal(false)}
        />
      )} */}

      {/* ADD TRANSACTION MODAL */}

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(transaction) => {
          addTransaction(transaction);

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
