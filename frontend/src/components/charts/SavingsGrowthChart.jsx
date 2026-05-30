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

  const chartData = sortedTransactions.reduce((data, item) => {
    const previousBalance = data.at(-1)?.balance || 0;
    const balance =
      item.type === "income"
        ? previousBalance + item.amount
        : previousBalance - item.amount;

    data.push({
      date: new Date(item.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),

      balance,
    });

    return data;
  }, []);

  return (
    <div
      className={`app-surface p-6 ${
        darkMode ? "app-surface-dark" : "app-surface-light"
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
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
