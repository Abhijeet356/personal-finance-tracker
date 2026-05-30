"use client";

import { FaFilter } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function FilterPanel({
  filterType,
  setFilterType,

  filterCategory,
  setFilterCategory,

  paymentMethod,
  setPaymentMethod,

  sortBy,
  setSortBy,

  showFilters,
  setShowFilters,
}) {
  const { darkMode } = useTheme();

  return (
    <div className="mb-8">
      {/* FILTER PANEL */}

      {showFilters && (
        <div
          className={`mt-5 rounded-3xl p-5 shadow-xl transition-all duration-300 ${
            darkMode ? "bg-[#111827] text-white" : "bg-white text-black"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">
            Sort & Filter Transactions
          </h1>

          {/* QUICK FILTER BUTTONS */}

          <div className="flex flex-wrap gap-3 mb-8">
            {/* TODAY */}

            <button
              onClick={() =>
                setSortBy(sortBy === "newest" ? "default" : "newest")
              }
              className={`px-4 py-2 rounded-xl transition-all border-2 ${
                sortBy === "newest"
                  ? "bg-violet-600 text-white border-violet-600 scale-105"
                  : darkMode
                    ? "bg-slate-700 hover:bg-violet-600 text-white border-transparent"
                    : "bg-slate-200 hover:bg-violet-500 hover:text-white border-transparent"
              }`}
            >
              Today
            </button>

            {/* THIS WEEK */}

            <button
              onClick={() =>
                setSortBy(sortBy === "oldest" ? "default" : "oldest")
              }
              className={`px-4 py-2 rounded-xl transition-all border-2 ${
                sortBy === "oldest"
                  ? "bg-blue-600 text-white border-blue-600 scale-105"
                  : darkMode
                    ? "bg-slate-700 hover:bg-blue-600 text-white border-transparent"
                    : "bg-slate-200 hover:bg-blue-500 hover:text-white border-transparent"
              }`}
            >
              This Week
            </button>

            {/* THIS MONTH */}

            <button
              onClick={() =>
                setSortBy(sortBy === "highest" ? "default" : "highest")
              }
              className={`px-4 py-2 rounded-xl transition-all border-2 ${
                sortBy === "highest"
                  ? "bg-yellow-500 text-black border-yellow-500 scale-105"
                  : darkMode
                    ? "bg-slate-700 hover:bg-yellow-500 hover:text-black text-white border-transparent"
                    : "bg-slate-200 hover:bg-yellow-400 border-transparent"
              }`}
            >
              This Month
            </button>

            {/* INCOME */}

            <button
              onClick={() =>
                setFilterType(filterType === "income" ? "all" : "income")
              }
              className={`px-4 py-2 rounded-xl transition-all border-2 ${
                filterType === "income"
                  ? "bg-green-500 text-white border-green-500 scale-105"
                  : darkMode
                    ? "bg-slate-700 hover:bg-green-500 text-white border-transparent"
                    : "bg-slate-200 hover:bg-green-500 hover:text-white border-transparent"
              }`}
            >
              Income
            </button>

            {/* EXPENSE */}

            <button
              onClick={() =>
                setFilterType(filterType === "expense" ? "all" : "expense")
              }
              className={`px-4 py-2 rounded-xl transition-all border-2 ${
                filterType === "expense"
                  ? "bg-red-500 text-white border-red-500 scale-105"
                  : darkMode
                    ? "bg-slate-700 hover:bg-red-500 text-white border-transparent"
                    : "bg-slate-200 hover:bg-red-500 hover:text-white border-transparent"
              }`}
            >
              Expense
            </button>
          </div>

          {/* DROPDOWNS */}

          <div className="grid md:grid-cols-3 gap-6">
            {/* PAYMENT MODE */}

            <div>
              <label
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Payment Mode
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    paymentMethod === e.target.value ? "all" : e.target.value,
                  )
                }
                style={{
                  colorScheme: darkMode ? "dark" : "light",
                }}
                className={`w-full mt-2 rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              >
                <option value="all">All Methods</option>

                <option value="upi">UPI</option>

                <option value="cash">Cash</option>

                <option value="card">Card</option>

                <option value="bank_transfer">Net Banking</option>

                <option value="other">Other</option>

              </select>
            </div>

            {/* CATEGORY */}

            <div>
              <label
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Category
              </label>

              <select
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(
                    filterCategory === e.target.value ? "all" : e.target.value,
                  )
                }
                style={{
                  colorScheme: darkMode ? "dark" : "light",
                }}
                className={`w-full mt-2 rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              >
                <option value="all">All Categories</option>

                <option value="Food">Food</option>

                <option value="Shopping">Shopping</option>

                <option value="Travel">Travel</option>

                <option value="Bills">Bills</option>

                <option value="Entertainment">Entertainment</option>

                <option value="Other">Other</option>
              </select>
            </div>

            {/* SORT */}

            <div>
              <label
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Sort By
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  colorScheme: darkMode ? "dark" : "light",
                }}
                className={`w-full mt-2 rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              >
                <option value="default">Default</option>

                <option value="newest">Newest First</option>

                <option value="oldest">Oldest First</option>

                <option value="highest">Highest Amount</option>

                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>

          {/* RESET */}

          <div className="flex gap-5 mt-8">
            <button
              onClick={() => {
                setFilterType("all");

                setFilterCategory("all");

                setSortBy("default");
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-2xl hover:bg-red-600 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
