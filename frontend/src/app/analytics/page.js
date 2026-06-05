"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import FilterPanel from "@/components/FilterPanel";
import AddTransactionModal from "@/components/AddTransactionModal";

import CategoryRanking from "@/components/CategoryRanking";
import SmartInsights from "@/components/SmartInsights";
import TransactionList from "@/components/TransactionList";

import { useTheme } from "@/context/ThemeContext";

import { useNotifications } from "@/context/NotificationContext";

import { useTransactions } from "@/context/TransactionContext";

const TrendChart = dynamic(() => import("@/components/charts/TrendChart"), {
  ssr: false,
});
const ExpensePieChart = dynamic(
  () => import("@/components/charts/ExpensePieChart"),
  { ssr: false },
);
const IncomeExpenseBarChart = dynamic(
  () => import("@/components/charts/IncomeExpenseBarChart"),
  { ssr: false },
);
const SavingsGrowthChart = dynamic(
  () => import("@/components/charts/SavingsGrowthChart"),
  { ssr: false },
);

export default function AnalyticsPage() {
  const { darkMode } = useTheme();
  const { addNotification } = useNotifications();
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

  // DATE FILTERS

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  // DATE FILTERED DATA

  const analyticsTransactions = transactions.filter((item) => {
    
    const transactionDate = new Date(item.date);

    if (fromDate && transactionDate < new Date(fromDate)) {
      return false;
    }

    if (toDate && transactionDate > new Date(toDate)) {
      return false;
    }

    return true;
  });

  const expenseTransactions = analyticsTransactions.filter(
  (item) => item.type === "expense"
);

  // TOTALS

  const totalIncome = analyticsTransactions

    .filter((item) => item.type === "income")

    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = analyticsTransactions

    .filter((item) => item.type === "expense")

    .reduce((acc, item) => acc + item.amount, 0);

  const savings = totalIncome - totalExpense;

  return (
    <div
      className={`flex min-h-screen ${
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
                  setTransactions={setTransactions}
                  balance={savings}
                  setBalance={() => {}}
                  income={totalIncome}
                  expenses={totalExpense}
                  savings={savings}
                />
              </div>
            </div>
          ) : (
            <>
              {/* HEADER */}

              <div className="mb-8">
                <h1
                  className={`text-5xl font-bold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Analytics Dashboard
                </h1>
              </div>

              {/* DATE FILTERS */}

              <div className="flex flex-wrap gap-5 mb-10">
                {/* FROM */}

                <div>
                  <label
                    className={`block mb-2 font-semibold ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    From Date
                  </label>

                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    style={{
                      colorScheme: darkMode ? "dark" : "light",
                    }}
                    className={`app-field px-5 py-3 ${
                      darkMode ? "app-field-dark" : "app-field-light"
                    }`}
                  />
                </div>

                {/* TO */}

                <div>
                  <label
                    className={`block mb-2 font-semibold ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    To Date
                  </label>

                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    style={{
                      colorScheme: darkMode ? "dark" : "light",
                    }}
                    className={`app-field px-5 py-3 ${
                      darkMode ? "app-field-dark" : "app-field-light"
                    }`}
                  />
                </div>

                {/* RESET */}

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFromDate("");
                      setToDate("");
                    }}
                    className="app-button app-button-danger px-6 py-3"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* SUMMARY CARDS */}

              <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6 mb-10">
                <div
                  className={`app-surface p-6 ${
                    darkMode ? "app-surface-dark" : "app-surface-light"
                  }`}
                >
                  <p className="text-lg">Total Income</p>

                  <h1 className="text-4xl font-bold text-green-500 mt-3">
                    ₹{totalIncome.toLocaleString()}
                  </h1>
                </div>

                <div
                  className={`app-surface p-6 ${
                    darkMode ? "app-surface-dark" : "app-surface-light"
                  }`}
                >
                  <p className="text-lg">Total Expense</p>

                  <h1 className="text-4xl font-bold text-red-500 mt-3">
                    ₹{totalExpense.toLocaleString()}
                  </h1>
                </div>

                <div
                  className={`app-surface p-6 ${
                    darkMode ? "app-surface-dark" : "app-surface-light"
                  }`}
                >
                  <p className="text-lg">Savings</p>

                  <h1 className="text-4xl font-bold text-violet-500 mt-3">
                    ₹{savings.toLocaleString()}
                  </h1>
                </div>
              </div>

              {/* CHARTS */}

              <div className="grid xl:grid-cols-2 gap-8 mb-10">
                <TrendChart transactions={expenseTransactions} />

                <ExpensePieChart transactions={expenseTransactions} />
              </div>

              <div className="mt-8">
                <IncomeExpenseBarChart transactions={analyticsTransactions} />
              </div>

              <div className="mt-8">
                <SavingsGrowthChart transactions={analyticsTransactions} />
              </div>

              <div className="mt-8">
                <CategoryRanking transactions={analyticsTransactions} />
              </div>

              <div className="mt-8">
                <SmartInsights transactions={analyticsTransactions} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL */}

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
    </div>
  );
}
