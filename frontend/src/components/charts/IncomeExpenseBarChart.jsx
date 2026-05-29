"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { useTheme } from "@/context/ThemeContext";

export default function IncomeExpenseBarChart({ transactions }) {
  const { darkMode } = useTheme();

  // MONTHLY DATA

  const monthlyData = {};

  transactions.forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,

        income: 0,

        expense: 0,
      };
    }

    if (item.type === "income") {
      monthlyData[month].income += item.amount;
    } else {
      monthlyData[month].expense += item.amount;
    }
  });

  const chartData = Object.values(monthlyData);

  return (
    <div
      className={`p-7 rounded-[30px] shadow-2xl ${
        darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Income vs Expense</h1>

        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Monthly financial comparison
        </p>
      </div>

      {/* CHART */}

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="month" stroke={darkMode ? "#94a3b8" : "#475569"} />

            <YAxis stroke={darkMode ? "#94a3b8" : "#475569"} />

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1e293b" : "#ffffff",

                border: "none",

                borderRadius: "16px",
              }}
            />

            <Legend />

            <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />

            <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
