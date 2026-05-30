"use client";

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
          className={`app-surface mt-5 p-6 ${
            darkMode ? "app-surface-dark" : "app-surface-light"
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
              className={`app-button px-4 py-2 ${
                sortBy === "newest"
                  ? "app-button-primary"
                  : darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Today
            </button>

            {/* THIS WEEK */}

            <button
              onClick={() =>
                setSortBy(sortBy === "oldest" ? "default" : "oldest")
              }
              className={`app-button px-4 py-2 ${
                sortBy === "oldest"
                  ? "bg-sky-600 text-white hover:bg-sky-700"
                  : darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              This Week
            </button>

            {/* THIS MONTH */}

            <button
              onClick={() =>
                setSortBy(sortBy === "highest" ? "default" : "highest")
              }
              className={`app-button px-4 py-2 ${
                sortBy === "highest"
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                  : darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              This Month
            </button>

            {/* INCOME */}

            <button
              onClick={() =>
                setFilterType(filterType === "income" ? "all" : "income")
              }
              className={`app-button px-4 py-2 ${
                filterType === "income"
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Income
            </button>

            {/* EXPENSE */}

            <button
              onClick={() =>
                setFilterType(filterType === "expense" ? "all" : "expense")
              }
              className={`app-button px-4 py-2 ${
                filterType === "expense"
                  ? "app-button-danger"
                  : darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
                className={`app-field mt-2 ${
                  darkMode ? "app-field-dark" : "app-field-light"
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
                className={`app-field mt-2 ${
                  darkMode ? "app-field-dark" : "app-field-light"
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
                className={`app-field mt-2 ${
                  darkMode ? "app-field-dark" : "app-field-light"
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
              className="app-button app-button-danger px-6 py-3"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
