"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useTheme } from "@/context/ThemeContext";

export default function TrendChart({ transactions, isDashboard = false }) {
  const { darkMode } = useTheme();

  // CURRENT MONTH FILTER
  const chartTransactions = isDashboard
    ? transactions.filter((item) => {
        const transactionDate = new Date(item.date);

        const currentMonth = new Date().getMonth();

        const currentYear = new Date().getFullYear();

        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
    : transactions;

  // GRAPH DATA

  const chartData = [...chartTransactions]

    .sort((a, b) => new Date(a.date) - new Date(b.date))

    .map((item) => ({
      day: new Date(item.date).getDate(),

      amount: item.amount,
    }));

  return (
    <div
      className={`app-surface p-6 ${
        darkMode ? "app-surface-dark" : "app-surface-light"
      }`}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Monthly Spending Trend</h1>

        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Current month expenses overview
        </p>
      </div>

      {/* CHART */}

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />

                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="day" stroke={darkMode ? "#94a3b8" : "#475569"} />

            <YAxis stroke={darkMode ? "#94a3b8" : "#475569"} />

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1e293b" : "#ffffff",

                border: "none",

                borderRadius: "16px",

                color: darkMode ? "white" : "black",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8b5cf6"
              strokeWidth={4}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
