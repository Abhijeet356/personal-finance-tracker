"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import FilterPanel from "@/components/FilterPanel";
import AddTransactionModal from "@/components/AddTransactionModal";

import TrendChart from "@/components/charts/TrendChart";
import ExpensePieChart from "@/components/charts/ExpensePieChart";
import IncomeExpenseBarChart from "@/components/charts/IncomeExpenseBarChart";
import SavingsGrowthChart from "@/components/charts/SavingsGrowthChart";

import CategoryRanking from "@/components/CategoryRanking";
import SmartInsights from "@/components/SmartInsights";
import TransactionList from "@/components/TransactionList";

import { useTheme } from "@/context/ThemeContext";

import { useNotifications } from "@/context/NotificationContext";

import { useTransactions } from "@/context/TransactionContext";

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

    paymentMode,
    setPaymentMode,

    sortBy,
    setSortBy,

    addTransaction,
  } = useTransactions();

  // DATE FILTERS

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  // DATE FILTERED DATA

  const analyticsTransactions = filteredTransactions.filter((item) => {
    const transactionDate = new Date(item.date);

    if (fromDate && transactionDate < new Date(fromDate)) {
      return false;
    }

    if (toDate && transactionDate > new Date(toDate)) {
      return false;
    }

    return true;
  });

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
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
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
                    className={`px-5 py-3 rounded-2xl border-2 outline-none ${
                      darkMode
                        ? "bg-slate-800 border-slate-600 text-white"
                        : "bg-white border-slate-300 text-black"
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
                    className={`px-5 py-3 rounded-2xl border-2 outline-none ${
                      darkMode
                        ? "bg-slate-800 border-slate-600 text-white"
                        : "bg-white border-slate-300 text-black"
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
                    className="bg-red-500 text-white px-6 py-3 rounded-2xl hover:bg-red-600 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* SUMMARY CARDS */}

              <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6 mb-10">
                <div
                  className={`p-6 rounded-[28px] shadow-xl ${
                    darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <p className="text-lg">Total Income</p>

                  <h1 className="text-4xl font-bold text-green-500 mt-3">
                    ₹{totalIncome.toLocaleString()}
                  </h1>
                </div>

                <div
                  className={`p-6 rounded-[28px] shadow-xl ${
                    darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <p className="text-lg">Total Expense</p>

                  <h1 className="text-4xl font-bold text-red-500 mt-3">
                    ₹{totalExpense.toLocaleString()}
                  </h1>
                </div>

                <div
                  className={`p-6 rounded-[28px] shadow-xl ${
                    darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
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
                <TrendChart transactions={analyticsTransactions} />

                <ExpensePieChart transactions={analyticsTransactions} />
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
