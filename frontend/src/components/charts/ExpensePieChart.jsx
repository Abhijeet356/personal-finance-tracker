"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

import { useTheme } from "@/context/ThemeContext";

const COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

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

  const pieData = Object.keys(categoryTotals).map((category) => ({
    name: category,

    value: categoryTotals[category],
  }));

  return (
    <div
      className={`app-surface p-6 ${
        darkMode ? "app-surface-dark" : "app-surface-light"
      }`}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Monthly Expense Breakdown</h1>

        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Category-wise spending overview
        </p>
      </div>

      {/* PIE CHART */}

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height={320} minWidth={0}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1e293b" : "#ffffff",

                border: "none",

                borderRadius: "16px",

                color: darkMode ? "white" : "black",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
