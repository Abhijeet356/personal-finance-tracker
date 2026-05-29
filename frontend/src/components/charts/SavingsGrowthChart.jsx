"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useTheme } from "@/context/ThemeContext";

export default function SavingsGrowthChart({ transactions }) {
  const { darkMode } = useTheme();

  // SORT BY DATE

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // RUNNING BALANCE

  let balance = 0;

  const chartData = sortedTransactions.map((item) => {
    if (item.type === "income") {
      balance += item.amount;
    } else {
      balance -= item.amount;
    }

    return {
      date: new Date(item.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),

      balance,
    };
  });

  return (
    <div
      className={`p-7 rounded-[30px] shadow-2xl ${
        darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Savings Growth</h1>

        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Balance growth over time
        </p>
      </div>

      {/* CHART */}

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke={darkMode ? "#94a3b8" : "#475569"} />

            <YAxis stroke={darkMode ? "#94a3b8" : "#475569"} />

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1e293b" : "#ffffff",

                border: "none",

                borderRadius: "16px",
              }}
            />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
