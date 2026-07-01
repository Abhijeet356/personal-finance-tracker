"use client";

import { FaArrowTrendUp, FaArrowTrendDown, FaWallet, FaLightbulb, } from "react-icons/fa6";
import { useTheme } from "@/context/ThemeContext";

export default function SmartInsights({ transactions }) {
  const { darkMode } = useTheme();
  // TOTALS
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const savings = totalIncome - totalExpense;
  // TOP CATEGORY
  const categoryTotals = {};
  transactions.forEach((item) => {
    if (item.type === "expense") {
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
      }
      categoryTotals[item.category] += item.amount;
    }
  });

  const topCategory = Object.keys(categoryTotals).reduce(
    (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b),
    "None",
  );

  // HIGHEST EXPENSE
  const highestExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (max, item) => (item.amount > max.amount ? item : max),
      { amount: 0 },
    );

  // INSIGHTS

  const insights = [
    {
      icon: <FaWallet />,
      title: "Savings Overview",
      value:
        savings >= 0
          ? `You saved ₹${savings.toLocaleString()}`
          : `Overspent by ₹${Math.abs(savings).toLocaleString()}`,
      color: savings >= 0 ? "text-green-500" : "text-red-500",
    },

    {
      icon:
        totalExpense > totalIncome ? <FaArrowTrendDown /> : <FaArrowTrendUp />,
      title: "Spending Trend",
      value:
        totalExpense > totalIncome
          ? "Expenses are higher than income"
          : "Financial balance looks healthy",
      color: totalExpense > totalIncome ? "text-red-500" : "text-green-500",
    },

    {
      icon: <FaLightbulb />,
      title: "Top Spending Category",
      value:
        topCategory === "None"
          ? "No expenses yet"
          : `Most spent on ${topCategory}`,
      color: "text-violet-500",
    },

    {
      icon: <FaWallet />,
      title: "Highest Expense",
      value:
        highestExpense.amount === 0
          ? "No expenses yet"
          : `₹${highestExpense.amount.toLocaleString()} on ${highestExpense.category}`,
      color: "text-pink-500",
    },
  ];

  return (
    <div
      className={`app-surface p-6 ${
        darkMode ? "app-surface-dark" : "app-surface-light"
      }`}
    >
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Smart Insights</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          AI-like financial observations
        </p>
      </div>

      {/* INSIGHTS */}

      <div className="grid md:grid-cols-2 gap-6">
        {insights.map((item, index) => (
          <div
            key={index}
            className={`app-panel p-6 ${
              darkMode ? "app-panel-dark" : "app-panel-light"
            }`}
          >
            {/* ICON */}

            <div className={`text-3xl mb-4 ${item.color}`}>{item.icon}</div>
            {/* TITLE */}
            <h1 className="text-xl font-bold">{item.title}</h1>
            {/* VALUE */}
            <p className={`mt-3 text-lg ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
