"use client";

import { useTheme } from "@/context/ThemeContext";
import {
  FaCalendar,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaWallet,
  FaTags,
  FaArrowDownWideShort,
  FaRotateLeft,
} from "react-icons/fa6";
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
  dateFilter,
  setDateFilter,
}) {
  const { darkMode } = useTheme();

  return (
    <div className="mb-8">
      {showFilters && (
        <>
          <div className="mb-8">
            <h1
              className={`text-4xl font-black tracking-tight md:text-5xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Sort & Filter Transactions
            </h1>

            <p
              className={`mt-3 text-lg ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Refine and organize your transaction history.
            </p>
          </div>

          <div
            className={`app-surface mt-5 p-8 rounded-[28px] border-l-4 border-l-violet-500 ${
              darkMode
                ? "app-surface-dark shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                : "app-surface-light shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
            }`}
          >
            {/* QUICK FILTER BUTTONS */}

            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 rounded-full bg-violet-600"></div>

              <div>
                <h3
                  className={`font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Quick Filters
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {/* TODAY */}
              <button
                onClick={() =>
                  setDateFilter(dateFilter === "today" ? "all" : "today")
                }
                className={`app-button px-4 py-2 ${
                  dateFilter === "today"
                    ? "app-button-primary scale-105 shadow-lg"
                    : darkMode
                      ? "bg-slate-800 text-white hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-xs" />
                  <span>Today</span>
                </div>
              </button>

              {/* THIS WEEK */}
              <button
                onClick={() =>
                  setDateFilter(dateFilter === "week" ? "all" : "week")
                }
                className={`app-button px-4 py-2 ${
                  dateFilter === "week"
                    ? "app-button-primary scale-105 shadow-lg"
                    : darkMode
                      ? "bg-slate-800 text-white hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-xs" />
                  <span>This Week</span>
                </div>
              </button>

              {/* THIS MONTH */}
              <button
                onClick={() =>
                  setDateFilter(dateFilter === "month" ? "all" : "month")
                }
                className={`app-button px-4 py-2 ${
                  dateFilter === "month"
                    ? "app-button-primary scale-105 shadow-lg"
                    : darkMode
                      ? "bg-slate-800 text-white hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-xs" />
                  <span>This Month</span>
                </div>
              </button>

              {/* INCOME */}
              <button
                onClick={() =>
                  setFilterType(filterType === "income" ? "all" : "income")
                }
                className={`app-button px-4 py-2 ${
                  filterType === "income"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 scale-105 shadow-lg"
                    : darkMode
                      ? "bg-slate-800 text-white hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaArrowTrendUp className="text-xs" />
                  <span>Income</span>
                </div>
              </button>

              {/* EXPENSE */}
              <button
                onClick={() =>
                  setFilterType(filterType === "expense" ? "all" : "expense")
                }
                className={`app-button px-4 py-2 ${
                  filterType === "expense"
                    ? "app-button-danger scale-105 shadow-lg"
                    : darkMode
                      ? "bg-slate-800 text-white hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaArrowTrendDown className="text-xs" />
                  <span>Expense</span>
                </div>
              </button>
            </div>

            {/* DROPDOWNS */}
            <div
              className={`my-8 border-t ${
                darkMode ? "border-slate-700" : "border-slate-300"
              }`}
            />

            <div className="flex items-center gap-3 mb-5 mt-8">
              <div className="h-6 w-1 rounded-full bg-violet-600"></div>

              <div>
                <h3
                  className={`font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Advanced Filters
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* PAYMENT MODE */}

              <div>
                <label
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  <label className="flex items-center gap-2 font-semibold">
                    <FaWallet className="text-violet-500 text-sm" />
                    Payment Mode
                  </label>
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
                  <option
                    value="all" className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    All Methods
                  </option>

                  <option
                    value="upi" className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    UPI
                  </option>

                  <option 
                    value="cash" className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Cash
                  </option>

                  <option
                    value="card" className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Card
                  </option>

                  <option
                    value="bank_transfer" className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Net Banking
                  </option>

                  <option
                    value="other" className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Other
                  </option>
                </select>
              </div>

              {/* CATEGORY */}

              <div>
                <label
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  <label className="flex items-center gap-2 font-semibold">
                    <FaTags className="text-violet-500 text-sm" />
                    Category
                  </label>
                </label>

                <select
                  value={filterCategory}
                  onChange={(e) =>
                    setFilterCategory(
                      filterCategory === e.target.value
                        ? "all"
                        : e.target.value,
                    )
                  }
                  style={{
                    colorScheme: darkMode ? "dark" : "light",
                  }}
                  className={`app-field mt-2 ${
                    darkMode ? "app-field-dark" : "app-field-light"
                  }`}
                >
                  <option
                    value="all"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    All Categories
                  </option>

                  <option
                    value="Food"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Food
                  </option>

                  <option
                    value="Shopping"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Shopping
                  </option>

                  <option
                    value="Travel"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Travel
                  </option>

                  <option
                    value="Bills"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Bills
                  </option>

                  <option
                    value="Entertainment"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Entertainment
                  </option>

                  <option
                    value="Other"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Other
                  </option>
                </select>
              </div>

              {/* SORT */}

              <div>
                <label
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  <label className="flex items-center gap-2 font-semibold">
                    <FaArrowDownWideShort className="text-violet-500 text-sm" />
                    Sort By
                  </label>
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
                  <option
                    value="default"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Default
                  </option>

                  <option
                    value="newest"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Newest First
                  </option>

                  <option
                    value="oldest"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Oldest First
                  </option>

                  <option
                    value="highest"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Highest Amount
                  </option>

                  <option
                    value="lowest"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Lowest Amount
                  </option>
                </select>
              </div>
            </div>

            {/* RESET */}

            <div className="flex gap-5 mt-8">
              <button
                onClick={() => {
                  setFilterType("all");
                  setPaymentMethod("all");
                  setFilterCategory("all");
                  setSortBy("default");
                  setDateFilter("all");
                }}
                className="app-button app-button-danger px-6 py-3 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <FaRotateLeft />
                Reset Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
