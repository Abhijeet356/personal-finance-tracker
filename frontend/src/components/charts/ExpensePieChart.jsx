"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTheme } from "@/context/ThemeContext";

const CATEGORY_COLORS = [ "#ec4899", "#2563eb", "#7c3aed", "#f59e0b", "#14b8a6", "#ef4444", "#8b5cf6",];

export default function ExpensePieChart({ transactions, isDashboard = false }) {
  const { darkMode } = useTheme();

  // CURRENT MONTH FILTER
  const chartTransactions = isDashboard
    ? transactions.filter((item) => {
        const transactionDate = new Date(item.date);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear &&
          item.type === "expense"
        );
      })
    : transactions.filter((item) => item.type === "expense");

  // CATEGORY TOTALS

  const categoryTotals = {};
  chartTransactions.forEach((item) => {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += item.amount;
  });

  // PIE DATA
  const pieData = Object.keys(categoryTotals)
    .map((category) => ({
      name: category,
      value: categoryTotals[category],
    }))
    .sort((a, b) => b.value - a.value);
  const totalExpense = pieData.reduce((sum, item) => sum + item.value, 0);
  const legendData = pieData.map((item, index) => ({
    ...item,
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    percentage:
      totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0,
  }));
  const surfaceClass = darkMode
    ? "app-surface-dark"
    : "bg-white text-slate-950 border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.08)]";
  const mutedTextClass = darkMode ? "text-slate-400" : "text-slate-600";

  return (
    <div
      className={`app-surface overflow-hidden p-6 ${surfaceClass}`}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Monthly Expense Breakdown</h1>

        <p className={`mt-2 ${mutedTextClass}`}>
          Category-wise spending overview
        </p>
      </div>

      {/* PIE CHART */}
      <div className="grid min-h-[320px] items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {pieData.length > 0 ? (
          <div className="h-[280px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={112}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="transparent"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    `\u20b9${Number(value).toLocaleString()}`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
                    border: darkMode
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(148,163,184,0.35)",
                    borderRadius: "14px",
                    color: darkMode ? "white" : "#0f172a",
                    boxShadow: "0 18px 40px rgba(15,23,42,0.18)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-[280px] items-center justify-center">
            <div
              className={`flex h-44 w-44 items-center justify-center rounded-full border-[34px] ${
                darkMode ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <span className={`text-sm font-semibold ${mutedTextClass}`}>
                No expenses
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {legendData.length > 0 ? (
            legendData.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
              >
                <span
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className={`min-w-0 truncate text-base font-medium ${
                    darkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`text-base font-semibold ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {item.percentage}%
                </span>
              </div>
            ))
          ) : (
            <div
              className={`rounded-2xl border p-5 text-sm font-medium ${
                darkMode
                  ? "border-white/10 bg-white/5 text-slate-400"
                  : "border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              Add expenses to see category shares.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
